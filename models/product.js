import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: { type: String, required: [true, "title is required"] },
    description: String,
    price: { type: Number, required: [true, "price is required"] },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Categories" },
    properties: { type: Object },
  },
  { timestamps: true }
);

const Product = models.Product || model("Product", ProductSchema);

export default Product;
