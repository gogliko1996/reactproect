import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearsearch, searchProduct } from "../../../redux/product";

export const Serch = () => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const search = useSelector((state) => state.products.searchData);

  const onChange = (e) => {
    setSearchValue(e.target.value);
  };

  if (!searchValue & (search.length !== 0)) {
    dispatch(clearsearch());
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue) {
        dispatch(searchProduct(searchValue));
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  return (
    <div>
      <input
        style={{ paddingLeft: 10 }}
        value={searchValue}
        onChange={onChange}
        placeholder="search"
      />
      {search.map((item) => {
        return (
          <div key={item._id} className="search">
            <h2>{item.name}</h2>
          </div>
        );
      })}
    </div>
  );
};
