import React, { useState } from "react"
import "./Todo.css"
export default function Todo() {
    const [todo, setTodo] = useState<string>("")
    const [array, setArray] = useState<{ todo: string; checked: boolean }[]>([])

    const handleAdd = () => {
        setArray([...array, { todo, checked: false }])
        setTodo('')
    }
    const handleDelete = (index: number) => {
        const updatedTodos = array.filter((_: object, i: number) => i !== index);
        setArray(updatedTodos);
    }
    const handleCheckbox = (index: number) => {
        const updatedTodos = [...array];
        updatedTodos[index].checked = !updatedTodos[index].checked;
        setArray(updatedTodos);
    }
    return (
        <div className="container">
            <h1 className="header">Todo List</h1>
            <input type="text" value={todo} onChange={(e) => setTodo(e.target.value)} />
            <button className="btn-Add" onClick={handleAdd}>Add</button>
            <div style={{ marker: "none" }}>
                {array.map((item: any, index: number) => <div key={index} className="inputfield">
                    {index + 1}.
                    {item.todo}
                    <input type="checkbox" className="check-box" onChange={() => handleCheckbox(index)} />
                    <button className="btn-delete" onClick={() => handleDelete(index)}>Delete</button>
                </div>)}
            </div>
        </div>
    )
}