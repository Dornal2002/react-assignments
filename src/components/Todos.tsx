import React, { useEffect, useReducer } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../stylesheets/Todos.css"
import { useNavigate } from "react-router-dom";
import { ArrowUp, ArrowDown } from "lucide-react";
import useFetch from "../hooks/useFetch";
import { Todo } from "../types/Todo";

// Define action types
const SET_TODOLIST = 'SET_TODOLIST';
const SET_SEARCH = 'SET_SEARCH';
const SET_STATUS = 'SET_STATUS';
const SET_SORT_BY = 'SET_SORT_BY';
const SET_SORT_ORDER = 'SET_SORT_ORDER';

// Reducer function
const reducer = (state:any, action:any) => {
  switch(action.type) {
    case SET_TODOLIST:
      return {
        ...state,
        todolist: action.payload
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.payload
      };
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: action.payload
      };
    case SET_SORT_ORDER:
      return {
        ...state,
        sortOrder: action.payload
      };
    default:
      return state;
  }
};

export default function Todos() {
  let { data, isLoading, error, refetch } = useFetch("http://localhost:8000/todos");

  // Initial state
  const initialState = {
    todolist: [],
    search: '',
    status: 'all',
    sortBy: 'name',
    sortOrder: 'asc'
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { todolist, search, status, sortBy, sortOrder } = state;

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch({ type: SET_TODOLIST, payload: data.data });
    }
  }, [data]);

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
          refetch()
      });
  };

  const handleDelete = (id: string) => {
    fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => alert("Deleted Successfully"))
      .then(() =>    refetch());
  };

  const handleStatus = (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
   dispatch({ type: SET_STATUS, payload: e.currentTarget.value });
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
      dispatch({ type: SET_SORT_ORDER, payload: sortOrder === "asc" ? "desc" : "asc" });
    } else {
      dispatch({ type: SET_SORT_BY, payload: criteria });
      dispatch({ type: SET_SORT_ORDER, payload: "asc" });
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

  if(error){
    alert(error);
  }

  return (
    <>
    {isLoading ? <div>Loading..</div>:
      <div className="todos">
        <div className="d-flex justify-content-left mb-3 mt-3">
          <input
            className="mr-3"
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => dispatch({ type: SET_SEARCH, payload: e.target.value })}
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
                <th>Description</th>
                <th>Assignee</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .filter((item:any) => {
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
                    <td>{item.description}</td>
                    <td>{item.assignee}</td>
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
