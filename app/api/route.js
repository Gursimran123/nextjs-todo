import {NextRequest,NextResponse} from 'next/server'
import { connectDB } from '@/config/dbConfig'
import Todo from '@/models/todoModel';

connectDB();

export async function GET(request){
   try {
     const todos = await Todo.find({});
     return NextResponse.json({ todos: todos },{status:200});
   } catch (error) {
     return NextResponse.json({error:error.message},{status:400})
   }
}

export async function POST(request){
    try {
        const { title, description } = await request.json();

        const todo = await Todo.create({
          title,
          description,
        });

        return NextResponse.json(
          { message: "Todo Created!" },
          { success: true },{
            status:200
          }
        );
    } catch (error) {
        return NextResponse.json({message:error.message},{status:400})
    }
}

export async function DELETE(request){
   
     const todoId = await request.nextUrl.searchParams.get('todoId')
     await Todo.findByIdAndDelete(todoId);
     return NextResponse.json({message:"Todo Deleted"});
}

export async function PUT(request){
   
     const todoId = await request.nextUrl.searchParams.get('todoId')
     await Todo.findByIdAndUpdate(todoId,{
        $set:{
            isCompleted:true
        }
     });
     return NextResponse.json({message:"Todo Completed"});
}