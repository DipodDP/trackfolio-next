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
    select: ({ data: structure }) => {
      let portfolioParts = [
        {
          type: "Low risk part",
          sum: structure.current_structure.low_risk_part.low_risk_total_amount,
          plan_sum: structure.plan_structure.low_risk_part.low_risk_total_amount,
          proportion: structure.current_structure.low_risk_part.low_risk_total_proportion,
          plan_proportion: structure.plan_structure.low_risk_part.low_risk_total_proportion,
          format: true
        },
        {
          type: "Gov bonds",
          sum: structure.current_structure.low_risk_part.gov_bonds_amount,
          plan_sum: structure.plan_structure.low_risk_part.gov_bonds_amount,
          proportion: structure.current_structure.low_risk_part.gov_bonds_proportion,
          plan_proportion: structure.plan_structure.low_risk_part.gov_bonds_proportion,
          format: false
        },
        {
          type: "Corp bonds",
          sum: structure.current_structure.low_risk_part.corp_bonds_amount,
          plan_sum: structure.plan_structure.low_risk_part.corp_bonds_amount,
          proportion: structure.current_structure.low_risk_part.corp_bonds_proportion,
          plan_proportion: structure.plan_structure.low_risk_part.corp_bonds_proportion,
          format: false
        },
        {
          type: "High risk part",
          sum: structure.current_structure.high_risk_part.high_risk_total_amount,
          plan_sum: structure.plan_structure.high_risk_part.high_risk_total_amount,
          proportion: structure.current_structure.high_risk_part.high_risk_total_proportion,
          plan_proportion: structure.plan_structure.high_risk_part.high_risk_total_proportion,
          format: true
        },
        {
          type: "ETF",
          sum: structure.current_structure.high_risk_part.etf_amount,
          plan_sum: structure.plan_structure.high_risk_part.etf_amount,
          proportion: structure.current_structure.high_risk_part.etf_proportion,
          plan_proportion: structure.plan_structure.high_risk_part.etf_proportion,
          format: false
        },
        {
          type: "Shares",
          sum: structure.current_structure.high_risk_part.shares_amount,
          plan_sum: structure.plan_structure.high_risk_part.shares_amount,
          proportion: structure.current_structure.high_risk_part.shares_proportion,
          plan_proportion: structure.plan_structure.high_risk_part.shares_proportion,
          format: false
        },
      ]
      portfolioParts = portfolioParts.map(item => {
        return {
          ...item,
          disbalance: item.proportion !== null ? item.plan_proportion - item.proportion : null
        }
      })

      return portfolioParts
    }
  })
}

export const useGetPortfolio = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.PORTFOLIO],
    queryFn: () => portfolioService.getPortfolio()
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
