'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  // const [queryClient] = React.useState(
  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           staleTime: 5 * 1000,
  //         },
  //       },
  //     }),
  // )
  return (
    <QueryClientProvider client={queryClient}>
      {/* <ReactQueryStreamedHydration> */}
      {children}
      {/* </ReactQueryStreamedHydration> */}
      {/* {<ReactQueryDevtools initialIsOpen={false} />} */}
    </QueryClientProvider>
  )
}
