import React, { useEffect, useState } from "react";
import { useQuery ,useMutation } from "react-query";
import axios from "axios";
import { Todo } from "../types/Todo";

// page=${page}&_limit=${limit}&title_like=${search}&_sort=${sortBy}&_order=${sortOrder}&isCompleted_like=${status}

interface GetTodoRequest{
_page:number
_limit:number
} 


const url = "http://localhost:8000/todos"
export const useGetTodos = (params:GetTodoRequest) => {
  console.log(params)
  const {data, error, isLoading ,refetch} = useQuery({
    queryKey: ['todos',params],
    queryFn: async() => await axios.get(url,{params}).then(res => res),
    keepPreviousData:true
})

return {todosList:data,isTodoListLoading:isLoading, refetchTodos:refetch}
}

export const usePatchTodo = () =>{
  const { refetchTodos } = useGetTodos({ _page: 1, _limit: 5 })
  const { mutate: HandleCheckbox  } = useMutation(
    (todo: Todo) =>
      axios.patch(`${url}/${todo.id}`, {
        isCompleted: !todo.isCompleted,
      }),
    {
      onSuccess: () => {
         refetchTodos()
      },
    }
  );
  return {HandleCheckbox}
}

export const useDeleteTodo = () =>{
  const { refetchTodos } = useGetTodos({ _page: 1, _limit: 5 })
  const { mutate: handleDelete } = useMutation(
    (id: string) => axios.delete(`${url}/${id}`),
    {
      onSuccess: () => {
        refetchTodos()
      },
    }
  );
  return {handleDelete}
}

