import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Todos from './components/Todos';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Todos/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
