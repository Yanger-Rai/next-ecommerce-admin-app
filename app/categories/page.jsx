"use client";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

import Layout from "@/components/Layout";

const Categories = ({ swal }) => {
  const [name, setName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [editedCategory, setEditedCategory] = useState(null);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    const data = await response.json();
    setCategories(data);
  };

  const saveCategory = async (e) => {
    e.preventDefault();

    const data = {
      name,
      parentCategory,
      properties: properties.map((property) => ({
        name: property.name,
        values: property.values.split(","),
      })),
    };

    if (editedCategory) {
      const response = await fetch(`/api/categories/${editedCategory._id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setEditedCategory(null);
        setParentCategory("");
        setProperties("");
      }
    } else {
      await fetch("/api/categories", {
        method: "POST",
        body: JSON.stringify(data),
      });
    }
    setName("");
    fetchCategories();
    setParentCategory("");
    setProperties("");
  };

  const editCategory = (category) => {
    setEditedCategory(category);
    setName(category.name);
    setParentCategory(category.parent?._id);
    setProperties(
      category.properties.map((property) => ({
        name: property.name,
        values: property.values.join(","),
      }))
    );
  };

  const deleteCategory = (category) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Delete ${category.name}?`,
        showCancelButton: true,
        cancelButtonText: "Cancel",
        confirmButtonText: "Yes, Delete!",
        reverseButtons: true,
        confirmButtonColor: "#d55",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await fetch(`/api/categories/${category._id}`, {
            method: "DELETE",
          });
          fetchCategories();
        }
      });
  };

  const addProperty = () => {
    setProperties((prev) => {
      return [...prev, { name: "", values: "" }];
    });
  };

  const handlePropertyNameChange = (index, property, newName) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].name = newName;
      return properties;
    });
  };

  const handlePropertyValueChange = (index, property, newValue) => {
    setProperties((prev) => {
      const properties = [...prev];
      properties[index].values = newValue;
      return properties;
    });
  };

  const removeProperty = (indexToRemove) => {
    setProperties((prev) => {
      const newProperties = [...prev];
      return newProperties.filter((property, index) => {
        return index !== indexToRemove;
      });
    });
  };

  return (
    <Layout>
      <h1>Categories</h1>
      <label>
        {editedCategory
          ? `Edit category ${editedCategory.name}`
          : "Create new Category"}
      </label>
      <form onSubmit={saveCategory}>
        <div className="flex gap-1">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <select
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="">select parent category</option>
            {categories.length > 0 &&
              categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-2">
          <label className="block">Properties</label>
          <button
            type="button"
            className="btn-default text-sm mb-2"
            onClick={addProperty}
          >
            Add new property
          </button>
          {properties.length > 0 &&
            properties.map((property, index) => (
              <div className="flex gap-1 mb-2" key={index}>
                <input
                  className="mb-0"
                  type="text"
                  placeholder="property name (example: color)"
                  value={property.name}
                  onChange={(e) =>
                    handlePropertyNameChange(index, property, e.target.value)
                  }
                ></input>
                <input
                  className="mb-0"
                  type="text"
                  placeholder="values, comma seperated"
                  value={property.values}
                  onChange={(e) =>
                    handlePropertyValueChange(index, property, e.target.value)
                  }
                ></input>
                <button
                  type="button"
                  className="btn-default text-sm "
                  onClick={() => removeProperty(index)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>
        <div className="flex gap-1">
          {editedCategory && (
            <button
              type="button"
              className="btn-default"
              onClick={() => {
                setEditedCategory(null);
                setProperties("");
                setName("");
                setParentCategory("");
              }}
            >
              Cancel
            </button>
          )}
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
      <table className="basic mt-4">
        <thead>
          <tr>
            <td>Category Name</td>
            <td>Parent category</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 &&
            categories.map((category) => (
              <tr key={category._id}>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <button
                    onClick={() => editCategory(category)}
                    className="btn-default mr-1"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(category)}
                    className="btn-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default withSwal(({ swal }, ref) => <Categories swal={swal} />);
