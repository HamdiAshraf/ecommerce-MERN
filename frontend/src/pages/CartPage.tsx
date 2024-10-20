import { Box, Typography } from "@mui/material";
import  Container  from "@mui/material/Container";

import { useCart } from "../context/cart/CartContext";


const CartPage=()=>{
    

    

    const {cartItems} =useCart();

    

return (
    <Container sx={{ mt: 2 }}>
        <Typography variant="h4">
            My Cart
        </Typography>

        {cartItems.map((item)=>(
            <Box>{item.title}</Box>
            

        ))}
        </Container>
);
}


export default CartPage;