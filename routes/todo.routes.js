const express=require("express");
const {TodoModel}=require("../models/todo.model");
const todoRouter=express.Router();

todoRouter.get("/",async (req,res)=>{
 try {
  const todos=await TodoModel.find({userID:req.body.userID});
  res.send(todos)

 } catch (error) {
  res.send({msg:"todo cannot be get",err:error.message})
 }
})

todoRouter.post("/create",async (req,res)=>{
 try {
   const todo=new TodoModel(req.body);
   await todo.save();
   res.send({msg:"todo successfully created"})
 
 } catch (error) {
  res.send({msg:"todo cannot be created",err:error.message})
 }
})

todoRouter.patch("/update/:id",async (req,res)=>{
 const id=req.params.id;
 const payload=req.body;
 try {
  const user=await TodoModel.findOne({_id:id});
  const noteId=user.userID;
  const userId=req.body.userID;
  if(noteId!=userId){
   res.send({"msg":"You are not authorized"})
  }else{
   await TodoModel.findByIdAndUpdate({_id:id},payload);
   res.send({msg:"todo successfully updated"})
  }
  
 } catch (error) {
  res.send({msg:"todo cannot be updated",err:error.message})
 }
})

todoRouter.delete("/delete/:id",async (req,res)=>{
 const id=req.params.id;
 try {
  const user=await TodoModel.findOne({_id:id});
  const noteId=user.userID;
  const userId=req.body.userID;
  if(noteId!=userId){
   res.send({"msg":"You are not authorized"})
  }else{
   await TodoModel.findByIdAndDelete({_id:id});
   res.send({msg:"todo successfully deleted"})
  }
  
 } catch (error) {
  res.send({msg:"todo cannot be deleted",err:error.message})
 }
})

module.exports={
 todoRouter
}