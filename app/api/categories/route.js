import { connectToDB } from "@/utils/mongoose";
import Categories from "@/models/category";

export const POST = async (request) => {
  const { name, parentCategory } = await request.json();

  try {
    await connectToDB();
    const categoryDoc = await Categories.create({
      name,
      parent: parentCategory,
    });

    return new Response(JSON.stringify(categoryDoc), { status: 200 });
  } catch (error) {
    return new Response("Failed to create category", { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectToDB();
    const response = await Categories.find().populate("parent");
    return new Response(JSON.stringify(response), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch categories", { status: 500 });
  }
};
