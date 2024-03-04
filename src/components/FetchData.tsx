import React, { useEffect, useState } from "react";
import GetTodos from "./GetTodos";

export default function FetchData() {
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((res) => {
        if (!res.ok) {
          throw Error("Error Occured : Could not fetch the data");
        }
        return res.json();
      })
      .then((data) => {
        setTodos(data);
        setLoading(false);
        setError(null);
        // console.log(data)
      })
      .catch((err) => {
        // console.log(err.message);
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>TodoList</h1>
      {error && <div>{error}</div>}
      {loading && <div>Loading... </div>}
      {todos && <GetTodos todos={todos} />}
    </div>
  );
}
