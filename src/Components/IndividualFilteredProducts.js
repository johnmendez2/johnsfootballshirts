import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export const IndividualFilteredProduct = ({individualFilteredProduct, addToCart}) => {

    const handleAddToCart=()=>{
        addToCart(individualFilteredProduct);
    }

    const [Text, setText] = useState("ADD TO CART");
    const history = useNavigate();
    const produrl = individualFilteredProduct.ID;
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={individualFilteredProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{individualFilteredProduct.title}</div>
            <div className='product-text '>AED {individualFilteredProduct.price}</div>
            <div className='product-text '>Size: {individualFilteredProduct.size}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={() => {handleAddToCart(); setText("ADDED TO CART ☑");}}>{Text}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={() => {history('/product',{state:{product:produrl}});}}>DETAILS </div>
        </div> 
    )
}