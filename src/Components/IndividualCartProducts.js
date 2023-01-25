import React from 'react'
import { auth,fs } from '../Config/config'
import Swal from 'sweetalert2'

export const IndividualCartProduct = ({cartProduct}) => {
    const handleCartProductDelete=()=>{
        Swal.fire({
            title:'Item succesfully removed from cart',
            confirmButtonText: 'Done'
          })
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).doc(cartProduct.ID).delete().then(()=>{
                    console.log('successfully deleted');
                })
            }
        })
    }
    return (
        <div className='product'>
            <div className='product-img'>
                <img src={cartProduct.url} alt="product-img"/>
            </div>
            <div className='product-text title'>{cartProduct.title}</div>
            <div className='product-text'>AED {cartProduct.price}</div>
            <div className='btn btn-danger btn-md cart-btn' onClick={handleCartProductDelete}>REMOVE</div>            
        </div>
    )
}