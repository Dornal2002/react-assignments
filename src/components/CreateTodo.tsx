import "./CreateTodo.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { v4 as uuidv4, validate } from "uuid";
import { useNavigate } from "react-router";

export interface Todo {
  id: number;
  title: string;
  date: string;
  isCompleted: boolean;
}

export default function CreateTodo() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  const unique_id = uuidv4();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleAdd = () => {
    if (title && date) {
      fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "content-type": "application-json" },
        body: JSON.stringify({
          id: unique_id,
          title: title,
          date: date,
          isCompleted: false,
        }),
      })
        .then(() => alert("Data Added sucessfully"))
        .then(() => navigate("/"))
        .catch((err) => err.message);
    } else {
      alert("Todo Cannot be Empty");
    }
  };

  return (
    <div className=" mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 form p-3">
          <h2 className="mb-4">Todo Form</h2>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                id="inputField"
                placeholder="Enter Todos"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <input
                type="date"
                className="form-control"
                id="dateField"
                min={getCurrentDate()}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div>
              <button className="btn btn-primary" onClick={handleAdd}>
                Add Todo
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
