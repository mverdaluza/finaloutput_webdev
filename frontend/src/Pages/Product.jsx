import React, {useContext} from "react";
import { ShopContext } from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import Description from "../Components/Description/Description";
import RelatedProduct from "../Components/RelatedProducts/RelatedProduct";

const Product = () =>{
    const {all_product} = useContext(ShopContext)
    const {productId} = useParams();
    const product = all_product.find((e)=> e.id === Number(productId));

    return (
        <div>
            <Breadcrum product={product}/>
            <ProductDisplay product={product}/>
            <Description />
            <RelatedProduct/>
        </div>
    )
}
export default Product