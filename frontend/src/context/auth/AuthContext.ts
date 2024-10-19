import { createContext, useContext } from "react";



interface AuthContentType{
    email:string | null;
    token:string | null;
    isAuthenticated:boolean;
    login:(email:string,token:string)=>void;
    logout:()=>void;
}


export const AuthContext=createContext<AuthContentType>({email:null,token:null,login:()=>{},isAuthenticated:false,logout:()=>{}})

export const useAuth=()=> useContext(AuthContext);