import User from "../models/User.js"
import bcrypt from "bcrypt"

const register=async (req,res,next)=>{
    try{
            const user=await User.findOne({username:req.body.username})
            if(user)
            {
                 res.status(404).json({
                    message:"user already exist please enter differnt name"
                 })
            }
            else
            {
                var salt=await bcrypt.genSalt(10)
                var hash=await bcrypt.hash(req.body.password,salt)

                const newUser=new User({
                    username:req.body.username,
                    email:req.body.email,
                    password:hash
                })
               await  newUser.save()

               res.status(200).json({
                message:"user has registered successfully"
               })
            }
    }
    catch(err)
    {
        throw err
    }
}
const updateUser=async(req,res,next)=>{

        try{
            const updateduser=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
            if(!updateduser)
            {
                res.status(404).json({
                    message:"Entered user has does not exist"
                })
            }
            else{
                const {password,...others}=updateduser._doc
                    res.status(200).json({
                        data:others,
                        message:"user data has updated successfully"
                    })
            }
        }
        catch(err)
        {
            next(err)
        }
}
const getUser=async(req,res,next)=>{

    try{
        const getuser=await User.find()
        if(!getuser)
        {
            next("users are does not exist")
        }
        else{
            res.status(200).json(getuser)
        }
    }
    catch(err)
    {
        next(err)
    }
}
const deleteUser=async(req,res,next)=>{

    try{
            const deleteuser=await User.findByIdAndDelete(req.params.id)
            if(deleteuser){
            res.status(200).json({
                message:"this user has deleted successfully"
            })
            }
            else{
                res.status(404).json({
                    message:"this user has does not exist please find valid user"
                })
            }
    }
    catch(err)
    {
        next(err)
    }
}

export  {register,updateUser,getUser,deleteUser}