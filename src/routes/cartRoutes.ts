import {Router,Request,Response} from "express"
import { getActiveCartForUser } from "../services/cartService";
import {validateJWT} from "../middlewares/validateJWT"
import { ExtendRequest } from "../middlewares/validateJWT";
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



export default router;
