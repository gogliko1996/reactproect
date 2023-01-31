import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartAdd, getCart, saveCart } from "../../redux/product";
import "./cart.css";

export const Cart = () => {
  const cartProduct = useSelector((state) => state.products?.cartAdd);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);
  const userId = user._id;

  useEffect(() => {
    dispatch(getCart(userId));
  }, []);
  
  const getProduct = useSelector((state) => state.products.getCartData);

  const saveOnClick = () => {
    dispatch(saveCart({ cartProduct, userId }));
    dispatch(cartAdd([]));
  };

  return (
    <div>
      {cartProduct.map((item) => {
        return (
          <div className="cartConteiner" key={item.product._id}>
            <div
              className="cartimgebox {
"
            >
              <img
                className="cartimge"
                src={item.product.image}
                alt={item.product.name}
              />
              <div className="buttonbox">
                <h2>{item.product.name}</h2>
                <h3>{item.product.price}</h3>
              </div>
            </div>
          </div>
        );
      })}
      {cartProduct.length > 0 && (
        <div>
          {user && (
            <div>
              <button onClick={saveOnClick}> save </button>
              <button> all clear </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
