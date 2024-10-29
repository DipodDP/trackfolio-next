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
import { selectStructure } from './querySelectFunctions'
import { ILogin, IRegister } from '../models/auth.api.model'
import authService from '@/services/auth.service'
// import { getTestPortfolio, getTestStructure } from '../serverUtils'

const todoId = 1

export const usePostRegister = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: IRegister) => authService.postRegister(request),
    onSuccess: (data) => {
      console.log('Sign-up successful!', data);
      // Invalidate any auth-related queries if necessary
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH]
      })
    },
    onError: (error) => {
      // Handle register failure
      console.error('Register failed!', error);
    }
  })
}

export const usePostLogin = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (request: ILogin) => authService.postLogin(request),
    // select: ({ data }) => selectStructure(structure),
    onSuccess: (data) => {
      console.log('Login successful!', data);
      // Invalidate any auth-related queries if necessary
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH]
      })
    },
    onError: (error) => {
      // Handle login failure
      console.error('Login failed!', error);
    }
  })
}

export const usePostLogout = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => authService.postLogout(),
    onSuccess: (data) => {
      console.log('Logout successful!', data);
      // Invalidate any auth-related queries if necessary
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH]
      })
    },
    onError: (error) => {
      // Handle login failure
      console.error('Logout failed!', error);
    }
  })
}

export const useGetTodos = () => useQuery({
  queryKey: [QUERY_KEYS.TODOS],
  queryFn: () => todoService.getAll(),
  select: ({ data }) => data,
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
