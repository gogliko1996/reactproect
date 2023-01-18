import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../redux/Users";
import "./register.css";

export const RegisterUsers = () => {
  const navigation = useNavigate();
  const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [userValue, setUserValue] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });

  const onChange = (e) => {
    const errorUser = {};
    const { name, value } = e.target;
    setUserValue((newUser) => ({ ...newUser, [name]: value }));
    if ((userValue.firstName.length > 0) & (userValue.firstName.length < 3)) {
      errorUser.firstname = "error";
    }
    if ((userValue.lastName.length > 0) & (userValue.lastName.length < 3)) {
      errorUser.lastname = "error";
    }
    if ((userValue.password.length > 0) & (userValue.password.length < 4)) {
      errorUser.password = "error";
    }
    if (userValue.email.length === 0 || userValue.email.match(email)) {
    } else {
      errorUser.email = "error";
    }
    setError(errorUser);
  };

  const prevOnsub = (event) => {
    const errorUser = {};
    event.preventDefault();
    if (userValue.firstName === "") {
      errorUser.firstname = "error";
    };
    if (userValue.lastName === "") {
      errorUser.lastname = "error";
    };
    if (userValue.password === "") {
      errorUser.password = "error";
    };
    if (userValue.email === "") {
      errorUser.email = "error";
    }
    setError(errorUser);

    if(Object.keys(errorUser).length === 0){
        dispatch(fetchUsers({ userValue, register: true }))
      .unwrap()
      .then(() => navigation("/login"));

      const userValueClear = { ...userValue };
      userValueClear.firstName = "";
      userValueClear.lastName = "";
      userValueClear.password = "";
      userValueClear.email = "";
      setUserValue(userValueClear);
    }
  };

  return (
    <form onSubmit={prevOnsub}>
      <input
        className={error.firstname === "error" ? "red" : "grin"}
        value={userValue.firstName}
        name="firstName"
        onChange={onChange}
        placeholder=" name"
      />
      <input
        className={error.lastname === "error" ? "red" : "grin"}
        value={userValue.lastName}
        name="lastName"
        onChange={onChange}
        placeholder=" lastname"
      />
      <input
        className={error.email === "error" ? "red" : "grin"}
        type="email"
        value={userValue.email}
        name="email"
        onChange={onChange}
        placeholder=" email"
      />
      <input
        className={error.password === "error" ? "red" : "grin"}
        type="password"
        value={userValue.password}
        name="password"
        onChange={onChange}
        placeholder=" password"
      />
      <button> register </button>
    </form>
  );
};
