export interface Todo {
  id: number;
  todo: string;
}
export interface GetTodosProps {
  todos: Todo[];
}

const GetTodos = (props: GetTodosProps) => {
  const { todos } = props;
  return (
    <div>
      {todos.map((data: any) => (
        <div key={data.id}>
          <h4>{data.todo}</h4>
        </div>
      ))}
    </div>
  );
};
export default GetTodos;
