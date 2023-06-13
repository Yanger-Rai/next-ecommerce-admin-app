import { Schema, model, models } from "mongoose";

const ProductSchema = new Schema({
  title: { type: String, required: [true, "title is required"] },
  description: String,
  price: { type: Number, required: [true, "price is required"] },
  images: [{ type: String }],
});

const Product = models.Product || model("Product", ProductSchema);

export default Product;
