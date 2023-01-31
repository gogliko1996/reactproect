import { Rating } from "@mui/material";
import { logRoles } from "@testing-library/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { reiting } from "../redux/reitingSlice";

export const Reiting = ({productId,disable}) => {
  const [reitingvalue,setReitingvalue] =useState(null)
  const dispatch = useDispatch()
  const product = useSelector((state) => state.products?.getProductData);
  const user = useSelector((state) => state.user.userData)
const userId = user._id

  const onchange = (e) => {
  
    for(const item of product){
      if(productId === item._id){;
        const productId = item._id
        dispatch(reiting({productId,userId,rating: e.target.defaultValue}));
        console.log(item.averageRating);
        setReitingvalue(item.averageRating)
      }
    }
  };

  return (
    <div>
       <Rating
        name="simple-controlled"
        value={reitingvalue}
        onChange={onchange}
        disabled={!disable}
      />
    </div>
  );
};
