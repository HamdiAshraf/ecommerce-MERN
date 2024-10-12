import {Router,Request,Response} from "express"
import { getAllProducts } from "../services/productService";

const router=Router()



router.get("/",async(req:Request,res:Response)=>{
    const products=await getAllProducts();
    res.status(200).json(products)
})







export default router;