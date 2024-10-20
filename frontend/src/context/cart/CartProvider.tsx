import { FC, PropsWithChildren, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/Cart";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../auth/AuthContext";


const CartProvider : FC<PropsWithChildren>=({children})=>{

    const [cartItems,setCartItems]=useState<CartItem[]>([])
    const [totalAmount,setTotalAmount]=useState<number>(0)
    const {token} =useAuth()

    const [error,setError]=useState('')

    const AddItemToCart=async(productId:string)=>{
        const response = await fetch(`${BASE_URL}/cart/items`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:`Bearer ${token}`
            },
            body: JSON.stringify({
                
                productId,
                quantity:1
            }),
        });


        if (!response.ok) {
            setError("failed to add to cart");
            return;
        }
        const cart =await response.json();
        if(!cart){
            setError("failed to parse cart data");
            return; 
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const cartItemsMapped=cart.items.map(({product,quantity}:{product:any;quantity:number})=>({ productId:product._id ,title:product.title,image:product.image,unitPrice:product.unitPrice,quantity}))
        setCartItems([...cartItemsMapped]);
        setTotalAmount(cart.totalAmount)
    }

    return (
        <CartContext.Provider value={{cartItems ,totalAmount,AddItemToCart}}>
            {children}
        </CartContext.Provider>
    )


}



export default CartProvider;