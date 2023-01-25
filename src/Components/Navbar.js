import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.png'
import Icon from 'react-icons-kit';
import { shoppingCart } from 'react-icons-kit/feather/shoppingCart'
import { useNavigate } from 'react-router-dom';
import { auth } from '../Config/config';
import '../index.css';
import './styles.css';
export const Navbar = ({user, totalProducts}) => {

    const history = useNavigate();
    console.log(user)
    const handleLogout=()=>{
        auth.signOut().then(()=>{
            history('/login');
        })
    }

    return (
        <div className='navbar'>
            <div className='leftside'>
                <div className='logo'>
                    <Link to={"/"}>
                    <img src={logo} alt="logo"/>
                    </Link>
                </div>
            </div>
            <div className='rightside'>

                {!user&&<>
                    <div><Link className='navlink' to="signup">Sign up</Link></div>
                    <div><Link className='navlink' to="login">Login</Link></div>
                </>} 
                {user&&<>
                    <h1 id='label2'> Hi, {user}</h1>
                    <div className='cart-menu-btn'>
                        <Link className='navlink' to="/cart">
                            🛒
                        </Link>
                        <span className='cart-indicator'>{totalProducts}</span>
                    </div>
                    <div className='btn btn-danger btn-md'
                    onClick={handleLogout}>LOGOUT</div>
                </>}   
                                   
                                
            </div>
        </div>

    )
}
