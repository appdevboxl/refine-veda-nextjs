export const PRODUCT_CATEGORY_VALUES = [
  "all",
  "digestive_gut_health",
  "migraine_relief",
  "weight_management",
  "vitality_booster",
  "immunity_wellness",
  "detox_cleanse",
] as const;

// Union type of values
export type ProductCategoryValue =
  (typeof PRODUCT_CATEGORY_VALUES)[number];
