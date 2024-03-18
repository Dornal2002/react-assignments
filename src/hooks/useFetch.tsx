import React, { useEffect, useState } from "react";
import { Todo } from "../types/Todo";

export default function useFetch(url: string) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const [refetch,setRefetch] = useState<boolean>(false)
  
  const refetchData = (value:boolean) =>{
    setRefetch(value)
  }

  useEffect(() => {
    fetch(url)
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
        setRefetch(false)
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [refetch]);

  // const refetch=()=>setTrigger(trigger+1)

  // return (
  //   <div>
  //     <h1>TodoList</h1>
  //     {error && <div>{error}</div>}
  //     {loading && <div>Loading... </div>}
  //     {todos && <GetTodos todos={todos} />}
  //   </div>
  // );
  return { todos, loading, error,refetchData };
}