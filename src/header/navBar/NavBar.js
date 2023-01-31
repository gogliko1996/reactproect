import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { admin, logoutUser, useAdmin, useUserInfo } from "../../redux/Users";
import "./navbar.css";
import { Serch } from "./serch/Serch";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Badge } from "@mui/material";
import { Cart } from "../../main/Cart/Cart";
import { useState } from "react";

export const NavBar = () => {
  const [cart, setCart] = useState(false);
  const userInfo = useUserInfo();
  const dispach = useDispatch();
  const adminPanel = admin(userInfo);
  const navigate = useNavigate();
  const cartProduct = useSelector((state) => state.products.cartAdd);

  const logout = () => {
    dispach(logoutUser());
  };

  const name = userInfo?.firstName.charAt(0).toUpperCase();
  const lastname = userInfo?.lastName.charAt(0).toUpperCase();

  return (
    <>
      <Serch />
      <nav>
        <h1>
          {" "}
          {name} {lastname}
        </h1>
        {!userInfo ? (
          <Link to="/login"> login </Link>
        ) : (
          <ul>
            <li>
              <Link to="Home"> home </Link>
            </li>
            <div className="logout">
              {adminPanel && <Link to="/addproduqt"> add product </Link>}
              <button onClick={logout}> logout </button>
              <Badge badgeContent={cartProduct.length} color="primary">
                <ShoppingCartCheckoutIcon
                  onClick={() => {
                    if (!cart) {
                      navigate("/cart");
                      setCart(true);
                    } else {
                      navigate("/home");
                      setCart(false);
                    }
                  }}
                />
              </Badge>
            </div>
          </ul>
        )}
      </nav>
    </>
  );
};
