import { createContext, useContext } from "react";



interface AuthContentType{
    email:string | null;
    token:string | null;
    login:(email:string,token:string)=>void;
}


export const AuthContext=createContext<AuthContentType>({email:null,token:null,login:()=>{}})

export const useAuth=()=> useContext(AuthContext);