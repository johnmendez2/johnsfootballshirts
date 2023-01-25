import React,{useState} from 'react'
import { auth,fs } from '../Config/config';
import {useNavigate} from 'react-router-dom'
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

export const Modal = ({TotalPrice,hideModal}) => {
    
    const history = useNavigate();

    // form states
    const [cell, setCell]=useState(null);
    const [residentialAddress, setResidentialAddress]=useState('');
    const [cartPrice]=useState(TotalPrice);

    // close modal
    const handleCloseModal=()=>{
        hideModal();
    }

    // cash on delivery
    const handleCashOnDelivery=async(e)=>{
        e.preventDefault();
        console.log(cell, residentialAddress, cartPrice);
        const uid = auth.currentUser.uid;
        const userData = await fs.collection('users').doc(uid).get();
        await fs.collection('Buyer-Personal-Info').add({
            Name: userData.data().Name,
            Email: userData.data().Email,
            CellNo: cell,
            ResidentialAddress: residentialAddress,
            CartPrice: cartPrice,
        })
        const cartData = await fs.collection('Cart ' + uid).get();
        for(var snap of cartData.docs){
            var data = snap.data();
            data.ID = snap.id;
            await fs.collection('Buyer-Cart ' + uid).add(data);
            await fs.collection('Cart ' + uid).doc(snap.id).delete();
        }
        hideModal();
        Swal.fire({
            title: 'Order Placed!',
            text: 'Your package will be shipped out shortly. Follow @johnsfootballshirts on Instagram for updates!',
            icon: 'success',
            confirmButtonText: 'Done'
          })
          history("/")
    }

    return (
        <div className='shade-area'>
        <div className='modal-container'>
            <form className='form-group' onSubmit={handleCashOnDelivery}>                   
                <input type="tel" className='form-control' placeholder='Contact Number'
                    required pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                     onChange={(e)=>setCell(e.target.value)} value={cell}                        
                />
                <small>Format: 0501234567</small>
                <br></br>
                <br></br>
                <input type="text" className='form-control' placeholder='Address'
                    required onChange={(e)=>setResidentialAddress(e.target.value)}
                    value={residentialAddress}
                />
                <br></br>
                <label>Total Price</label>
                <input type="number" className='form-control' readOnly
                    required value={cartPrice}
                />
                <br></br>
                <button type='submit' className='btn btn-success btn-md'>Submit</button>
            </form>
            <div className='delete-icon' onClick={handleCloseModal}>x</div>
        </div>
    </div>
    )
}