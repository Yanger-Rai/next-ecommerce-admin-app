import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Categories" },
  properties: [{ type: Object }],
});

const Categories = models.Categories || model("Categories", CategorySchema);

export default Categories;
