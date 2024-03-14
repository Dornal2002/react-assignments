import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

export default function ViewTodo() {
  const [title, setTitle] = useState<string>("");
  const [date,setDate]=useState<string>("");
  const params = useParams();

  const { data, isLoading, error } = useQuery(["todo", params.id], async () => {
    const response = await fetch(`http://localhost:8000/todos/${params.id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  });

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDate(data.date);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    alert(error)
  }

  return (
    <div>
      <label>Title : </label>
      <p>{title}</p>
      <label>Date: </label>
      <p>{date}</p>
    </div>
  );
}
