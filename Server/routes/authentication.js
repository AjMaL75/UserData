import express from "express"
import  {register, deleteUser, getUser, updateUser, getOneUser } from "../logic/authentication.js"
const router=express.Router()

//for create new user
router.post("/register",register)

//for update existing user
router.post("/update/:id",updateUser)

//for displaying all the users
router.get("/view",getUser)

//for deleting an user
router.delete("/delete/:id",deleteUser)

//for getting one user
router.get('/user/:id',getOneUser)

export default router