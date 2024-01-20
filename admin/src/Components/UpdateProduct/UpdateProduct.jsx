import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './UpdateProduct.css';
import upload_area from '../../assets/upload_area.svg';

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate for navigation
  const [image, setImage] = useState(null);
  const [productDetails, setProductDetails] = useState({
    name: '',
    image: '',
    category: 'tops',
    new_price: '',
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/allproducts`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          const productToUpdate = data.find((product) => product.id === parseInt(id));
          if (productToUpdate) {
            setProductDetails(productToUpdate);
          }
        })
        .catch((error) => console.error('Error fetching product details:', error));
    } else {
      console.error('id is undefined');
    }
  }, [id]);
  
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const updateButton = async () => {
    console.log('productId:', id);
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    if (image) {
      let formData = new FormData();
      formData.append('product', image);

      await fetch('http://localhost:4000/upload', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          responseData = data;
        });
    }

    if (responseData && responseData.success) {
      product.image = responseData.image_url;
      console.log(product);
      await fetch(`http://localhost:4000/updateproduct/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          data.success ? alert('Product Updated') : alert('Error Updating Product');
          // Use navigate to go back to the product list or any other route
          navigate('/listproduct');
        });
    }
  };

    return (
        <div className="update-product">
            <div className="updateproduct-item">
                <h2>Update Product</h2>
                <p>Product Name</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Update Product Name" />
            </div>

            <div className="update-product-price">
                <div className="updateproduct-item">
                    <p>New Price</p>
                    <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder="Update Price" />
                </div>
            </div>

            <div className="updateproduct-item">
                <p>Product Category</p>
                <select value={productDetails.category} onChange={changeHandler} name="category" className="addproduct-selector">
                    <option value="tops">Tops</option>
                    <option value="buttom">Buttom</option>
                    <option value="dress">Dress</option>
                </select>                
            </div>

            <div className="updateproduct-item">
                <label htmlFor="file-input">
                    <p>Update Image</p>
                    <img src={image?URL.createObjectURL(image):upload_area} className="updateproduct-image" alt="" />
                </label>
                <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
            </div>

            <button onClick={updateButton} className="updateproduct-btn">Update</button>        
            </div>
    );
}

export default UpdateProduct;