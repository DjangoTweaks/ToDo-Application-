const mongoose = require("mongoose");
const { boolean } = require("zod");

mongoose.connect("mongodb+srv://akshat123:akshat123@cluster0.9frcojs.mongodb.net/ToDoAppReact");

const TodoSchema = mongoose.Schema({
    title: String, 
    description: String, 
    completed: Boolean
})



const TodoModel = mongoose.model("ToDoCollection", TodoSchema);

module.exports={
    TodoModel: TodoModel
}

