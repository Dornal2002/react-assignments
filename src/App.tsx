
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import AddTodos from "./components/AddTodos";
import Error from "./components/Error";
import ViewTodo from "./components/ViewTodo";
import TodoNavbar from "./components/TodoNavbar";
import { QueryClientProvider, QueryClient } from 'react-query';
import Todos from './components/Todos';

const queryClient =new QueryClient()
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>   
      <Router>
        <TodoNavbar />
        <Routes>
          <Route path="/" element={<Todos/>} />
          <Route path="/addtodos" element={<AddTodos />} />
          <Route path="/viewtodos/:id" element={<ViewTodo />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>       
      </QueryClientProvider>
    </div>
  );
}

export default App;