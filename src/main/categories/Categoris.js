import { Select } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./categories.css";

export const Categoris = () => {
  const [categoris] = useState("categoris")
  const categories = useSelector((state) => state.products.categoriesData);
  return (
    <Select className='sort'value={categoris}  >
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
    </Select>
  );
};
