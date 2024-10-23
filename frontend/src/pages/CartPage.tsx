import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useCart } from "../context/cart/CartContext";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const { cartItems, totalAmount,updateItemInCart,removeItemInCart ,clearCart} = useCart();

    const navigate=useNavigate();
    const handleQuantity=(productId:string,quantity:number)=>{
        if(quantity<=0){
            return;
        }
        updateItemInCart(productId,quantity);
    }


    const handleRemoveItem=(productId:string)=>{
        removeItemInCart(productId)
    }

    const handleCheckout=()=>{
        navigate("/checkout")
    }

    const renderCartItems= ()=>(
        <><Box display="flex" flexDirection="column" gap={3}>
            {cartItems.map((item) => (
                <Box

                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{
                        bgcolor: "#fff",
                        borderRadius: 1,
                        padding: 2,
                        boxShadow: 1,
                    }}
                >
                    <Box display="flex" alignItems="center" gap={2}>
                        <img src={item.image} width={100} alt={item.title} style={{ borderRadius: '8px' }} />
                        <Box>
                            <Typography variant="h6" sx={{ color: "#555" }}>{item.title}</Typography>
                            <Typography sx={{ color: "#777" }}>{item.quantity} x ${item.unitPrice.toFixed(2)}</Typography>
                            <Button onClick={() => handleRemoveItem(item.productId)} variant="outlined" color="error" sx={{ mt: 1 }}>Remove Item</Button>
                        </Box>
                    </Box>
                    <ButtonGroup variant="contained">
                        <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)} sx={{ bgcolor: "#4caf50" }}>+</Button>
                        <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)} sx={{ bgcolor: "#f44336" }}>−</Button>
                    </ButtonGroup>
                </Box>
            ))}
        </Box><Box display="flex" flexDirection="row" justifyContent="space-between" sx={{ mt: 4, textAlign: 'right' }}>
                <Typography variant="h5" sx={{ color: "#333" }}>
                    Total Amount: ${totalAmount.toFixed(2)}
                </Typography>
                <Button variant="contained" onClick={()=>handleCheckout()}>Go To Checkout</Button>
            </Box></>
    )
    return (
        <Container fixed sx={{ mt: 4, mb: 4, bgcolor: "#f9f9f9", borderRadius: 2, padding: 3 }}>
            <Box display="flex" flexDirection="row" justifyContent="space-between" sx={{mb:4}}>
            <Typography variant="h4" align="center" sx={{ mb: 3, color: "#333" }}>
                My Cart
            </Typography>
            <Button onClick={() => clearCart()}>Clear Cart</Button>
            </Box>
            {cartItems.length ? (
        renderCartItems()
        
      ) : (
        <Typography>
          Cart is empty. Please start shopping and add items first.
        </Typography>
      )}
        </Container>
    );
}

export default CartPage;
