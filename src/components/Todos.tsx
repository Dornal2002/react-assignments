import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Todos.css";
import { useNavigate } from "react-router-dom";

export interface Todo {
  id: number;
  title: string;
  date: string;
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
    // console.log(e.target.checked);
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
       <div className="todos d-flex justify-content-left ms-0">
          <table className="table ">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todolist
                .map((item: Todo, index: number) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div onClick={() => navigate("/viewtodos/" + item.id)}>
                        {item.title}
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>
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
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
    </>
  );
}
