"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Layout from "@/components/Layout";

const DeleteProductPage = ({ params }) => {
  const [productToEdit, setProductToEdit] = useState("");
  const searchParams = useSearchParams();
  const productTitle = searchParams.get("title");
  const router = useRouter();

  const goBack = () => {
    router.push("/products");
  };

  const deleteProduct = async () => {
    try {
      const response = await axios.delete(`/api/products/${params.id}`);
      if (response.statusText === "OK") {
        goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete product &nbsp; &quot;{productTitle}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
};

export default DeleteProductPage;
