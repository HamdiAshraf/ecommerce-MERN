import { createContext, useContext } from "react";
import { CartItem } from "../../types/Cart";



interface CartContentType{
    cartItems:CartItem[];
    totalAmount:number;
    AddItemToCart:(_id:string)=>void;   
}


export const CartContext=createContext<CartContentType>({cartItems:[],totalAmount:0,AddItemToCart:()=>{}})

export const useCart=()=> useContext(CartContext);