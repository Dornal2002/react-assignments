import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/Todos.css";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import { useDeleteTodo, useGetTodos, usePatchTodo } from "../hooks/todo.hook";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Todo } from "../types/Todo";

export default function Todos() {
  // let { data, isLoading, error,refetch } = useFetch("http://localhost:8000/todos");
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [totalpages, setTotalPages] = useState(2);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const { todosList, isTodoListLoading, refetchTodos } = useGetTodos({ _page: page, _limit: limit })
  const {HandleCheckbox} = usePatchTodo()
  const {handleDelete} = useDeleteTodo()
  // const { data, error, isLoading, refetch } = useQuery({
  //   queryKey: ["todos", page, limit, search, sortBy, sortOrder],
  //   queryFn: async () => {
  //     const res = await axios.get(
  //       // `http://localhost:8000/todos?_page=${page}&_per_page=${limit}&`
  //       `http://localhost:8000/todos?_page=${page}&_limit=${limit}&title_like=${search}&_sort=${sortBy}&_order=${sortOrder}&isCompleted_like=${status}`
  //     );
  //     console.log("HEARDER ONSODE",res.headers['x-total-count'])
  //     setTotalPages(Math.ceil(res.headers['x-total-count']/limit))
  //     if(!limit) setTotalPages(1)
  //     return res.data;
  //   },
  // });

  const navigate = useNavigate();

  useEffect(() => {
    if (todosList) {
      setTodolist(todosList.data);
      console.log("HEADER",todosList.headers['x-total-count'])
      setTotalPages(Math.ceil(todosList.headers['x-total-count']/limit))

    }
  }, [todosList]);



  const handlePageChange = (page: number) => {
    setPage(page)
    // refetchTodos()
  }

  const handleStatus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setStatus(e.currentTarget.value);
  };

  const filteredData = todolist?.filter((item: Todo) => {
    if (status === "all") {
      return true;
    } else if (status === "complete") {
      return item.isCompleted === true;
    } else if (status === "incomplete") {
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

  filteredData?.sort((a: Todo, b: Todo) => {
    if (sortBy === "name") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <>
      {isTodoListLoading ? (
        <h3>Loading...</h3>
      ) : (
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
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <button
                  className={`dropdown-item ${sortBy === "name" ? "active" : ""
                    }`}
                  onClick={() => setSortBy("name")}
                >
                  Name
                </button>
                <button
                  className={`dropdown-item ${sortBy === "date" ? "active" : ""
                    }`}
                  onClick={() => setSortBy("date")}
                >
                  Date
                </button>
              </div>
            </div>
            <div>
              <span onClick={() => setSortOrder("asc")}>
                <ArrowUp />
              </span>
              <span onClick={() => setSortOrder("desc")}>
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
              <div
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
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
                          onChange={() => HandleCheckbox(item)}
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
          <div>
            <button
              className="btn btn-primary"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            {page}/{totalpages}
            <button
              className="btn btn-primary ms-2"
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalpages}
            >
              Next
            </button>
            <br />
            <input
              className="mt-3 w-20"
              type="number"
              placeholder="set limit"
              value={limit}
              onChange={(e) => {
                setLimit(parseInt(e.target.value));
                setPage(1);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
}


