import { connectToDB } from "@/utils/mongoose";
import Product from "@/models/Product";

export const POST = async (request) => {
  const { title, description, price, images } = await request.json();
  const { method } = request;
  try {
    await connectToDB();

    if (method === "POST") {
      const productDoc = await Product.create({
        title,
        description,
        price,
        images,
      });
      return new Response("Product created successfully", { status: 200 });
    }
  } catch (error) {
    return new Response("Product creation failed", { status: 500 });
  }
};

// GET
export const GET = async (request) => {
  const { method } = request;

  try {
    await connectToDB();

    if (method === "GET") {
      const products = await Product.find();
      return new Response(JSON.stringify(products), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch all products", { status: 500 });
  }
};

//PATCH
export const PATCH = async (request) => {
  const { _id, title, description, price, images } = await request.json();
  try {
    await connectToDB();

    const existingProduct = await Product.findById(_id);

    if (!existingProduct)
      return new Response("product not found", { status: 404 });

    existingProduct.title = title;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.images = images;

    await existingProduct.save();
    return new Response("Product updated successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to update the product", { status: 500 });
  }
};
