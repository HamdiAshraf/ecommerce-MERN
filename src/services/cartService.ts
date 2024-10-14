import { Cart } from "../models/cartModel";

interface CreateCartForUser{
    userId:string;
}


const createCartForUser=async({userId}:CreateCartForUser)=>{
    const cart=await Cart.create({userId,totalAmount:0});
    await cart.save();
    return cart;
}




interface GetActiveCartForUser{
    userId:string;
}


export const getActiveCartForUser=async({userId}:GetActiveCartForUser)=>{
    let cart=await Cart.findOne({userId,status:"active"});
    if(!cart){
        cart=await createCartForUser({userId});
    }

    return cart;
}