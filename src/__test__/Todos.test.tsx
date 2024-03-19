import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Todos from '../components/Todos';
import fetchMock from "jest-fetch-mock"
import {Todo} from "../types/Todo"

import { BrowserRouter as Router } from 'react-router-dom';

test("Todos loading and error",()=>{
  render(
    <Router>
      <Todos/>
    </Router>
  );
  expect(screen.getByText('Loading....')).toBeInTheDocument();
})

test('Todos display Search Components', () => {
  render(
    <Router>
      <Todos/>
    </Router>
  );
    
  expect(screen.getByTestId('search-input')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
})


test("Todos display Sort dropdown", ()=>{
  render(
    <Router>
      <Todos/>
    </Router>
  )

expect(screen.getByTestId('sort-input')).toBeInTheDocument();
expect(screen.getByTestId('button-input1')).toBeInTheDocument();
expect(screen.getByTestId('button-input2')).toBeInTheDocument();
expect(screen.getByText('Sort By')).toBeInTheDocument();
expect(screen.getByText('Name')).toBeInTheDocument();
expect(screen.getByText('Date')).toBeInTheDocument();
  
})

test("Todos Display Status Dropdown",()=>{
  render(
    <Router>
      <Todos/>
    </Router>
  );

expect(screen.getByTestId('status-button')).toBeInTheDocument();
expect(screen.getByTestId('status-all-button')).toBeInTheDocument();
expect(screen.getByTestId('status-completed-button')).toBeInTheDocument();
expect(screen.getByTestId('status-incomplete-button')).toBeInTheDocument();

})



describe('MyComponent', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('renders data fetched from API', async () => {
    const mockData = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    render(
      <Router>
        <Todos/>
      </Router>
    );

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).toBeNull();
    });

    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  
  });
});

test("Todos Display Table Content",()=>{
  render(
    <Router>
      <Todos/>
    </Router>
  )

expect(screen.getByText("Sr.No")).toBeInTheDocument();
expect(screen.getByText("Title")).toBeInTheDocument();
expect(screen.getByText('Date')).toBeInTheDocument();
expect(screen.getByText('sAction')).toBeInTheDocument();

})