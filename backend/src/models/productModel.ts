import mongoose,{Schema,Document} from "mongoose";

export interface IProduct extends Document{
    title:string;
    image:string;
    price:number;
    stock:number;
}


export const ProductSchema=new Schema<IProduct>({
    title:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true
    },

})


export const Product=mongoose.model<IProduct>('Product',ProductSchema);