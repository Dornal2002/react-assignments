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

  const handleSort = (order: string) => {
    if (order == "asc") {
      setTodolist([...todolist].sort((a, b) => a.title.localeCompare(b.title)));
    } else if (order == "desc") {
      setTodolist([...todolist].sort((a, b) => b.title.localeCompare(a.title)));
    }
    // if (order == "asc") {
    //   setTodolist([...todolist].sort((a, b) => a.date.localeCompare(b.date)));
    // } else if (order == "desc") {
    //   setTodolist([...todolist].sort((a, b) => b.date.localeCompare(a.date)));
    // }
  };

  const handleStatus = (status: string) => {
    const todos=setTodolist;
    if (status === "all") return todos;
    if (status === "true")
    return todos(todolist.filter((todo) => todo.isCompleted));
    if (status === "false") return todos(todolist.filter((todo) => !todo.isCompleted));

    setTodolist(todolist)
  };

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
              <button className="dropdown-item" value="name">
                Name
              </button>
              <button className="dropdown-item" value="date">
                Date
              </button>
            </div>
          </div>
          <div>
            <span onClick={() => handleSort("asc")}>
              <ArrowUp />
            </span>
            <span onClick={() => handleSort("desc")}>
              <ArrowDown />
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
              <a
                className="dropdown-item"
                onClick={() => {
                  handleStatus("all");
                }}
              >
                All
              </a>
              <a
                className="dropdown-item"
                onClick={() => {
                  handleStatus("true");
                }}
              >
                Completed
              </a>
              <a
                className="dropdown-item"
                onClick={() => {
                  handleStatus("false");
                }}
              >
                Incomplete
              </a>
            </div>
          </div>
        </div>
        {/* {todolist.map((item: Todo, index: number) => (
          <div
            key={item.id}
            className="card text-wrap card-content justify-content-center text-center w-50 mt-3 mb-3 d-flex flex-row"
          >
            <h5 className="card-body card-text text-wrap d-inline-flex switch">
              <div onClick={() => navigate("/viewtodos/" + item.id)}>
                {index + 1}.{item.title}
              </div>

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
            </h5>
          </div>
        ))} */}
        <div className="todos d-flex justify-content-left ms-0">
          <table className="table ">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {todolist
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
