import React from "react";
import { useSelector } from "react-redux";

export const Home = () => {
  const product = useSelector((state) => state.products.getProductData);

  return (
    <div>
      {product.map((item) => {
       return <div key={item._id}>
          <h2>{item.name}</h2>
          <button> update </button>
        </div>;
      })}
    </div>
  );
};
