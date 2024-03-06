import { useEffect, useState } from "react"

export interface Todo{
    id:number
    title:string
    isCompleted:boolean
}

export default function Todos(){

    const [todolist,setTodolist]=useState<Todo[]>([])
    const [newTodo,setNewTodo]=useState<Todo>()

    useEffect(()=>{
        fetch("")
        .then()
    },[])
    return(
        <div>
           
        </div>
    )
}