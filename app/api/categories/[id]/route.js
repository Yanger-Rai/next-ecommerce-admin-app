import { connectToDB } from "@/utils/mongoose";
import Categories from "@/models/category";

export const PUT = async (request, { params }) => {
  const { name, parentCategory } = await request.json();
  console.log("this is the id: ", params.id);
  try {
    await connectToDB();
    const existingCategory = await Categories.findById(params.id);

    if (!existingCategory) {
      return new Response("Fail to get the cateogry", { status: 404 });
    }

    existingCategory.name = name;
    existingCategory.parent = parentCategory;
    existingCategory.save();
    return new Response("Category updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the category", { status: 500 });
  }
};
