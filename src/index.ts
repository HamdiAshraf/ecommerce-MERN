import dotenv from 'dotenv';
import express from "express";
import mongoose from "mongoose";

import usersRoute from "./routes/userRoutes"
import productsRoute from "./routes/productsRoutes";
import { setInitialProducts } from './services/productService';


dotenv.config();


const app=express()
const PORT=process.env.PORT||3001;
const DB_URL=process.env.DB_URL as string;

app.use(express.json())


mongoose.connect(DB_URL,).then(()=>console.log(`connected successfully to db`)
).catch((err)=>console.log("DB ERROR",err)
)

app.use("/users",usersRoute)
app.use("/products",productsRoute)




//seed the products to db
setInitialProducts()

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT} at http://localhost:${PORT}`);
    
})