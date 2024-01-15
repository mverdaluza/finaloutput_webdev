import React, { useEffect, useState } from "react";
import './Popular.css'
import Item from "../Item/Item";

const Popular = () => {

    const [popularProd, setpopularProd] = useState([]);
    useEffect(()=>{
        fetch('http://localhost:4000/popularintops')
        .then((response)=>response.json())
        .then((data)=>setpopularProd(data));
    },[])
    
    return (
        <div className="popular">
            <h1>POPULAR IN TOPS</h1>
            <hr />
            <div className="popular-item">
                {popularProd.map((item, index) => (
                     <Item key={index} id={item.id} name={item.name} image={item.image} new_price={item.new_price}/>
                ))}
            </div>
        </div>
    )
}

export default Popular;
