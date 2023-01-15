import axios from "axios";
import React from "react"
import { CeckdToken } from "./CeckdToken";


export const instance = axios.create({
    baseURL: "http://localhost:3001",
});

instance.interceptors.request.use(async (req) => {
    const token = localStorage.getItem("token");
    const refresh_token = localStorage.setItem("refresh_token");
    if(!token || !refresh_token) return req;
    req.headers.Authorization = `bearer ${token}`;
    const isExpired = CeckdToken(token);
    if(!isExpired) return req;
    const {data} = await axios.post("http://localhost:3001/users/refresh", {
        refresh_token,
    })
    localStorage.setItem("token", data.token);
    return req;
})
