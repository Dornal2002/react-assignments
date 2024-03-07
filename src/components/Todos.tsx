import React, { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';
import './Todos.css';
import { title } from "process";

export interface Todo{
    id:number
    title:string
    isCompleted:boolean
}

export default function Todos(){

    const [todolist,setTodolist]=useState<Todo[]>([])
    const [trigger,setTrigger]=useState(0)
    
    // const [newTodo,setNewTodo]=useState<Todo>()

    useEffect(()=>{
        fetch("http://localhost:8000/todos")
        .then(resp=>resp.json())
        .then(data=>(setTodolist(data)))
    },[trigger])

    const handleDelete =(id :number)=>{
      fetch(`http://localhost:8000/todos/${id}`,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      }).then(()=>alert("Deleted Successfully"))
        .then(()=>setTrigger(trigger+1))

    }

    const handleCheckbox=(todo:Todo,e:React.ChangeEvent<HTMLInputElement>)=>{
      console.log(e.target.checked)
       fetch(`http://localhost:8000/todos/${todo.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isCompleted: e.target.checked
        })
      }).then((res) => res.json()).then(() => {
        setTrigger(trigger + 1)
      })
    }

    return(
       <>
        <div className="">
        {
            todolist.map((item: Todo, index: number) => (
              <div key={item.id} className="card text-center mt-3 mb-3 d-flex flex-row">
                <h5 className="card-body card-text">
                    {index + 1}.{item.title}
                <input
                  className="check-box"
                  checked={item.isCompleted}
                  onChange={(e) => {
                  handleCheckbox(item,e);
                  }}
                  type="checkbox"
                />
                <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </button>
                </h5>
              </div>
            ))
        }
           
        </div>
        </>
    )
}