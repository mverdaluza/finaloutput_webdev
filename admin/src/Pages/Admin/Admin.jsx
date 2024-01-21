import React from "react";
import { useState } from "react";
import './Admin.css'
import { Routes, Route, Navigate } from 'react-router-dom';  // Import Navigate
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import UpdateProduct from "../../Components/UpdateProduct/UpdateProduct";
import AdminLoginSignup from "../../Components/AdminLogin/AdminLoginSignup";

const Admin = () =>{
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path='/addproduct' element={<AddProduct/>} />
                <Route path='/listproduct' element={<ListProduct/>} />
                <Route path='/updateproduct/:id' element={<UpdateProduct/>} />
                <Route path='/adminlogin' element={<AdminLoginSignup setIsAuthenticated={setIsAuthenticated} />}/>
                <Route path="/admin/*" element={isAuthenticated ? <Admin /> : <Navigate to="/adminlogin" /> }/>
                {/* Use Navigate from react-router-dom */}
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
          
        </div>
    )
}

export default Admin