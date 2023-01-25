import React,{useState, useEffect} from 'react'
import {Navbar} from './Navbar'
import { auth,fs } from '../Config/config';
import { CartProducts } from './CartProducts';
import './styles.css';
import { Modal } from './Modal';

export const Cart = () => {

    // show modal state
    const [showModal, setShowModal]=useState(false);

    // trigger modal
    const triggerModal=()=>{
        setShowModal(true);
    }

    // hide modal
    const hideModal=()=>{
        setShowModal(false);
    }

    // getting current user function
    function GetCurrentUser(){
        const [user, setUser]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    fs.collection('users').doc(user.uid).get().then(snapshot=>{
                        setUser(snapshot.data().Name);
                    })
                }
                else{
                    setUser(null);
                }
            })
        },[])
        return user;
    }

    const user = GetCurrentUser();
    // console.log(user);
    
    // state of cart products
    const [cartProducts, setCartProducts]=useState([]);

    // getting cart products from firestore collection and updating the state
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            if(user){
                fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                    const newCartProduct = snapshot.docs.map((doc)=>({
                        ID: doc.id,
                        ...doc.data(),
                    }));
                    setCartProducts(newCartProduct);                    
                })
            }
            else{
                console.log('user is not signed in to retrieve cart');
            }
        })
    },[])

    console.log(user);
    // getting the qty from cartProducts in a seperate array
    const qty = cartProducts.map(cartProduct=>{
        return cartProduct.qty;
    })

    // reducing the qty in a single value
    const reducerOfQty = (accumulator, currentValue)=>accumulator+currentValue;

    const totalQty = qty.reduce(reducerOfQty,0);

    // console.log(totalQty);

    // getting the TotalProductPrice from cartProducts in a seperate array
    const price = cartProducts.map((cartProduct)=>{
        return cartProduct.TotalProductPrice;
    })

    // reducing the price in a single value
    const reducerOfPrice = (accumulator,currentValue)=>accumulator+currentValue;

    const totalPrice = price.reduce(reducerOfPrice,0);
    const totalPricewShip = totalPrice + 20;


    const [totalProducts, setTotalProducts]=useState(0);
     // getting cart products   
     useEffect(()=>{        
         auth.onAuthStateChanged(user=>{
             if(user){
                 fs.collection('Cart ' + user.uid).onSnapshot(snapshot=>{
                     const qty = snapshot.docs.length;
                     setTotalProducts(qty);
                 })
             }
         })       
     },[])  
    return (
        <>
            <Navbar user={user} totalProducts={totalProducts} />           
            <br></br>
            {cartProducts.length > 0 && (
                <div className='container-fluid'>
                    <h1 className='text-center'>Cart</h1>
                    <div className='products-box'>
                        <CartProducts cartProducts={cartProducts}/>
                    </div>
                    <div className='summary-box'>
                        <h5>Cart Summary</h5>
                        <br></br>
                        <div>
                        Total No of Products: <span>{totalQty}</span>
                        </div>
                        <div>
                        Subtotal: <span>AED {totalPrice}</span>
                        </div>
                        <div>
                        Shipping: <span>AED 20</span>
                        </div>
                        <div>
                        Total: <span>AED {totalPricewShip}</span>
                        </div>
                        <br></br>
                        <button type="submit" className='btn btn-success btn-md' onClick={()=>triggerModal()}>Pay cash on delivery</button>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div id='label1'>Your cart could use some shirts!</div>
            ) }
            {showModal===true&&(
                <Modal TotalPrice={totalPricewShip}
                    hideModal={hideModal}
                />
            )}              
        </>
    )
}