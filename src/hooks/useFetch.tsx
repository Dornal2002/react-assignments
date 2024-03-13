import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Todo } from "../types/Todo";

export default function useFetch(url: string) {

  const {data, error, isLoading ,refetch} = useQuery({
    queryKey: ['todos'],
    queryFn: async() => await axios.get<Todo[]>(url)
})

// console.log("Data : ", data?.data);

return { data, error, isLoading ,refetch}

}