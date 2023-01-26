import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { admin, logoutUser, useAdmin, useUserInfo } from "../../redux/Users";
import "./navbar.css";
import { Serch } from "./serch/Serch";

export const NavBar = () => {
  const userInfo = useUserInfo();
  const dispach = useDispatch();
  const adminPanel = admin(userInfo);

  const logout = () => {
    dispach(logoutUser())
  }

  const name = userInfo?.firstName.charAt(0).toUpperCase();
  const lastname = userInfo?.lastName.charAt(0).toUpperCase();
  
  return (
    <>
    <Serch/>
    <nav>
      <h1> {name} {lastname}</h1>
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
          </div>

        </ul>
      )}
    </nav>
    </>
    
  );
};
