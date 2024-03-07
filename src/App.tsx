import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Todos from './components/Todos';
import AddTodos from './components/AddTodos';
import Error from './components/Error';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Todos/>}/>
          <Route path='/addtodos' element={<AddTodos/>}/>
          <Route path='*' element={<Error/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
