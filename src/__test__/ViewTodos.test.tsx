import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ViewTodos from '../components/Todos';

import { BrowserRouter as Router } from 'react-router-dom';

test("Display Todos Data",()=>{
  render(
    <Router>
      <ViewTodos/>
    </Router>
  );
  expect(screen.getByText('Title:')).toBeInTheDocument();
  expect(screen.getByText('Date:')).toBeInTheDocument();
})