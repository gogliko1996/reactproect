import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../redux/product";

export const Addproduct = () => {
  const dispatch = useDispatch();
  const [productValue, setProductValue] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    img: "",
  });

  const onchange = (e) => {
    const { name, value } = e.target;
    setProductValue((newValue) => ({ ...newValue, [name]: value }));
    console.log(productValue);
  };

  const submit = (e) => {
    e.preventDefault();
   dispatch(fetchProduct(productValue))
  };

  return (
    <form onSubmit={submit}>
      <input name="name" value={productValue.name} onChange={onchange} />
      <input
        name="category"
        value={productValue.category}
        onChange={onchange}
      />
      <input name="brand" value={productValue.brand} onChange={onchange} />
      <input
        name="description"
        value={productValue.description}
        onChange={onchange}
      />
      <input name="price" value={productValue.price} onChange={onchange} />
      <input
        type="file"
        name="img"
        value={productValue.img}
        onChange={onchange}
      />
      <button> add product </button>
    </form>
  );
};
