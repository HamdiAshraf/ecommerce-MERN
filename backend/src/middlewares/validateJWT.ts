import dotenv from 'dotenv';

import {NextFunction,Request,Response} from "express"
import jwt, { Secret } from "jsonwebtoken"
import { User } from "../models/userModel";
import { ExtendRequest } from '../types/ExtendRequest';

dotenv.config();







export const validateJWT=(req:ExtendRequest,res:Response,next:NextFunction)=>{
    const authorizationHeader= req.get('Authorization');

    if(!authorizationHeader){
        res.status(403).json("Authorization header was not provided")
        return;
    }

    const token = authorizationHeader?.split(" ")[1];

    if(!token){
        res.status(403).json("Bearer token not found");
        return;
    }


    jwt.verify(token,process.env.SECRET_KEY as Secret,async(err,payload)=>{
        if(err || !payload){
            res.status(403).json("invalid token");
        return;
        }

        

        const userPayload=payload as {
            firstName:string;
            lastName:string;
            email:string;
        }
        const user=await User.findOne({email:userPayload.email})
        req.user=user;

        next();
    })
}