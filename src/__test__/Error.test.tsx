import { render, screen,fireEvent } from "@testing-library/react";
import Error from "../components/Error";

test("Display Error Page",()=>{
    render(<Error/>)
    let element=screen.getByText("Page Not Found")
    expect(element).toBeInTheDocument()
})


