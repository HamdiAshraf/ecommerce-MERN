import mongoose,{Schema,Document} from "mongoose";

export interface IUser extends Document{
    firstName:string;
    lastName:string;
    email:string;
    password:string;
}


export const UserSchema =  new Schema<IUser>({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})


export const User=mongoose.model<IUser>("User",UserSchema);