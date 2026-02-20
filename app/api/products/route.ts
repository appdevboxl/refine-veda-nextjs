import { connectDB } from "@/lib/db/connect";
import { NextRequest, NextResponse } from "next/server";
import { Product, IProduct } from "@/models/product";
import { queryWrapper, PaginationQuery } from "@/lib/db/queryWrapper";

// GET PRODUCTS (with pagination)
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const searchParams = req.nextUrl.searchParams;

    const query: PaginationQuery = {
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
      search: searchParams.get("search") || undefined,
      sortBy: searchParams.get("sortBy") || undefined,
      sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || undefined,
    };

    const result = await queryWrapper<IProduct>(query, {
      model: Product,
      searchFields: ["name", "category", "description"],
      allowedSortFields: ["name", "category", "createdAt"],
      defaultSort: { createdAt: -1 },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Products fetched successfully",
        ...result,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

// CREATE PRODUCT
export async function POST(req: NextRequest) {
  try {
    console.log("post request hit");
    await connectDB();

    // Form sends multipart/form-data — parse with formData()
    const formData = await req.formData();

    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const category = formData.get("category") as string | null;
    const measuringUnit = formData.get("measuringUnit") as string | null;

    // extract product images
    const imageEntries = formData.getAll("images");
    const images: string[] = (
      await Promise.all(
        imageEntries.map(async (entry) => {
          if (typeof entry === "string" && entry.startsWith("http")) return entry;
          if (entry instanceof File && entry.size > 0)
            return await uploadToCloudinary(entry, "rigveda-products");
          return null;
        })
      )
    ).filter(Boolean) as string[];

    const variantsMap: Record<number, Record<string, string>> = {};
    const variantImageFiles: Record<number, File> = {};

    for (const [key, value] of formData.entries()) {
      // ── Check image file FIRST so the scalar `continue` doesn't swallow it ──
      // variants[0][imageUrl] also matches \w+ in the scalar regex, so we must
      // short-circuit here before reaching that branch.
      const imgMatch = key.match(/^variants\[(\d+)\]\[imageUrl\]$/);
      if (imgMatch && value instanceof File && value.size > 0) {
        variantImageFiles[Number(imgMatch[1])] = value;
        continue;
      }

      // ── Scalar variant fields: variants[0][quantity], etc. ──
      const scalarMatch = key.match(/^variants\[(\d+)\]\[(\w+)\]$/);
      if (scalarMatch) {
        const idx = Number(scalarMatch[1]);
        const field = scalarMatch[2];
        if (!variantsMap[idx]) variantsMap[idx] = {};
        variantsMap[idx][field] = value as string;
      }
    }

    const variants = await Promise.all(
      Object.entries(variantsMap).map(async ([idxStr, v]) => {
        const idx = Number(idxStr);
        const file = variantImageFiles[idx] ?? null;

        // Only upload when a file was actually provided
        const imageUrl: string | undefined = file
          ? await uploadToCloudinary(file, "rigveda-variants")
          : undefined;

        return {
          quantity: Number(v.quantity),
          price: Number(v.price),
          units: Number(v.units),
          defaultVisible: v.defaultVisible === "true",
          ...(imageUrl && { imageUrl }),
        };
      })
    );

    // Validation
    if (!name || !measuringUnit || !category || !description?.trim()) {
      return NextResponse.json(
        { success: false, message: "Fill all required fields" },
        { status: 400 }
      );
    }

    if (variants.length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one variant is required" },
        { status: 400 }
      );
    }

    console.log("Payload:", { name, description, category, measuringUnit, images, variants });

    const product = await Product.create({
      name,
      measuringUnit,
      category,
      description,
      images,
      variants,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully",
        data: product,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

// ─── Helper ──────

/**
 * Uploads a File to Cloudinary and returns the secure_url.
 */
async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const cloudinary = (await import("@/lib/config/cloudinary")).default;
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error || !result)
          return reject(error ?? new Error("Cloudinary upload failed"));
        resolve(result.secure_url);
      }
    );
    stream.end(buffer);
  });
}
