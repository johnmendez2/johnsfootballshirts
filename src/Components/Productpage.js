import React,{useState, useEffect} from 'react'
import {Navbar} from './Navbar'
import { auth,fs } from '../Config/config';
import { useNavigate, useLocation } from 'react-router-dom';
import './styles.css';
import ImageGallery from 'react-image-gallery';

export default function Productpage({product}){
    function GetUserUid(){
        const [uid, setUid]=useState(null);
        useEffect(()=>{
            auth.onAuthStateChanged(user=>{
                if(user){
                    setUid(user.uid);
                }
            })
        },[])
        return uid;
    }

    const uid = GetUserUid();
    

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

    // state of totalProducts
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


    const location = useLocation();
    console.log(location)
    let url = location.state.product;


    function getProd(){
        // const ProdRef = collection(fs, 'Products')
        // getDocs(ProdRef).then(response =>{
        //     const a = response.docs.map(doc =>({
        //         data: doc.data(),
        //         id: doc.id,
        //     }))
        //     setProduct(a)
        // }).catch(error => console.log(error.message))
        var docRef = fs.collection("Products").doc(url);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                const a = doc.data();
                setProduct(a)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }
    const[prod, setProduct] = useState('');

    useEffect(()=>{        
        getProd();
    },[])  
    useEffect(()=>{
        console.log(prod)
    }, [prod])

    const history = useNavigate();
    let Product;
    const addToCart = (product)=>{
        console.log(product)
        if(uid!==null){
            // console.log(product);
            Product=product;
            Product['qty']=1;
            Product['TotalProductPrice']=Product.qty*Product.price;
            fs.collection('Cart ' + uid).doc(product.ID).set(Product).then(()=>{
                console.log('successfully added to cart');
            })

        }
        else{
            history('/login');
        }
        
    }

    const handleAddToCart=()=>{
        addToCart(prod);
        console.log(prod)
    }

    function ShowImg(){
        if (prod.url2 ==""){
            return(<img className='prodimg'src={prod.url} alt="product-img"/>)
        }else{
            const images = [
                {
                  original: prod.url2,
                  thumbnail: prod.url2,
                },
                {
                  original: prod.url,
                  thumbnail: prod.url,
                },

              ];
              return <ImageGallery items={images} />;
        }
    }


    
    const [Text, setText] = useState("ADD TO CART");
    return(
        
        <div>
            
            <Navbar user={user} totalProducts={totalProducts}></Navbar>
            <div className='productsbox'>
            <div className='productPrev'>
                <ShowImg/>
            </div>
            <div className='productData'>
            <h1 className='title'>
                {prod.title}
                </h1>
                <div className='btn btn-danger prodbtn' onClick={() => {handleAddToCart(); setText("ADDED TO CART ☑");}}>{Text}</div>
                <h1 className='price'>
                AED{prod.price}
                </h1>
                <p className='desc'>
                {prod.description}
                </p>
            </div>
            </div>
        </div>
    )
}