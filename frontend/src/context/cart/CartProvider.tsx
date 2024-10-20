import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../../types/Cart";
import { BASE_URL } from "../../constants/baseUrl";
import { useAuth } from "../auth/AuthContext";


const CartProvider : FC<PropsWithChildren>=({children})=>{

    const [cartItems,setCartItems]=useState<CartItem[]>([])
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState("");
    const{token} =useAuth()
  
    useEffect(() => {
        if (!token) {
          return;
        }
    
        const fetchCart = async () => {
          const response = await fetch(`${BASE_URL}/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          if (!response.ok) {
            setError("Failed to fetch user cart. Please try again");
          }
    
          const cart = await response.json();
    
          const cartItemsMapped = cart.items.map(
            
            ({
              product,
              quantity,
              unitPrice,
            }: {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              product: any;
              quantity: number;
              unitPrice: number;
            }) => ({
              productId: product._id,
              title: product.title,
              image: product.image,
              quantity,
              unitPrice,
            })
          );
    
          setCartItems(cartItemsMapped);
          setTotalAmount(cart.totalAmount);
        };
    
        fetchCart();
      }, [token]);

    

      const AddItemToCart = async (productId: string) => {
        try {
          const response = await fetch(`${BASE_URL}/cart/items`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              productId,
              quantity: 1,
            }),
          });
    
          if (!response.ok) {
            setError("Failed to add to cart");
          }
    
          const cart = await response.json();
    
          if (!cart) {
            setError("Failed to parse cart data");
          }
    
          const cartItemsMapped = cart.items.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ({ product, quantity }: { product: any; quantity: number }) => ({
              productId: product._id,
              title: product.title,
              image: product.image,
              quantity,
              unitPrice: product.unitPrice,
            })
          );
    
          setCartItems([...cartItemsMapped]);
          setTotalAmount(cart.totalAmount);
        } catch (error) {
          console.error(error);
        }
      };
    
    

    return (
        <CartContext.Provider value={{cartItems ,totalAmount,AddItemToCart}}>
            {children}
        </CartContext.Provider>
    )


}



export default CartProvider;