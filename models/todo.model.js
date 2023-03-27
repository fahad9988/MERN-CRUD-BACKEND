const mongoose=require("mongoose");

const todoSchema=mongoose.Schema({
 name:{type:String,required:true},
 status:{type:Boolean,required:true},
 userID:String
});

const TodoModel=mongoose.model("todo",todoSchema);

module.exports={
 TodoModel
}