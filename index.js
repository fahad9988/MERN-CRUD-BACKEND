const express=require("express");
const {connection}=require("./configs/db");
const {todoRouter}=require("./routes/todo.routes");
const {userRouter}=require("./routes/user.routes");
const {authenticator}=require("./middlewares/authenticate.middleware")
const cors=require("cors");
require("dotenv").config();

const app=express();

app.use(cors({
 origin:"*"
}));
app.use(express.json());

app.use("/users",userRouter);
app.get("/",(req,res)=>{
 res.send("welcome")
})

app.use(authenticator)
app.use("/todos",todoRouter)




app.listen(process.env.port,async ()=>{
 try {
  await connection
  console.log("db has started")
 } catch (error) {
  console.log("failed to start db");
  console.log(error)
 }
console.log(`server has started at port ${process.env.port}`)
})