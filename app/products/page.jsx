import Link from "next/link";

import Layout from "@/components/Layout";

export const Products = () => {
  return (
    <Layout>
      <Link
        className="bg-blue-900 text-white py-1 px-2 rounded-md"
        href={"/products/new"}
      >
        Add new product
      </Link>
    </Layout>
  );
};

export default Products;
