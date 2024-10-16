import { User } from "../models/userModel";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
dotenv.config();


interface RegisterParams{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}


export const register=async({firstName,lastName,email,password}:RegisterParams)=>{

    const user=await User.findOne({email});
    if(user){
        return {statusCode:400,data:"user already exists"}
    }


    const hashedPassword=await bcrypt.hash(password,10)

    const newUser=new User({firstName,lastName,email,password:hashedPassword})

    await newUser.save();

    return {statusCode:200,data:generateJWT({firstName,lastName,email})}
}


interface LoginParams{

    email:string;
    password:string;
}


export const login=async({email,password}:LoginParams)=>{
    const user=await User.findOne({email});
    if(!user){
        return {statusCode:400,data:"incorrect email or password"}
    }

    const matchPassword=await bcrypt.compare(password,user.password);

    if(!matchPassword){
        return {statusCode:400,data:"incorrect email or password"}

    }

    return {statusCode:200,data:generateJWT({email,firstName:user.firstName,lastName:user.lastName})}
    
}

const SECRET_KEY=process.env.SECRET_KEY as string;



const generateJWT=(data:any)=>{
    return jwt.sign(data,SECRET_KEY)
}