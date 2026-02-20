"use client";

import { useRef, useState } from "react";
import { MEASURING_UNITS } from "@/lib/constants/measuringunits";
import { PRODUCT_CATEGORY_VALUES } from "@/lib/constants/categories";
import { Trash2, PlusCircle, ChevronDown, ImagePlus, X } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface VariantForm {
  quantity: number | null;
  price: number | null;
  units: number | null;
  defaultVisible: boolean;
  imageFile: File | null;      // single image per variant
  imagePreview: string | null; // blob URL for preview
}

interface ProductForm {
  name: string;
  description: string;
  category: string;
  measuringUnit: string;
  imageFiles: File[];       // product-level images (File objects)
  imagePreviews: string[];  // blob URLs for preview
  variants: VariantForm[];
}

// ─── Helpers ──────────────────────────────────────\───────────────────────────

const emptyVariant = (): VariantForm => ({
  quantity: null,
  price: null,
  units: null,
  defaultVisible: false,
  imageFile: null,
  imagePreview: null,
});

const initialForm: ProductForm = {
  name: "",
  description: "",
  category: "",
  measuringUnit: "",
  imageFiles: [],
  imagePreviews: [],
  variants: [emptyVariant()],
};

function formatCategoryLabel(val: string) {
  return val
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ProductList() {
  const [form, setForm] = useState<ProductForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Refs for hidden file inputs
  const productImageInputRef = useRef<HTMLInputElement | null>(null);
  const variantFileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // ── Generic field handler ──────────────────────────────────────────────────
  const handleField = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // ── Variant scalar field handler ───────────────────────────────────────────
  const handleVariant = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => {
      const variants = [...prev.variants];
      variants[index] = {
        ...variants[index],
        [name]: type === "checkbox" ? checked : value,
      };
      return { ...prev, variants };
    });
  };

  // ── Product-level image handlers ───────────────────────────────────────────
  const handleProductImages = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const newFiles = Array.from(files);
    const newPreviews = newFiles.map((f) => URL.createObjectURL(f));
    setForm((prev) => ({
      ...prev,
      imageFiles: [...prev.imageFiles, ...newFiles],
      imagePreviews: [...prev.imagePreviews, ...newPreviews],
    }));
  };

  const handleRemoveProductImage = (imageIndex: number) => {
    setForm((prev) => {
      URL.revokeObjectURL(prev.imagePreviews[imageIndex]);
      return {
        ...prev,
        imageFiles: prev.imageFiles.filter((_, i) => i !== imageIndex),
        imagePreviews: prev.imagePreviews.filter((_, i) => i !== imageIndex),
      };
    });
  };

  // ── Variant image handlers ─────────────────────────────────────────────────
  const handleVariantImage = (
    index: number,
    files: FileList | null,
    inputEl: HTMLInputElement | null
  ) => {
    if (!files || !files[0]) return;
    const newFile = files[0];
    setForm((prev) => {
      const variants = [...prev.variants];
      // Revoke old blob URL to avoid memory leaks
      if (variants[index].imagePreview) {
        URL.revokeObjectURL(variants[index].imagePreview as string);
      }
      variants[index] = {
        ...variants[index],
        imageFile: newFile,
        imagePreview: URL.createObjectURL(newFile),
      };
      return { ...prev, variants };
    });
    if (inputEl) inputEl.value = ""; // reset so same file can be re-selected
  };

  const handleRemoveVariantImage = (variantIdx: number) => {
    setForm((prev) => {
      const variants = [...prev.variants];
      if (variants[variantIdx].imagePreview) {
        URL.revokeObjectURL(variants[variantIdx].imagePreview as string);
      }
      variants[variantIdx] = {
        ...variants[variantIdx],
        imageFile: null,
        imagePreview: null,
      };
      return { ...prev, variants };
    });
  };

  // ── Variant add / remove ───────────────────────────────────────────────────
  const addVariant = () =>
    setForm((prev) => ({ ...prev, variants: [...prev.variants, emptyVariant()] }));

  const removeVariant = (index: number) =>
    setForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", form.name);
    data.append("description", form.description);
    data.append("category", form.category);
    data.append("measuringUnit", form.measuringUnit);

    // Product images — append each File under the key "images"
    // Backend calls formData.getAll("images") to collect them all
    form.imageFiles.forEach((file) => {
      data.append("images", file);
    });

    form.variants.forEach((v, vIdx) => {
      data.append(`variants[${vIdx}][quantity]`, String(v.quantity ?? ""));
      data.append(`variants[${vIdx}][price]`, String(v.price ?? ""));
      data.append(`variants[${vIdx}][units]`, String(v.units ?? ""));
      data.append(`variants[${vIdx}][defaultVisible]`, String(v.defaultVisible));
      // Key must match what the API route regex looks for: variants[N][imageUrl]
      if (v.imageFile) {
        data.append(`variants[${vIdx}][imageUrl]`, v.imageFile);
      }
    });

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        // Revoke all blob URLs before clearing state
        form.imagePreviews.forEach((p) => URL.revokeObjectURL(p));
        form.variants.forEach((v) => {
          if (v.imagePreview) URL.revokeObjectURL(v.imagePreview);
        });

        setSubmitted(true);
        alert("Success: Product added successfully!");
        setForm(initialForm);
      } else {
        const err = await res.json();
        alert(`Error: ${err.message || "Something went wrong"}`);
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ─── JSX ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in the details below to add a product to the catalogue.
          </p>
        </div>



        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-8"
        >
          {/* ─── Basic Info ─── */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-100">
              Basic Information
            </h2>
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleField}
                  required
                  placeholder="e.g. Neem Karela Jamun Juice"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleField}
                  required
                  rows={4}
                  placeholder="Describe the product, its benefits, ingredients..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
                />
              </div>

              {/* Category + Measuring Unit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={form.category}
                      onChange={handleField}
                      required
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition pr-10"
                    >
                      <option value="">Select category...</option>
                      {PRODUCT_CATEGORY_VALUES.filter((c) => c !== "all").map(
                        (cat) => (
                          <option key={cat} value={cat}>
                            {formatCategoryLabel(cat)}
                          </option>
                        )
                      )}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>

                {/* Measuring Unit */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Measuring Unit <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="measuringUnit"
                      value={form.measuringUnit}
                      onChange={handleField}
                      required
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition pr-10"
                    >
                      <option value="">Select unit...</option>
                      {MEASURING_UNITS.map((u) => (
                        <option key={u.value} value={u.value}>
                          {u.group[0].toUpperCase().concat(u.group.slice(1))}-{u.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Product Images ─── */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-5 pb-2 border-b border-gray-100">
              Product Images
            </h2>

            {/* Preview grid */}
            {form.imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {form.imagePreviews.map((src, i) => (
                  <div key={i} className="relative group w-24 h-24">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={`product image ${i + 1}`}
                      className="w-full h-full object-cover rounded-xl border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProductImage(i)}
                      className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm"
                      title="Remove image"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload area */}
            <button
              type="button"
              onClick={() => productImageInputRef.current?.click()}
              className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-xl py-6 text-sm text-gray-400 hover:border-primary hover:text-primary transition"
            >
              <ImagePlus size={18} />
              {form.imagePreviews.length === 0
                ? "Click to upload product images"
                : "Add more images"}
              <span className="text-xs text-gray-300 ml-1">(PNG, JPG, WEBP)</span>
            </button>
            <input
              ref={productImageInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                handleProductImages(e.target.files);
                e.target.value = ""; // reset so same file can be re-selected
              }}
            />
          </section>

          {/* ─── Variants ─── */}
          <section>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-gray-100">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Product Variants
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Add one or more pack sizes / variants for this product.
                </p>
              </div>
              <button
                type="button"
                onClick={addVariant}
                className="flex items-center gap-2 text-sm font-medium text-primary border border-primary rounded-xl px-4 py-2 hover:bg-primary hover:text-white transition duration-200"
              >
                <PlusCircle size={16} /> Add Variant
              </button>
            </div>

            <div className="space-y-5">
              {form.variants.map((variant, idx) => (
                <div
                  key={idx}
                  className="relative rounded-xl border border-gray-100 bg-gray-50 p-5"
                >
                  {/* Variant Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                      Variant {idx + 1}
                    </span>
                    {form.variants.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeVariant(idx)}
                        className="text-red-400 hover:text-red-600 transition"
                        title="Remove variant"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Quantity */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Quantity <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={variant.quantity ?? ""}
                        onChange={(e) => handleVariant(idx, e)}
                        required
                        min={0}
                        placeholder="e.g. 500"
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                    </div>

                    {/* Units */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Units <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="units"
                        value={variant.units ?? ""}
                        onChange={(e) => handleVariant(idx, e)}
                        required
                        min={0}
                        placeholder="e.g. 1"
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Price (Rs.) <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={variant.price ?? ""}
                        onChange={(e) => handleVariant(idx, e)}
                        required
                        min={0}
                        placeholder="e.g. 399"
                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary transition"
                      />
                    </div>
                  </div>

                  {/* Variant Image Upload */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Variant Image
                      <span className="text-gray-400 font-normal ml-1">(optional, PNG / JPG / WEBP)</span>
                    </label>

                    {variant.imagePreview ? (
                      /* Preview */
                      <div className="flex items-center gap-3">
                        <div className="relative group w-20 h-20 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={variant.imagePreview}
                            alt="variant preview"
                            className="w-full h-full object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveVariantImage(idx)}
                            className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-sm"
                            title="Remove image"
                          >
                            <X size={11} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => variantFileInputRefs.current[idx]?.click()}
                          className="text-xs text-primary underline"
                        >
                          Change image
                        </button>
                      </div>
                    ) : (
                      /* Upload area */
                      <button
                        type="button"
                        onClick={() => variantFileInputRefs.current[idx]?.click()}
                        className="flex items-center gap-2 text-xs font-medium text-gray-500 border border-dashed border-gray-300 rounded-lg px-4 py-3 w-full hover:border-primary hover:text-primary transition"
                      >
                        <ImagePlus size={15} />
                        Click to upload variant image
                      </button>
                    )}

                    <input
                      ref={(el) => { variantFileInputRefs.current[idx] = el; }}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleVariantImage(idx, e.target.files, e.target)
                      }
                    />
                  </div>

                  {/* Default Visible */}
                  <div className="mt-4 flex items-center gap-3">
                    <input
                      id={`defaultVisible-${idx}`}
                      type="checkbox"
                      name="defaultVisible"
                      checked={variant.defaultVisible}
                      onChange={(e) => handleVariant(idx, e)}
                      className="h-4 w-4 rounded border-gray-300 accent-primary"
                    />
                    <label
                      htmlFor={`defaultVisible-${idx}`}
                      className="text-sm text-gray-600 cursor-pointer"
                    >
                      Set as default visible variant
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─── Submit ─── */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white rounded-xl px-8 py-3 text-sm font-semibold hover:opacity-90 disabled:opacity-60 transition duration-200"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Uploading &amp; Saving…
                </span>
              ) : (
                "Submit Product"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}