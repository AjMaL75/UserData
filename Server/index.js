import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import Authentication from "./routes/authentication.js"

const app=express()
dotenv.config()
app.use(express.json())

//mongodb connection
const connect=async()=>{
    try{
           await  mongoose.connect(process.env.MONGODB_URL)
           console.log("mongodb connected successfully");
    }
    catch(err)
    {
        console.log(err);
    }
}

//check mongodb connection 
mongoose.connection.on("connected",()=>{
    console.log("mongodb  connected ");
})
mongoose.connection.off("disconnected",()=>{
    console.log("mongodb disconnected ");
})

//middlewares
app.use(cors())
app.use(cookieParser())
app.use("/authentication",Authentication)


//middleware for error checking 
app.use((error,req,res,next)=>{
    const errorStatus=error.status || 500
    const errorMessage=error.message ||"something has went wrong "
    res.status(errorStatus).json(
        {
            success:false,
            status:errorStatus,
            message:errorMessage,
            stack:error.stack
        }
    )
    next()
})

app.listen(8000,()=>{
    connect();
    console.log("server has running");
})
