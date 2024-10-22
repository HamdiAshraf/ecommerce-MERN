import { createContext, useContext } from "react";
import { CartItem } from "../../types/Cart";



interface CartContentType{
    cartItems:CartItem[];
    totalAmount:number;
    addItemToCart:(_id:string)=>void;   
    updateItemInCart:(productId:string,quantity:number)=>void;
    removeItemInCart:(productId:string)=>void;
}


export const CartContext=createContext<CartContentType>({cartItems:[],totalAmount:0,addItemToCart:()=>{},updateItemInCart:()=>{},removeItemInCart:()=>{}})

export const useCart=()=> useContext(CartContext);