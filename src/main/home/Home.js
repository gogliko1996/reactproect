import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Addproduct } from "../../aplicationtools/Addproduct";
import { deleteProduct, fetchProduct, update } from "../../redux/product";
import { admin, useUserInfo } from "../../redux/Users";
import FileBase from "react-file-base64";

export const Home = () => {
  const product = useSelector((state) => state.products.getProductData);
  const dispatch = useDispatch();
  const userIfo = useUserInfo();
  const adminPanel = admin(userIfo);
  const [update, setupdate] = useState(false);
  const [productId, setProductId]= useState("");
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

  const onclickUpdate = (e) => {
    const id = e.target.name;
    for (const item of product) {
      if (id === item._id) {
        setProductValue(item)
        setProductId(item._id)
        setupdate(true)
      }
    }
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(fetchProduct({productValue, update: true , id: productId}));
    const product = { ...productValue };
    product.name = "";
    product.category = "";
    product.brand = "";
    product.description = "";
    product.price = "";
    product.Image = "";
    setProductValue(product);
    setupdate(false)
  };

  const onclickDelete = (e) => {
    const id = e.target.name;
    for (const item of product) {
      if (id === item._id) {
        dispatch(deleteProduct(id));
        break;
      }
    }
  };

  return (
    <div>
      <>
        {update && (
          <div>
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
              <button> update </button>
            </form>
          </div>
        )}
      </>
      {product.map((item) => {
        return (
          <div key={item._id}>
            <h2>{item.name}</h2>
            {adminPanel && (
              <>
                <button name={item._id} onClick={onclickUpdate}>
                  {" "}
                  update{" "}
                </button>
                <button name={item._id} onClick={onclickDelete}>
                  {" "}
                  delete{" "}
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
