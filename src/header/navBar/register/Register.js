import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUsers } from "../../../redux/Users";

export const RegisterUsers = () => {
  const navigation = useNavigate();
  const email =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    if ((userValue.email.length === 0) || userValue.email.match(email)) {
    } else {
      errorUser.email = "error";
    }
    setError(errorUser);
  };

  const prevOnsub = (event) => {
    event.preventDefault();
    dispatch(fetchUsers({ userValue, register: true }))
    .unwrap()
    .then(() => navigation("/login"));
    const userValueClear = { ...userValue };
    userValueClear.firstName = "";
    userValueClear.lastName = "";
    userValueClear.password = "";
    userValueClear.email = "";
    setUserValue(userValueClear);
  };

  return (
    <form onSubmit={prevOnsub}>
      <input
        style={{ border: "#ff0000" }}
        value={userValue.firstName}
        name="firstName"
        onChange={onChange}
        placeholder="name"
      />
      <p>{error.firstname}</p>
      <input
        value={userValue.lastName}
        name="lastName"
        onChange={onChange}
        placeholder="lastname"
      />
      <p>{error.lastname}</p>
      <input
        type="email"
        value={userValue.email}
        name="email"
        onChange={onChange}
        placeholder="email"
      />
      <p>{error.email}</p>
      <input
        type="password"
        value={userValue.password}
        name="password"
        onChange={onChange}
        placeholder="password"
      />
      <p>{error.password}</p>
      <button> register </button>
    </form>
  );
};
