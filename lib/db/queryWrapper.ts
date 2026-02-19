import type { Model, FilterQuery } from "mongoose";

export type PaginationQuery = {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};

export type PaginatedResult<T> = {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

type QueryWrapperOptions<T> = {
  model: Model<T>;
  baseFilter?: FilterQuery<T>;

  // fields where search should happen
  searchFields?: (keyof T)[];

  // allow only these sort fields (security)
  allowedSortFields?: (keyof T)[];

  // default sort
  defaultSort?: Record<string, 1 | -1>;
};

export async function queryWrapper<T>(
  query: PaginationQuery,
  options: QueryWrapperOptions<T>
): Promise<PaginatedResult<T>> {
  const {
    model,
    baseFilter = {},
    searchFields = [],
    allowedSortFields = [],
    defaultSort = { createdAt: -1 },
  } = options;

  // page + limit
  const page = Math.max(parseInt(query.page || "1", 10), 1);
  const limit = Math.min(Math.max(parseInt(query.limit || "10", 10), 1), 100);
  const skip = (page - 1) * limit;

  // search
  const search = (query.search || "").trim();
  let finalFilter: FilterQuery<T> = { ...baseFilter };

  if (search && searchFields.length > 0) {
    finalFilter = {
      ...finalFilter,
      $or: searchFields.map((field) => ({
        [field]: { $regex: search, $options: "i" },
      })) as any,
    };
  }

  // sorting
  const sortBy = (query.sortBy || "").trim();
  const sortOrder = query.sortOrder === "asc" ? 1 : -1;

  let sort: Record<string, 1 | -1> = { ...defaultSort };

  // security: allow sorting only on whitelisted fields
  if (
    sortBy &&
    allowedSortFields.length > 0 &&
    allowedSortFields.includes(sortBy as keyof T)
  ) {
    sort = { [sortBy]: sortOrder };
  }

  // fetch
  const [data, total] = await Promise.all([
    model.find(finalFilter).sort(sort).skip(skip).limit(limit).lean(),
    model.countDocuments(finalFilter),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: data as any,
    meta: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
}
