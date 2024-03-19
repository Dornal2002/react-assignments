const TodoNavbar=()=> {
  return (
    <nav className="navbar navbar-expand-lg bg-secondary justify-content-center">
      <form className="form-inline text-center">
        <button
          className="btn btn-outline-success btn-hover text-light bg-success my-2 text-center"
          type="submit"
          style={{ marginRight: "10px" }}
        >
          <a className="nav-link" href="/addtodos">
            AddTodos
          </a>
        </button>
        <button
          className="btn btn-outline-success btn-hover active text-light bg-info my-2 text-center "
          type="submit"
        >
          <a className="nav-link" href="/">
            ViewTodos
          </a>
        </button>
      </form>
    </nav>
  );
}
export default TodoNavbar;
