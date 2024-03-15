import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Todos.css";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import useFetch from "./useFetch";

export interface Todo {
  id: number;
  title: string;
  date: string;
  isCompleted: boolean;
}

export default function Todos() {
  let { todos, loading, error,refetchData } = useFetch("http://localhost:8000/todos");
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const navigate = useNavigate();

  useEffect(() => {
    if (todos) {
      setTodolist(todos);
      // setNextId(todos.length + 1);
    }
  }, [todos]);

  const handleCheckbox = (
    todo: Todo,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    fetch(`http://localhost:8000/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isCompleted: e.target.checked,
      }),
    })
      .then((res) => res.json())
      .then(() => {
          refetchData(true)
      });
  };

  const handleDelete = (id: number) => {
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => alert("Deleted Successfully"))
      .then(() =>    refetchData(true));
  };

  const handleStatus = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
   setStatus(e.currentTarget.value)
  };

  const filteredData = todolist.filter((item: Todo) => {
    if (status === 'all') {
      return true;
    }
    return status === 'complete' ? item.isCompleted : !item.isCompleted;
  });
  

  const handleSort = (criteria: string) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const navigateTodo =(url:string,id:number)=>{
    navigate(url+id)
  }

  filteredData.sort((a: Todo, b: Todo) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortBy === "date") {
      return sortOrder === "asc" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });


  const searchFilter = filteredData.filter((item:Todo) => {
    return search.trim() === "" ? true : item.title.toLowerCase().includes(search.toLowerCase());
  });


  if (error){
    alert(error)
  }

  return (
    <>
    {loading?<div>Loading....</div>:
      <div className="todos">
        <div className="d-flex justify-content-left mb-3 mt-3">
          <input
            className="mr-3"
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="dropdown ms-3">
            <button
              className="btn btn-warning dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Sort By
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className={`dropdown-item ${sortBy === "name" ? "active" : ""}`}
                onClick={() => handleSort("name")}
              >
                Name
              </button>
              <button
                className={`dropdown-item ${sortBy === "date" ? "active" : ""}`}
                onClick={() => handleSort("date")}
              >
                Date
              </button>
            </div>
          </div>
          <div>
            {/* <span onClick={() => handleSort("asc")}>
              <ArrowUp />
            </span>
            <span onClick={() => handleSort("desc")}>
              <ArrowDown />
            </span> */}
              <span onClick={() => handleSort(sortBy)}>
              {sortOrder === "asc" ? <ArrowUp /> : <ArrowDown />}
            </span>
          </div>
          <div className="dropdown ms-3">
            <button
              className="btn btn-warning dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Status
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button
                className="dropdown-item"
                value="all"
                onClick={handleStatus}
              >
                All
              </button>
              <button
                className="dropdown-item"
                value="complete"
                onClick={handleStatus}
              >
                Completed
              </button>
              <button
                className="dropdown-item"
                value="incomplete"
                onClick={handleStatus}
              >
                Incomplete
              </button>
            </div>
          </div>
        </div>
        <div className="todos d-flex justify-content-left ms-0">
          <table className="table ">
            <thead>
              <tr>
                <th>Sr.No</th>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {searchFilter
                .map((item: Todo, index: number) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div onClick={() => navigateTodo("/viewtodos/" , item.id)}>
                        {item.title}
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>
                      <input
                        className="check-box"
                        checked={item.isCompleted}
                        onChange={(e) => {
                          handleCheckbox(item, e);
                        }}
                        type="checkbox"
                      />
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>}
    </>
  );
}