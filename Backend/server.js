const express = require("express")
const app=express()
const mongoose=require("mongoose")
const dotenv=require("dotenv").config()
const cors=require("cors")

const PORT=process.env.PORT ||5000;


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

mongoose.connect(process.env.MONDO_URL)
.then(()=>
{
    console.log("Db connected")
})
.catch((err)=>
{
    console.log(err)
})



const todoSchma = new mongoose.Schema({
    title:{
        required:true,
        type:String},
    description:String
})
    

const todoModel=mongoose.model('todo',todoSchma)

app.post("/todo",async(req,res)=>
{
    const {title,description} = req.body
    if(!title || !description)
    {
        res.status(400).json({msg:"Parameters Required"})
    }
    try {
        const newModel=await todoModel.create({title,description})
        res.status(201).json(newModel)

        
    } catch (error) {
        res.status(500).json({error})
        
    }
})

app.get("/todo",async (req,res)=>
{
    try {
        const todos=await todoModel.find()
        res.status(201).json(todos)
        
    } catch (error) {
        res.status(501).json({msg:"can not fetch item" , err:error})
        
    }
    

})
app.put("/todo/:id",async(req,res)=>
    {
        try {
            const {title,description}=req.body
            const id=req.params.id
            const item=await todoModel.findById(id)
            if(!item)
            {
                return res.status(400).json({msg:"No item found"})
             }
            const updatesItem=await todoModel.findByIdAndUpdate(id,{title:title,description:description},{new:true})
            res.status(201).json(updatesItem)
        } catch (error) {
            res.status(501).json({msg:"Cannot update"})
            
        }
    })

app.delete("/todo/:id",async(req,res)=>
{
    
    try {
        const id=req.params.id
        await todoModel.findByIdAndDelete(id)
        res.status(204).json({msg:"Deleted Sucessfully"})
        
    } catch (error) {
        res.status(500).json({msg:"Not deleted"})
        
    }
}
)
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT,"0.0.0.0", () => {
    console.log(`Server is at : http://localhost:${PORT}`);
  });
}

module.exports=app