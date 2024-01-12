import React, { useContext } from "react";
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) =>{
    const {product} = props;
    const {addtoCart} = useContext(ShopContext);
    return(
        <div className="productDisplay">
            <div className="productDisplay-left">
                <div className="productDisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productDislay-img">
                    <img className="productDisplay-main" src={product.image} alt="" />
                </div>
            </div>
            <div className="productDisplay-right">
                <h1>{product.name}</h1>
                <div className="productDisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productDisplay-right-price">
                    <div className="productDisplay-right-newprice">&#x20B1;{product.new_price}</div>
                </div>
                <div className="productDisplay-right-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, nesciunt reprehenderit laudantium sint, consectetur cumque autem quos repellendus earum maiores dolores incidunt. Quisquam dolor vero ipsum quibusdam? Odit, qui quas sapiente animi deleniti iure! Placeat.
                </div>
                <div className="productDisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productDisplay-right-sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                    </div>
                </div>
                <button onClick={()=>{addtoCart(product.id)}}>Add to Cart</button>
                <p className="productDisplay-right-catgory"><span>Category: </span>Women, T-shirt, Croptop</p>
                <p className="productDisplay-right-catgory"><span>Tags: </span>Modern, Latest</p>

            </div>
        </div>
    )
}
export default ProductDisplay