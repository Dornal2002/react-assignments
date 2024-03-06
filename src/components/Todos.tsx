import { useEffect, useState } from "react"
import 'bootstrap/dist/css/bootstrap.css';

export interface Todo{
    id:number
    title:string
    isCompleted:boolean
}

export default function Todos(){

    const [todolist,setTodolist]=useState<Todo[]>([])
    // const [newTodo,setNewTodo]=useState<Todo>()

    useEffect(()=>{
        fetch("http://localhost:8000/todos")
        .then(resp=>resp.json())
        .then(data=>(setTodolist(data)))
    },[])
    return(
       <>
        <div className="container">
        {
            todolist.map((item)=><div key={item.id} className="card">
                <h1 className="card-body">{item.title}</h1>
                <input type="checkbox" checked={item.isCompleted} />
            </div>)
        }
           
        </div>
        </>
    )
}