"use client";
import React from 'react'

const Todo = ({todo,deleteTodo,completeTodo}) => {
  return (
    <>
      {todo.map((item, index) => (
        <tr
          key={index}
          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
        >
          <th
            scope="row"
            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {index + 1}
          </th>
          <td className={`px-6 py-4 ${item.isCompleted ? "line-through" : ""}`}>
            {item.title}
          </td>
          <td className={`px-6 py-4 ${item.isCompleted ? "line-through" : ""}`}>
            {item.description}
          </td>
          <td className="px-6 py-4">
            {item.isCompleted ? "Completed" : "Pending"}
          </td>
          <td className="px-6 py-4 flex gap-2">
            <button
              onClick={() => deleteTodo(item._id)}
              className="btn py-2 px-4 bg-red-500 text-white"
            >
              Delete
            </button>
            {item.isCompleted ? (
              ""
            ) : (
              <button
                onClick={() => completeTodo(item._id)}
                className="btn py-2 px-4 bg-green-500 text-white"
              >
                Done
              </button>
            )}
          </td>
        </tr>
      ))}
    </>
  );
}

export default Todo