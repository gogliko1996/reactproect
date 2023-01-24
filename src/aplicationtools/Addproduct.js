import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../redux/product";
import FileBase from "react-file-base64";
import { useNavigate } from "react-router-dom";

export const Addproduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [productValue, setProductValue] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    Image: "",
  });

  const onchange = (e) => {
    const { name, value } = e.target;
    setProductValue((newValue) => ({ ...newValue, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(fetchProduct({productValue, update: false }))
    .unwrap()
    .then(() => navigate("/home"))
    
    const product = { ...productValue };
    product.name = "";
    product.category = "";
    product.brand = "";
    product.description = "";
    product.price = "";
    product.Image = "";
    setProductValue(product);
  };

  return (
    <form onSubmit={submit}>
      <input
        name="name"
        value={productValue.name}
        onChange={onchange}
        placeholder="  name"
      />
      <input
        name="category"
        value={productValue.category}
        onChange={onchange}
        placeholder=" category "
      />
      <input
        name="brand"
        value={productValue.brand}
        onChange={onchange}
        placeholder="  brand"
      />
      <input
        name="description"
        value={productValue.description}
        onChange={onchange}
        placeholder="  description  "
      />
      <input
        type="number"
        name="price"
        value={productValue.price}
        onChange={onchange}
        placeholder="  price "
      />
      <FileBase
        value={productValue.Image}
        type="file"
        mulfiple={false}
        onDone={({ base64 }) => {
          const img = { ...productValue };
          img.Image = base64;
          setProductValue(img);
        }}
      />
      <button> add product </button>
    </form>
  );
};
