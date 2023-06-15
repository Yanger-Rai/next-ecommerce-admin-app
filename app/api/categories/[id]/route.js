import { connectToDB } from "@/utils/mongoose";
import Categories from "@/models/category";

export const PUT = async (request, { params }) => {
  const { name, parentCategory, properties } = await request.json();
  try {
    await connectToDB();
    const existingCategory = await Categories.findById(params.id);

    if (!existingCategory) {
      return new Response("Fail to get the cateogry", { status: 404 });
    }

    existingCategory.name = name;
    existingCategory.parent = parentCategory;
    existingCategory.properties = properties;
    existingCategory.save();
    return new Response("Category updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the category", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Categories.findByIdAndRemove(params.id);

    return new Response("category deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete the category", { status: 500 });
  }
};
