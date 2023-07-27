import express from "express"
import  {register, deleteUser, getUser, updateUser } from "../logic/authentication.js"
const router=express.Router()

//for create new user
router.post("/register",register)

//for update existing user
router.post("/update/:id",updateUser)

//for displaying all the users
router.get("/view",getUser)

//for deleting an user
router.delete("/delete/:id",deleteUser)

export default router