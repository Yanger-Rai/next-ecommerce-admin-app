"use client";
import axios from "axios";
import { useEffect, useState } from "react";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";

const EditProductPage = ({ params }) => {
  const [productToEdit, setProductToEdit] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`/api/products/${params.id}`);
      const data = await response.data;
      setProductToEdit(data);
    };

    fetchProduct();
  }, [params.id]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productToEdit && <ProductForm {...productToEdit} />}
    </Layout>
  );
};

export default EditProductPage;
