import "./CreateTodo.css";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { v4 as uuidv4, validate } from "uuid";

export interface Todo {
  id: number;
  title: string;
  date: string;
}

export default function CreateTodo() {
  const [title, setTitle] = useState<string>();
  const [date, setDate] = useState<string>();
  const unique_id = uuidv4();

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
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
        }),
      })
        .then((res) => res.json)
        .then(() => alert("Data Posted Successfully"))
        .catch((err) => err.message);
    
    }
  };

  return (
    <>
      <div className="container mt-5">
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
                  onChange={(e) => handleChangeInput(e)}
                  required
                />
              </div>

              <div className="mb-3">
                <input
                  type="date"
                  className="form-control"
                  id="dateField"
                  onChange={(e) => handleChangeDate(e)}
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
    </>
  );
}
