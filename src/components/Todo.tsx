import React, { useState } from "react";
import "./Todo.css";

interface Todo {
  id: number;
  title: string;
  checked: boolean;
}

export default function Todo() {

  const [title, setTitle] = useState<string>("");
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  const handleAdd = () => {
    setTodolist([...todolist, { id: nextId, title: title, checked: false }]);
    setTitle("");
    setNextId(nextId + 1);
  };

  const handleDelete = (deleteTodo: Todo) => {
    const filteredArray = todolist.filter(
      (todo: Todo) => todo.id !== deleteTodo.id
    );
    setTodolist(filteredArray);
  };
  const handleCheckbox = (todo: Todo) => {
    todo.checked = !todo.checked;
    setTodolist([...todolist]);
  };
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
      <div style={{ marker: "none" }}>
        {todolist.map((item: Todo, index:number) => (
          <div key={item.id} className="inputfield">
            {index + 1}.{item.title}
            <input
              className="checkbox"
              checked={item.checked}
              onChange={() => {
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
