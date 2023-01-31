import React from "react";
import {  BrowserRouter as Router, Routes, Route, Link   } from "react-router-dom";
import { Addproduct } from "./aplicationtools/Addproduct";
import { CategoriProducts } from "./main/categories/CategoriProducts";
import { LoginForm } from "./header/navBar/login/Login";
import { RegisterUsers } from "./header/navBar/register/Register";
import { Home } from "./main/home/Home";
import { Cart } from "./main/Cart/Cart";

 export const RouterComponent = () => {
   
    return(
        <>
        <Routes>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/cart"  element={<Cart/>}/>
            <Route path="/registration" element = {<RegisterUsers/>}/>
            <Route path="/home" element={<Home/>} />
            <Route path="/addproduqt" element={<Addproduct/>} />
            <Route path="/products/categories/:categoriName" element={<CategoriProducts/>} />
         </Routes> 
        </>
        
    )

}
