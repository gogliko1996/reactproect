import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./categories.css";

export const Categoris = () => {
  const categories = useSelector((state) => state.products.categoriesData);
  return (
    <div className="categories">
      {categories.map((item) => {
        return (
          <div key={item._id}>
            <Link
              to={`/products/categories/${item.name}?page=1&sort=name,asc`}
            >
              {" "}
              {item.name}{" "}
            </Link>
          </div>
        );
      })}
    </div>
  );
};
