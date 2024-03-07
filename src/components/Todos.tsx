import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Todos.css";
import { title } from "process";
import { useNavigate } from "react-router-dom";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export default function Todos() {
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [trigger, setTrigger] = useState(0);

  const navigate = useNavigate();

  // const [newTodo,setNewTodo]=useState<Todo>()

  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((resp) => resp.json())
      .then((data) => setTodolist(data));
  }, [trigger]);

  const handleCheckbox = (
    todo: Todo,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.checked);
    fetch(`http://localhost:8000/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: e.target.checked,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setTrigger(trigger + 1);
      });
  };

  const handleDelete = (id: number) => {
    console.log(id);
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => alert("Deleted Successfully"))
      .then(() => setTrigger(trigger + 1));
  };

  return (
    <>
      <div className="todos">
        {todolist.map((item: Todo, index: number) => (
          <div
            key={item.id}
            className="card card-hover justify-content-center text-center w-25 mt-3 mb-3 d-flex flex-row"
          >
            <h5 className="card-body card-text d-inline-flex">
              <div onClick={() => navigate("/viewtodos/" + item.id)}>
                {index + 1}.{item.title}
              </div>
              <input
                className="check-box"
                checked={item.isCompleted}
                onChange={(e) => {
                  handleCheckbox(item, e);
                }}
                type="checkbox"
              />
              <button
                className="btn btn-danger"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </h5>
          </div>
        ))}
      </div>
    </>
  );
}
