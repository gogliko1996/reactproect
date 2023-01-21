import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { admin, logoutUser, useAdmin, useUserInfo } from "../../redux/Users";
import "./navbar.css";

export const NavBar = () => {
  const userIfo = useUserInfo();
  const dispach = useDispatch();
  const adminPanel = admin(userIfo);

  const logout = () => {
    dispach(logoutUser())
  }
  return (
    <nav>
      <h1> logo </h1>
      {!userIfo ? (
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
  );
};
