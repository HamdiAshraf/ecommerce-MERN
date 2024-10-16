import {Router,Request,Response} from "express"
import { getAllProducts } from "../services/productService";

const router=Router()



router.get("/",async(req:Request,res:Response)=>{
    try{
        const products=await getAllProducts();
    res.status(200).json(products)
    }catch(error){
        res.status(500).json({ message: "Internal Server Error", error });

    }
})







export default router;