import { Typography } from "@mui/material";
import  Container  from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth/AuthContext";
import { BASE_URL } from "../constants/baseUrl";


const CartPage=()=>{
    const {token} =useAuth()

    const [cart,setCart]=useState()
    const [error,setError]=useState('')

    useEffect(()=>{
        if(!token){
            return;
        }

        const fetchCart=async()=>{
            const response =await fetch(`${BASE_URL}/cart`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(!response.ok){
                setError('failed to fetch user cart,please try again later')
            }
            const data=await response.json();

            setCart(data)
        }

        fetchCart()
        console.log({cart});
        console.log({error});

        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[token])


return (
    <Container sx={{ mt: 2 }}>
        <Typography variant="h4">
            My Cart
        </Typography>
        </Container>
);
}


export default CartPage;