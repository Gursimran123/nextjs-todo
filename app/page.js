"use client";
import React,{useEffect, useState} from 'react';
import Todo from "@/components/Todo";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'

export default function Home() {
  const [formData,setFormData] = useState({
    title:"",
    description:""
  });

  const [todoData, setTodoData] = useState([]);

  const fetchTodos = async ()=>{
     try {
      const response = await axios.get('/api');
      setTodoData(response.data.todos)
     } catch (error) {
      console.log(error.message)
      toast.error(error.message);
     }
  }

 const deleteTodo = async (todoId) => {
    try {
      const response = await axios.delete('/api',{
        params:{
          todoId:todoId
        }
      });
        toast.success(response.data.message);
        fetchTodos();
    } catch (error) {
      console.log(error);
      toast.error('Error');
    }
  }

  const completeTodo = async(todoId)=>{
    const response = await axios.put('/api',{},{
      params:{
        todoId:todoId
      }
    })
    toast.success(response.data.message);
    fetchTodos();
  }

  useEffect(()=>{
    fetchTodos();
  },[])

  const submit= async (e)=>{
    e.preventDefault();
    try {
      const response= await axios.post('/api',formData)
      // console.log(formData);
      toast.success(response.data.message);
      setFormData({
        title: "",
        description: "",
      });
      await fetchTodos();
    } catch (error) {
      console.log(error)
      toast.error('Error')
    }
  }
  return (
    <>
      <form
        onSubmit={submit}
        className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto"
      >
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter title"
          className="px-3 py-2 border-2 w-full"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter description"
          className="px-3 py-2 border-2 w-full mt-2"
        ></textarea>
        <button
          type="submit"
          className="bg-orange-600 py-3 px-11 text-white mt-2"
        >
          Add Todo
        </button>
      </form>
      <ToastContainer />
      <div className="relative overflow-x-auto m-24 mx-auto w-[60%]">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <Todo todo={todoData} deleteTodo={deleteTodo} completeTodo={completeTodo}/>
          </tbody>
        </table>
      </div>
    </>
  );
}
