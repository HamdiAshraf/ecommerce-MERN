import mongoose,{Schema,ObjectId,Document} from "mongoose";
import { IProduct } from "./productModel";


const CartStatusEnum=["active","completed"]

export interface ICartItem extends Document{
product:IProduct;
unitPrice:number;
quantity:number;
}



export interface ICart extends Document{
    userId:ObjectId | string;
    items:ICartItem[];
    totalAmount:number;
    status:"active"| "completed"

}


export const CartItemSchema=new Schema<ICartItem>({
        product:{
            type:Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        unitPrice:{
            type:Number,
            required:true,
            default:1

        },
        quantity:{
            type:Number,
            required:true,  
        }
})


export const CartSchema=new Schema<ICart>({
    userId:{
        type:Schema.Types.ObjectId,
            ref:"User",
            required:true
    },
    items:[CartItemSchema],
    totalAmount:{
        type:Number,
        required:true,
        default:1
    },
    status:{
        type:String,
        enum:CartStatusEnum,
        default:"active"
    }
})



export const Cart=mongoose.model<ICart>("Cart",CartSchema)