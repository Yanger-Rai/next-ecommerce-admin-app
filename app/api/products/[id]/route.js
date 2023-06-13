import { connectToDB } from "@/utils/mongoose";
import Product from "@/models/Product";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.id);
    if (!product) return new Response("product not found", { status: 404 });
    return new Response(JSON.stringify(product), { styatus: 200 });
  } catch (error) {
    return new Response("Failed to fetch the product", { status: 500 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Product.findByIdAndRemove(params.id);
    return new Response("Product deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Product", { status: 500 });
  }
};
