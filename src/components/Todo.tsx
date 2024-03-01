import React, { useState } from "react"
import "./Todo.css"
export default function Todo() {
  const [todo, setTodo] = useState("")
  const [array, setArray] = useState([] as any)

  const handleAdd = () => {
    setArray([...array, { todo: todo }])
    setTodo('')
  }
  const handleDelete = (index: any) => {
    // const newTodos=[...array]
    // newTodos.splice(1)
    // setArray(newTodos)
    const updatedTodos = array.filter((_: any, i: any) => i !== index);
    setArray(updatedTodos);
  }
  const handleCheckbox = (index: any) => {
    const updatedTodos = [...array];
    updatedTodos[index] = !updatedTodos[index];
    setArray(updatedTodos);
  }
  return (
    <div className="container">
        <h1 className="header">Todo List</h1>
        <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
        <button className="btn-Add" onClick={handleAdd}>Add</button>
        <div style={{ marker: "none" }}>
          {array.map((item: any, index: number) => <div key={index} className="inputfield">
            {index+1}.
            <input type="checkbox" onChange={(index) => handleCheckbox(index)} style={{ height: "25px", width: "25px", marginRight: "10px" }} />
            {item.todo}
            <button className="btn-delete" onClick={() => handleDelete(index)}>Delete</button>
          </div>)}
        </div>
    </div>
  )
}