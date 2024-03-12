import React, { useEffect, useState } from "react";

export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export default function useFetch(url: string) {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  // const [trigger,setTrigger]=useState<number>(0);

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
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // const refetch=()=>setTrigger(trigger+1)

  // return (
  //   <div>
  //     <h1>TodoList</h1>
  //     {error && <div>{error}</div>}
  //     {loading && <div>Loading... </div>}
  //     {todos && <GetTodos todos={todos} />}
  //   </div>
  // );
  return { todos, loading, error };
}
