import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Todo } from "../types/Todo";
import { v4 as uuidv4 } from "uuid";
import { useMutation ,  useQueryClient} from "react-query";
import axios from "axios";


export default function AddTodos() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const unique_id = uuidv4();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const addTodoMutation = useMutation(
    (newTodo: Todo) => axios.post("http://localhost:8000/todos", newTodo),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("todos");
        navigate("/");
        alert("Data Added successfully");
      },
      onError: (error: any) => {
        console.error("Error adding todo:", error);
      },
    }
  );

  const handleAdd = () => {
    if (title) {
      const newTodo: Todo = {
        id:unique_id,
        title: title,
        date: date,
        isCompleted: false,
      };
      addTodoMutation.mutate(newTodo);
    } else {
      alert("Todo Cannot be Empty");
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Enter Todos"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="date"
        className="inputdate"
        value={date}
        min={getCurrentDate()}
        onChange={(e) => setDate(e.target.value)}
      />
      <button className="btn btn-danger" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
