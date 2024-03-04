const GetTodos=(props:any)=>{
    return(
        <div>
        {
            props.todos.map((data:any)=>(
                <div key={data.id}>
                <h4>{data.todo}</h4>
                </div>
            ))
        }
        </div>
    )

}
export default GetTodos;