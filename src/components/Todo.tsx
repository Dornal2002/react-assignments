import React, { useState } from "react"
import "./Todo.css"


export default function Todo() {
    interface ITodo {
        id:number;
        title:string;
        checked:boolean
    }
    const [title, setTitle] = useState<string>("")
    const [array, setArray] = useState<ITodo[]>([])
    const [nextId,setNextId] = useState<number>(1)

    const handleAdd = () => {
        setArray([...array, { id :nextId,title:title, checked: false }])
        setTitle('')
        setNextId(nextId+1)
    }

    const handleDelete = (todo: ITodo) => {
        array.splice(array.indexOf(todo), 1);
        setArray([...array]);
      };
    const handleCheckbox = (todo:ITodo) => {
        todo.checked = !todo.checked;
        setArray([...array]);
    }
    return (
        <div className="container">
            <h1 className="header">Todo List</h1>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className="btn-Add" onClick={handleAdd}>Add</button>
            <div style={{ marker: "none" }}>
                {array.map((item: ITodo,idx) => <div key={item.id} className="inputfield">
                    {idx+1}.
                    {item.title}
                    <input className="checkbox" checked={item.checked} onChange={() => {
                handleCheckbox(item); }}
                type="checkbox" />
                    <button className="btn-delete" onClick={() => handleDelete(item)}>Delete</button>
                </div>)}
            </div>
        </div>
    )
}