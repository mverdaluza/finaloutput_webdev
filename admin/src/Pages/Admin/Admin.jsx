import React from "react";
import './Admin.css'
import { Routes, Route} from 'react-router-dom'
import Sidebar from "../../Components/Sidebar/Sidebar";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import UpdateProduct from "../../Components/UpdateProduct/UpdateProduct";
import AdminLoginSignup from "../../Components/AdminLogin/AdminLoginSignup";

const Admin = () =>{
    return(
        <div className="admin">
            <Sidebar/>
            <Routes>
                <Route path='/addproduct' element={<AddProduct/>} />
                <Route path='/listproduct' element={<ListProduct/>} />
                <Route path='/updateproduct/:id' element={<UpdateProduct/>} />
                <Route path='/adminlogin' element={<AdminLoginSignup/>}/>
            </Routes>
        </div>
    )
}

export default Admin