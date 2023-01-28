import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProduct, getProduct } from "../../redux/product";
import { admin, useUserInfo } from "../../redux/Users";
import FileBase from "react-file-base64";
import "./home.css";
import { Categoris } from "../categories/Categoris";

export const Home = () => {
  const product = useSelector((state) => state.products.getProductData);
  const user = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const userIfo = useUserInfo();
  const adminPanel = admin(userIfo);
  const [update, setupdate] = useState(false);
  const [productId, setProductId] = useState("");
  const [productValue, setProductValue] = useState({
    name: "",
    category: "",
    brand: "",
    description: "",
    price: "",
    Image: "",
  });

  useEffect(() => {
    dispatch(getProduct());
  }, []);

  const onchange = (e) => {
    const { name, value } = e.target;
    setProductValue((newValue) => ({ ...newValue, [name]: value }));
  };

  const onclickUpdate = (e) => {
    const id = e.target.name;
    for (const item of product) {
      if (id === item._id) {
        const img = { ...productValue };
        img.Image = item.image;
        setProductValue(img);
        setProductValue(item);
        setProductId(item._id);
        setupdate(true);
      }
    }
  };
  const submit = (e) => {
    e.preventDefault();
    dispatch(fetchProduct({ productValue, update: true, id: productId }));
    const product = { ...productValue };
    product.name = "";
    product.category = "";
    product.brand = "";
    product.description = "";
    product.price = "";
    product.Image = "";
    setProductValue(product);
    setupdate(false);
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
      <Categoris />
      <div className="productBox">
        {product.map((item) => {
          return (
            <div className="product" key={item._id}>
              <div className="imge" name={item._id}>
                <img className="img" src={item.image} alt={item.name} />
              </div>
              <div className="">
                <h2>{item.name}</h2>
                <h3>{item.price} $</h3>
              </div>
              {adminPanel && (
                <div className="button">
                  <button name={item._id} onClick={onclickUpdate}>
                    {" "}
                    update{" "}
                  </button>
                  <button name={item._id} onClick={onclickDelete}>
                    {" "}
                    delete{" "}
                  </button>
                </div>
              )}
              {user?.role.includes("admin") ? "" : <button> card </button>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
