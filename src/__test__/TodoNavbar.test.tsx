import { render, screen,fireEvent } from "@testing-library/react";
import TodoNavbar from "../components/TodoNavbar";

test("Display Add Todos on headers",()=>{
    render(<TodoNavbar/>)
    let element=screen.getByText("AddTodos")
    expect(element).toBeInTheDocument()
})

test("Display ViewTodos on headers",()=>{
    render(<TodoNavbar/>)
    let element=screen.getByText("ViewTodos")
    expect(element).toBeInTheDocument()
})
