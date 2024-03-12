import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Todo } from "./Todos";
import { number } from "yargs";

export default function AddTodos() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleAdd = () => {
    if (title) {
      const todoExists = todolist.filter((todo) => todo.title === title);
      if (todoExists) {
        alert("Todo already exists");
        return;
      }
      fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "content-type": "application-json" },
        body: JSON.stringify({
          // 'id':,
          title: title,
          date: date,
          isCompleted: false,
        }),
      })
        .then(() => {
          navigate("/");
        })
        .then(() => alert("Data Added sucessfully"))
        .catch((err) => err.message);
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
