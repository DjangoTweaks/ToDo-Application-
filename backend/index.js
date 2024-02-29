const express = require("express");
const bodyParser = require("body-parser");
const { createTodo, updateTodo } = require("./types");
const z = require("zod");
const { TodoModel } = require("./db");
const m = require("mongoose");
const cors = require("cors");


const app = express(); 

app.use(express.json());
app.use(cors());



app.post("/todo", async (request,resolve)=>{

    const createPayload = request.body; 
    const parsedPayload = createTodo.safeParse(createPayload); 

    if(!parsedPayload.success)
    {
        resolve.status(411).json({
            msg: "You have sent the wrong inputs"
        });

        return;
    }

    try{
        await TodoModel.create({
            title: createPayload.title, 
            description: createPayload.description,
            completed: createPayload.completed 
        });
        resolve.status(200).json({
            msg: "Successful Creation of TODO"
        })
        
    }

    catch(error) 
    {
        console.error(error)
        resolve.status(404).json({
            msg: "Error"
        })
    }  
})



app.get("/todos", async (request,resolve)=>{

    await TodoModel.find().then((data)=>{
        resolve.send({data});
    })
    
})


app.put("/completed", async(request,resolve)=>{
    const updatePayload = request.body; 
    const parsedPayload = updateTodo.safeParse(updatePayload); 

    if(!parsedPayload.success)
    {
        resolve.status(411).json({
            msg: "You have sent the wrong inputs"
        });

        return;
    }

    try
    {

        await TodoModel.updateOne({
            _id: request.body._id
        }, {
            completed: true 
        });

        resolve.json({
            msg: "ToDo Completed"
        });
    }
    catch(err)
    {
        console.log(err);
    }

});

app.listen(3000);