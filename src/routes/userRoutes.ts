
import {Router,Request,Response} from "express"
import { login, register } from "../services/userService";
import {check,validationResult} from "express-validator"


const router=Router()

router.post("/register",[
   check('firstName').notEmpty().withMessage("firstName must be provided"),
   check('lastName').notEmpty().withMessage("lastName must be provided"),
   check('email').notEmpty().withMessage("email must be provided")
   .isEmail().withMessage("please enter valid email"),
   check('password').notEmpty().withMessage("password must be provided")
   .isLength({min:6}).withMessage("password must be at least 6 characters"),

   
],async (req:Request,res:Response):Promise<void> =>{

    try{
     const errors= validationResult(req)
     if(!errors.isEmpty()){
          res.status(400).json(errors.array())
          return;
     }
     const {firstName,lastName,email,password}=req.body;
 
     const {statusCode,data} =await register({firstName,lastName,email,password})
 
      res.status(statusCode).json(data);
    }catch(error){
     res.status(500).json({ message: "Internal Server Error", error });

    }
})



router.post("/login",async (req,res)=>{
    try{
     const {email,password}=req.body;

     const {statusCode,data} =await login({email,password})
 
      res.status(statusCode).json(data);
    }catch(err){
     res.status(500).json({ message: "Internal Server Error", error });

    }
})

export default router;