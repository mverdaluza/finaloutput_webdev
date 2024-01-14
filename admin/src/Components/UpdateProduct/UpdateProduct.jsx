import React, { useState, useEffect } from "react";
import './UpdateProduct.css'; // You can create a new CSS file for UpdateProduct styling
import upload_area from '../../assets/upload_area.svg'

const UpdateProduct = ({ productId }) => {
    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",

    });

    useEffect(() => {
        // Fetch product details based on the productId when the component mounts
        fetch(`http://localhost:8800/allproducts`)
            .then(response => response.json())
            .then(data => {     
                console.log("Fetched data:", data);  // Log the data received from the server

                const productToUpdate = data.find(product => product.id === productId);
                if (productToUpdate) {
                    setProductDetails(productToUpdate);
                }
            })
            .catch(error => console.error("Error fetching product details:", error));
    }, [productId]);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    }

    const updateButton = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        if (image) {
            let formData = new FormData();
            formData.append('product', image);

            await fetch('http://localhost:8800/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            }).then((resp) => resp.json()).then((data) => { responseData = data });
        }

        if (responseData && responseData.success) {
            product.image = responseData.image_url;
            console.log(product);
            await fetch(`http://localhost:8800/updateproduct/${productId}`, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            }).then((resp) => resp.json()).then((data) => {
                console.log(data);
                data.success ? alert("Product Updated") : alert("Failed");
            });
        }
    }

    return (
        <div className="update-product">
            <div className="updateproduct-item">
                <h2>Update Product</h2>
                <p>Product Name</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Product Name" />
            </div>

            <div className="update-product-price">
                <div className="updateproduct-item">
                <p>Price</p>
                    <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder="Old Price" />
                </div>

            <div className="update-product-price">
                <div className="updateproduct-item">
                    <p>New Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="New Price" />
                </div>
            </div>

            <div className="update-product-price">
                <div className="updateproduct-item">
                    <p>Product Category</p>
                    <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kid">Kids</option>
                    </select>                
                </div>
            </div>

            <div className="updateproduct-item">
                <label htmlFor="file-input">
                    <img src={image?URL.createObjectURL(image):upload_area} className="allproduct-image" alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>

            </div>


            <button onClick={updateButton} className="update-product-btn">Update</button>
        </div>
    );
}

export default UpdateProduct;
