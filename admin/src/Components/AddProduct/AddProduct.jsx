import React, { useState } from "react";
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () =>{

    const [image, setImage] = useState(false)
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    })
    
    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) =>{
        setProductDetails({...productDetails,[e.target.name]:e.target.value})
    }

    const AddButton = async () =>{
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:8800/upload', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data});
        
        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:8800/addproduct', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                    body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
            console.log(data);
            data.success?alert("Product Added"):alert("Failed");
            });
        }
    }

    return(
        <div className="add-product">
            <div className="addproduct-item">
                <h2>Create new product</h2>
                <p>Product Name</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Product Name" />
            </div>

            <div className="addproduct-price">
                <div className="addproduct-item">
                    <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Old Price" />
                </div>
                <div className="addproduct-item">
                    <p>New Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="New Price" />
                </div>
            </div>

            <div className="addproduct-item">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
                    <option value="women">Women</option>
                    <option value="men">Men</option>
                    <option value="kid">Kids</option>
                </select>
            </div>
            <div className="addproduct-item">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className="allproduct-image" alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>
            <button onClick={()=>{AddButton()}} className="addproduct-btn">Add</button>
        </div>
    )
}

export default AddProduct;