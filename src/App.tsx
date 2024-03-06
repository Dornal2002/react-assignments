import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Todos from './components/Todos';
import Blogs from './components/Blogs';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Todos/>}/>
          <Route path='/blogs' element={<Blogs/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
