import mongoose, { Schema, model, models } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Types.ObjectId, ref: "Categories" },
});

const Categories = models.Categories || model("Categories", CategorySchema);

export default Categories;
