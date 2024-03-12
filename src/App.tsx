import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CreateTodo from './components/CreateTodo';
import Todos from './components/Todos';
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
          <Route path="/createtodos" element={<CreateTodo />} />
          <Route path="/viewtodos/:id" element={<ViewTodo />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
