"use client";
import { useState } from "react";
import Image from "next/image";

import { ReactSortable } from "react-sortablejs";

const ProductForm = () => {
  const [images, setImages] = useState(existingImages || []);

  const updateImagesOrder = (images) => {
    setImages(images);
  };

  return (
    <>
      <div className="mb-2 flex flex-wrap gap-1">
        <ReactSortable
          list={images}
          setList={updateImagesOrder}
          className="flex flex-wrap gap-1"
        >
          {!!images?.length &&
            images.map((link) => (
              <div
                key={link}
                className="relative h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200"
              >
                {/* This work*/}
                {/* <img src={link} alt="" className="rounded-lg" /> */}
                <Image
                  src={link}
                  alt="product images"
                  fill
                  sizes="h-24 w-20"
                  className="rounded-lg object-cover"
                />
              </div>
            ))}
        </ReactSortable>
      </div>
    </>
  );
};

export default ProductForm;
