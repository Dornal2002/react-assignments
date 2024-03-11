import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Todos from './components/Todos';
import AddTodos from "./components/AddTodos";
import Error from "./components/Error";
import ViewTodo from "./components/ViewTodo";
import TodoNavbar from "./components/TodoNavbar";

function App() {
  return (
    <div className="App">
      <Router>
        <TodoNavbar />
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/addtodos" element={<AddTodos />} />
          <Route path="/viewtodos/:id" element={<ViewTodo />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
