import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../redux/product";
import FileBase from 'react-file-base64';

export const Addproduct = () => {
  const dispatch = useDispatch();
  const [productValue, setProductValue] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    Image: ""
  });

  const onchange = (e) => {
    const { name, value } = e.target;
    setProductValue((newValue) => ({ ...newValue, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(fetchProduct(productValue));
    const product = {...productValue};
    product.name = ""
    product.category = ""
    product.brand = ""
    product.description = ""
    product.price = ""
    product.Image = ""
    setProductValue(product)
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
        type = "number"
        name="price"
        value={productValue.price}
        onChange={onchange}
        placeholder="  price "
      />
    <FileBase type="file" mulfiple={false} onDone={({base64}) => {
      productValue.Image = base64;
    }} />
      <button> add product </button>
    </form>
  );
};
