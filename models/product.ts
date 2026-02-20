import mongoose, { Schema, model, models } from "mongoose";
import { MEASURING_UNITS, MeasuringUnit, MEASURING_UNIT_VALUES } from "@/lib/constants/measuringunits";
import { PRODUCT_CATEGORY_VALUES } from "@/lib/constants/categories";

export interface IProduct {
  name: string;
  measuringUnit: MeasuringUnit;
  category: string;
  description: string,
  images: string[],
  variants: {
    quantity: number;
    price: number;
    defaultVisible: boolean;
    units: number;
    imageUrl?: string[];
  }[];
}

const productVariantSchema = new Schema(
  {
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    defaultVisible: {
      type: Boolean,
      required: true,
      default: false,
    },
    units: {
      type: Number,
      required: true,
    },

    imageUrl: {
      type: [String],
    },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    measuringUnit: {
      type: String,
      required: true,
      enum: MEASURING_UNIT_VALUES,
    },
    variants: {
      type: [productVariantSchema],
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: PRODUCT_CATEGORY_VALUES, // replace with your actual categories
    },
  },
  {
    timestamps: true,
  }
);

export const Product =
  models.Product || model<IProduct>("Product", productSchema);
