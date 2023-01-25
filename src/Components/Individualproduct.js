import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const IndividualProduct = ({individualProduct, addToCart}) => {
    //console.log(individualProduct);
    const handleAddToCart=()=>{
        addToCart(individualProduct);
        console.log(individualProduct)
        console.log(produrl)
    }  

    const [Text, setText] = useState("ADD TO CART");
    const history = useNavigate();
    const produrl = individualProduct.ID;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualProduct.title}</div>
            <div className='product-text'>AED {individualProduct.price}</div>
            <div className='product-text size'>Size: {individualProduct.size}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={() => {handleAddToCart(); setText("ADDED TO CART ☑");}}>{Text}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={() => {history('/product',{state:{product:produrl}});}}>DETAILS </div>
        </div> 
    )
}