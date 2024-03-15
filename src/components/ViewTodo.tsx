import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ViewTodo() {
  const [title, setTitle] = useState<string>("");
  const [date,setDate]=useState<string>("");
  const [description,setDescription]=useState<string>("")
  const [assignee,setAssignee]=useState<string>("")

  const params = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8000/todos/${params.id}`).then(
        (resp) => resp.json()
      );
      setTitle(res.title);
      setDate(res.date);
      setAssignee(res.assignee);
      setDescription(res.description);
    };
    fetchData();
  }, [params.id]);
  return (
    <div>
      <label>Title : </label>
      <p>{title}</p>
      <label>Date: </label>
      <p>{date}</p>
      <label>Description : </label>
      <p>{description}</p>
      <label>Assignee: </label>
      <p>{assignee}</p>
    </div>
  );
}
