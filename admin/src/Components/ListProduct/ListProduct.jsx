import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './ListProduct.css'
import remove_icon from '../../assets/cross_icon.png'

const ListProduct = () =>{
    const [allproducts, setAllProducts] = useState([]);
    const fetchInfo = async()=>{
        await fetch('http://localhost:4000/allproducts')
        .then((res)=>res.json())
        .then((data)=>{setAllProducts(data)});
    }

    useEffect(()=>{
        fetchInfo();
    },[])

    const removeProd = async (id)=>{
        await fetch('http://localhost:4000/removeproduct',{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:id})
        })
        await fetchInfo();
    }

    return(
        <div className="list-product">
            <h1>All Products</h1> 
            <div className="listproduct-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Category</p>
                <p>Update</p>
                <p>Remove</p>
            </div>
            <div className="listproduct-allproducts">
                <hr />
                {allproducts.map((product) => (
                    <div key={product.id} className="listproduct-format-main listprod">
                        <img src={product.image} alt="" className="listprod-icon" />
                        <p>{product.name}</p>
                        <p>&#x20B1;{product.new_price}</p>
                        <p>{product.category}</p>
                        <Link to={`/updateproduct/${product.id}`}><button className="update-btn">Update</button></Link>
                        <img onClick={() => removeProd(product.id)} src={remove_icon} alt="" className="listprod-removeicon" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListProduct