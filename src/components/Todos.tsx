import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/Todos.css";
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { Todo } from "../types/Todo";

export default function Todos() {
  // let { data, isLoading, error,refetch } = useFetch("http://localhost:8000/todos");
  const [todolist, setTodolist] = useState<Todo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(2);
  const [totalpages, setTotalPages] = useState(2);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["todos", page, limit, search, sortBy, sortOrder],
    queryFn: async () => {
      const res = await axios.get(
        // `http://localhost:8000/todos?_page=${page}&_per_page=${limit}&`
        `http://localhost:8000/todos?_page=${page}&_limit=${limit}&title_like=${search}&_sort=${sortBy}&_order=${sortOrder}&isCompleted_like=${status}`
      );
      setTotalPages(Math.ceil(res.headers['x-total-count']/limit))
      if(!limit) setTotalPages(1)
      return res.data;
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setTodolist(data);
    }
  }, [data]);

  const { mutate: HandleCheckbox } = useMutation(
    (todo: Todo) =>
      axios.patch(`http://localhost:8000/todos/${todo.id}`, {
        isCompleted: !todo.isCompleted,
      }),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: handleDelete } = useMutation(
    (id: string) => axios.delete(`http://localhost:8000/todos/${id}`),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  // const handleStatus = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //   setStatus(e.currentTarget.value);
  // };

  // const filteredData = todolist?.filter((item: Todo) => {
  //   if (status === "all") {
  //     return true;
  //   } else if (status === "complete") {
  //     return item.isCompleted === true;
  //   } else if (status === "incomplete") {
  //     return item.isCompleted === false;
  //   }
  //   return false;
  // });

  // const handleSort = (criteria: string) => {
  //   if (criteria === sortBy) {
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     setSortBy(criteria);
  //     setSortOrder("asc");
  //   }
  // };

  // filteredData?.sort((a: Todo, b: Todo) => {
  //   if (sortBy === "name") {
  //     return sortOrder === "asc"
  //       ? a.title.localeCompare(b.title)
  //       : b.title.localeCompare(a.title);
  //   } else if (sortBy === "date") {
  //     return sortOrder === "asc"
  //       ? new Date(a.date).getTime() - new Date(b.date).getTime()
  //       : new Date(b.date).getTime() - new Date(a.date).getTime();
  //   }
  //   return 0;
  // });

  if (error) {
    alert(error);
  }
  return (
    <>
      {isLoading ? (
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
                  className={`dropdown-item ${
                    sortBy === "name" ? "active" : ""
                  }`}
                  onClick={() => setSortBy("name")}
                >
                  Name
                </button>
                <button
                  className={`dropdown-item ${
                    sortBy === "date" ? "active" : ""
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
                  // onClick={handleStatus}
                  onClick={()=>(setStatus("all"))}
                >
                  All
                </button>
                <button
                  className="dropdown-item"
                  value="complete"
                  // onClick={handleStatus}
                  onClick={()=>(setStatus("complete"))}
                >
                  Completed
                </button>
                <button
                  className="dropdown-item"
                  value="incomplete"
                  // onClick={handleStatus}
                  onClick={()=>(setStatus("incomplete"))}
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
                {todolist
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
              onClick={() => setPage((page) => page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className="btn btn-primary ms-2"
              onClick={() => setPage((page) => page + 1)}
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
