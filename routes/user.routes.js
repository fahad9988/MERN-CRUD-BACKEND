const express=require("express");
const { UserModel } = require("../models/user.model");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const userRouter=express.Router();

userRouter.post("/register",async (req,res)=>{
 const {name,email,password,age}=req.body;
 try {
  let isExist=await UserModel.find({email});
  if(isExist.length>0){
   res.send("User already exist, please login")
  }else{
   bcrypt.hash(password, 5,async function(err, secure_password) {
    if(err){
     res.send({"err":err})
    }else{
     const user=new UserModel({name,email,password:secure_password,age});
     await user.save();
     res.send({"msg":"User registered Successfully"});
    }
 });
  }
 
 } catch (error) {
  res.send({"err":error.message})
 }
});

userRouter.post("/login",async (req,res)=>{
 const {email,password}=req.body;
try {
const user=await UserModel.find({email});
if(user.length>0){
 bcrypt.compare(password, user[0].password, function(err, result) {
  if(result){
   var token = jwt.sign({ userID: user[0]._id }, 'hello');
   res.send({"msg":"User logged in successfully","token":token});
  }else{
   res.send({"msg":"Wrong Credentials"})
  }
 
});
 
}else{
 res.send({"msg":"Wrong Credentials"})
}
} catch (error) {
 res.send({"err":error.message})
}
 });

module.exports={
 userRouter
}