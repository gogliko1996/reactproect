import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../redux/Users";

export const LoginForm = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
  const [userValue, setLoginVlue] = useState({
    email: "",
    password: "",
  });

  const onchange = (e) => {
    const {name,value}=e.target;
    setLoginVlue((newLogin) => ({...newLogin, [name]: value}))
  };
  
  const onclick = (e) => {
    e.preventDefault();
    dispatch(fetchUsers({userValue,register:false}))
    .unwrap()
    .then(() => navigation("/home"));
    const userValueClear = { ...userValue };
    userValueClear.password = "";
    userValueClear.email = "";
    setLoginVlue(userValueClear)
  }
  return (
    <>
      <form>
      <input
        type="email"
        value={userValue.email}
        name="email"
        onChange={onchange}
        placeholder="email"
      />
      <input
        type="password"
        value={userValue.password}
        name="password"
        onChange={onchange}
        placeholder="password"
      />
        <button variant="outlined" onClick={onclick} >Outlined</button>
    </form>
     <Link to="/registration"> registration </Link>
    </>
  );
};
