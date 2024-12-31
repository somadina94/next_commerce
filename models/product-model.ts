import mongoose, { Document, Model, Schema } from "mongoose";

export interface ProductInterface extends Document {
  id: string;
  name: string;
  price: number;
  shortDescription: string;
  longDescription: string;
  overviewPhoto: string;
  galleryPhotos: string[];
  createdAt: Date;
}

const ProductSchema: Schema<ProductInterface> =
  new mongoose.Schema<ProductInterface>({
    name: {
      type: String,
      required: [true, "Please provide product name."],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price."],
    },
    shortDescription: {
      type: String,
      required: [true, "Please provide a short descrition."],
    },
    longDescription: {
      type: String,
      required: [true, "Please provide a long description."],
    },
    overviewPhoto: {
      type: String,
      required: [true, "Please provide an overview photo."],
    },
    galleryPhotos: {
      type: [String],
      required: [true, "Please provide product gallery photos."],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

const Product: Model<ProductInterface> =
  mongoose.models.Product ||
  mongoose.model<ProductInterface>("Product", ProductSchema);

export default Product;
