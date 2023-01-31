
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAdd, getCart, saveCart } from "../redux/product";

export const AddCart = ({ id }) => {
  const product = useSelector((state) => state.products?.getProductData);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);

  const onClick = () => {
    for (const item of product) {
      if (id === item._id) {
        dispatch(cartAdd(item))
      }
    } 
  };

  return <button onClick={onClick}>Cart</button>;
};
