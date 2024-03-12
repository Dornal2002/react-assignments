import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function AddTodos() {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    if (title) {
      fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: { "content-type": "application-json" },
        body: JSON.stringify({
          // 'id':,
          title: title,
          isCompleted: false,
        }),
      })
        .then(() => navigate("/"))
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
      <button className="btn btn-danger" onClick={handleAdd}>
        Add
      </button>
    </div>
  );
}
