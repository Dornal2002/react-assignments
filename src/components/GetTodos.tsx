import React, { ChangeEvent, useEffect, useState } from "react";
import "./Todo.css";
import { Todo } from "./useFetch";
import useFetch from "./useFetch";

export default function GetTodos() {
  let { todos, loading, error } = useFetch("http://localhost:8000/todos");
  const [title, setTitle] = useState<string>("");
  const [todolist, setTodolist] = useState<Todo[]>([]);
  // const [nextId, setNextId] = useState<number>(0);
  // console.log(todolist);
  // console.log(useFetch)

  useEffect(() => {
    if (todos) {
      setTodolist(todos);
      // setNextId(todos.length + 1);
    }
  }, [todos]);

  const handleAdd = () => {
    if (title) {
      setTodolist([
        ...todolist,
        { id: todolist.length+1, title: title, isCompleted: false },
      ]);
      setTitle("");
      // setNextId(nextId + 1);
    }
  };

  const handleDelete = (deleteTodo: Todo) => {
    const filteredArray = todolist.filter(
      (todo: Todo) => todo.id !== deleteTodo.id
    );
    setTodolist(filteredArray);
  };
  const handleCheckbox = (todo: Todo) => {
    const newArray: Todo[] = todolist.map((t) => t.id === todo.id ?
      {
        ...t,
        isCompleted: !todo.isCompleted
      } : t)
      console.log(newArray)
      setTodolist(newArray)
  }
    return (
      <div className="container">
        <h1 className="header">Todo List</h1>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn-Add" onClick={handleAdd}>
          Add
        </button>
        {loading && <div>Loading... </div>}
        {error && <div>{error}</div>}
        <div style={{ marker: "none" }}>
          {todolist.map((item: Todo, index: number) => (
            <div key={item.id} className="inputfield">
              {index + 1}.{item.title}
              <input
                className="checkbox"
                checked={item.isCompleted}
                onChange={(e) => {
                  handleCheckbox(item);
                }}
                type="checkbox"
              />
              <button className="btn-delete" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
