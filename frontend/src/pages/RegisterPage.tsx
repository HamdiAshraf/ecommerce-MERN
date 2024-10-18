import  Typography  from "@mui/material/Typography";
import  Container  from "@mui/material/Container";
import  Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField  from "@mui/material/TextField";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";





const RegisterPage=()=>{
    const [error,setError]=useState("")
    const firstNameRef=useRef<HTMLInputElement>(null);
    const lastNameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);


    const onSubmit=async()=>{
        const firstName=firstNameRef.current?.value;
        const lastName=lastNameRef.current?.value;
        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;





        const response=await fetch(`${BASE_URL}/users/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstName,
                lastName,
                email,
                password
            })
        })
        if(!response.ok){
            setError("unable to register user,please try different credintials")
        }
        const data=await response.json();
        console.log(data);
        
    }
    return(
        <Container>
            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center", mt:4}}>

            <Typography variant="h6">
                Register New Account
            </Typography>
            </Box>


            <Box sx={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:2,border:1,p:2,borderColor:"#f5f5f5"}}>
                <TextField inputRef={firstNameRef} label="FirstName" name="firstName"/>
                <TextField inputRef={lastNameRef} label="LastName" name="lastName"/>
                <TextField inputRef={emailRef} label="Email" name="email"/>
                <TextField inputRef={passwordRef} label="Password" name="password"/>

                <Button  onClick={onSubmit} variant="contained">Register</Button>

                {error && <Typography sx={{color:"red"}}>{error}</Typography>}
            </Box>
            
        </Container>
    );
}


export default RegisterPage;