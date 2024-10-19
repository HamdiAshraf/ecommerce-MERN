import { createContext, useContext } from "react";



interface AuthContentType{
    email:string | null;
    token:string | null;
    login:(email:string,token:string)=>void;
    isAuthenticated:boolean
}


export const AuthContext=createContext<AuthContentType>({email:null,token:null,login:()=>{},isAuthenticated:false})

export const useAuth=()=> useContext(AuthContext);