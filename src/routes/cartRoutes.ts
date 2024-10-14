import {Router,Request,Response} from "express"
import { addItemToCart, deleteItemInCart, getActiveCartForUser, updateItemInCart } from "../services/cartService";
import {validateJWT} from "../middlewares/validateJWT"
import { ExtendRequest } from "../types/ExtendRequest";
const router=Router()

router.get("/", validateJWT, async (req:ExtendRequest, res) => {
    const userId = req.user._id; 

    

    try {
        const cart = await getActiveCartForUser({ userId });
        res.status(200).json(cart); 
    } catch (error) {
        
        res.status(500).json({ message: "Internal Server Error", error });
    }
});



router.post("/items",validateJWT,async(req:ExtendRequest,res)=>{
    const userId=req.user._id;
    const {productId,quantity} =req.body;
    const {data,statusCode}=await addItemToCart({userId,productId,quantity})
    res.status(statusCode).json(data)
})

router.put("/items",validateJWT,async(req:ExtendRequest,res)=>{
    const userId=req.user._id;
    const {productId,quantity} =req.body;
    const {data,statusCode}=await updateItemInCart({userId,productId,quantity})
    res.status(statusCode).json(data)
})


router.delete("/items/:productId",validateJWT,async(req:ExtendRequest,res)=>{
    const userId=req.user._id;
    const {productId}=req.params;
    
    const {data,statusCode}=await deleteItemInCart({userId,productId})
    res.status(statusCode).json(data)
})

export default router;
