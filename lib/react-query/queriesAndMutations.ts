import {
  useQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import todoService from '@/services/todo.service'
import ordersService from '@/services/orders.service'
import { IOrder } from '../models/order.api.model'
import { QUERY_KEYS } from './queryKeys'
import portfolioService from '@/services/portfolio.service'
import { getTestPortfolio, getTestStructure } from '../serverUtils'
import { selectStructure } from './querySelectFunctions'

const todoId = 1
// const orderId = 1

export const useGetTodos = () => useQuery({
  queryKey: [QUERY_KEYS.TODOS],
  queryFn: () => todoService.getAll(),
  select: ({ data }) => data,

  // queryKey: ['todos', todoId],
  // queryFn: () => fetch(
  //   'https://jsonplaceholder.typicode.com/todos/1'
  // )
  //   .then(response => response.json())
  //   .then(json => console.log(json))
  // select: async response => await response.json()
})

// this query executes only if there are todoId because of 'enabled' parameter
export const useGetTodo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TODOS, todoId],
    queryFn: () => todoService.getById(todoId.toString()),
    select: ({ data }) => data,
    enabled: !!todoId
  })
}

export const useGetStructure = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.STRUCTURE],
    queryFn: () => portfolioService.getStructure(),
    // queryFn: () => getTestStructure(),
    select: ({ data: structure }) => selectStructure(structure)
  })
}

export const useGetPortfolio = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PORTFOLIO],
    queryFn: () => portfolioService.getPortfolio()
    // queryFn: () => getTestPortfolio()
  })
}

export const usePostOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (order: IOrder) => ordersService.postOrder(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PORTFOLIO]
      })
    }
  })
}
