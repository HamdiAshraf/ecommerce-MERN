import { FC, PropsWithChildren,useState } from "react";
import { AuthContext } from "./AuthContext";

const EMAIL_KEY='email';
const TOKEN_KEY='token'

const AuthProvider : FC<PropsWithChildren>=({children})=>{

    const [email,setEmail]=useState<string|null>(localStorage.getItem(EMAIL_KEY))
    const [token,setToken]=useState<string|null>(localStorage.getItem(TOKEN_KEY))

    const isAuthenticated=!!token;


    const login=(email:string,token:string)=>{
        setEmail(email);
        setToken(token);
        localStorage.setItem(EMAIL_KEY,email);
        localStorage.setItem(TOKEN_KEY,token);

    }


    const logout=()=>{
        localStorage.removeItem(EMAIL_KEY);
        localStorage.removeItem(TOKEN_KEY);
        setEmail(null);
        setToken(null);

    }

    return (
        <AuthContext.Provider value={{email,token,isAuthenticated,login,logout}}>
            {children}
        </AuthContext.Provider>
    )


}



export default AuthProvider;