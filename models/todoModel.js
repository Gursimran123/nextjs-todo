import mongoose from 'mongoose';

const  {Schema} = mongoose;

const todoSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

const Todo = mongoose.models.todos || mongoose.model('todos',todoSchema);

export default Todo;