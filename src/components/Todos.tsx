import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./Todos.css";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";

export interface Todo {
  id: number;
  title: string;
  date: string;
  isCompleted: boolean;
}

export default function Todos() {
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [trigger, setTrigger] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((resp) => resp.json())
      .then((data) => setTodolist(data));
  }, [trigger]);

  const handleCheckbox = (
    todo: Todo,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(e.target.checked);
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
        setTrigger(trigger + 1);
      });
  };

  const handleDelete = (id: number) => {
    console.log(id);
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => alert("Deleted Successfully"))
      .then(() => setTrigger(trigger + 1));
  };

  const handleStatus = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
   setStatus(e.currentTarget.value)
  };

  const filteredData = todolist.filter((item: Todo) => {
    if (status === 'all') {
      return true;
    } else if (status === 'complete') {
      return item.isCompleted === true;
    } else if (status === 'incomplete') {
      return item.isCompleted === false;
    }
    return false;
  });

  const handleSort = (criteria: string) => {
    if (criteria === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  filteredData.sort((a: Todo, b: Todo) => {
    if (sortBy === "name") {
      return sortOrder === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
    } else if (sortBy === "date") {
      return sortOrder === "asc" ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <>
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
              {filteredData
                .filter((item) => {
                  return search.toLocaleUpperCase() === ""
                    ? item
                    : item.title.toLocaleLowerCase().includes(search);
                })
                .map((item: Todo, index: number) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div onClick={() => navigate("/viewtodos/" + item.id)}>
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
      </div>
    </>
  );
}
