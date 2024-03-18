import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import AddTodos from '../components/AddTodos';

test('AddTodos component renders correctly', () => {
  render(
    <Router>
      <AddTodos/>
    </Router>
  );
  
  expect(screen.getByPlaceholderText('Enter Todos')).toBeInTheDocument();
  expect(screen.getByTestId('todo-input')).toBeInTheDocument();
  expect(screen.getByTestId('date-input')).toBeInTheDocument();
  expect(screen.getByText('Add')).toBeInTheDocument();
});


test('Adding a todo with valid input', async () => {
  render(
    <Router>
      <AddTodos />
    </Router>
  );
  
  const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  const todoInput = screen.getByPlaceholderText('Enter Todos');
  // const input= screen.getAllByRole( "textbox" )
  // console.log(input)
  // expect(input).toBeInTheDocument()
  const dateInput = screen.getByTestId('date-input');
  const addButton = screen.getByText('Add');

  fireEvent.change(todoInput, { target: { value: 'Test Todo' } });
  fireEvent.change(dateInput, { target: { value: '2024-03-16' } });
  fireEvent.click(addButton);

  await waitFor(() =>
    expect(screen.getByText('Data Added successfully')).toBeInTheDocument()
  );

  expect(mockAlert).toHaveBeenCalledWith('Data Added successfully'); 
  });

test('Adding a todo with empty input', () => {
  render(
    <Router> 
      <AddTodos/>
    </Router>
  );
  
  const addButton = screen.getByText('Add');
  
  fireEvent.click(addButton);
    
  expect(screen.getByText('Todo Cannot be Empty')).toBeInTheDocument();
});
