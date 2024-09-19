'use client'

import { useGetTodos } from "@/lib/react-query/queriesAndMutations";

export function Query() {
  const { error, isLoading, data: todos } = useGetTodos()

  return (
    <>
      <div className="text-lg text-yellow-300 text-left">
        {isLoading ? (
          <div>Loading...</div>
        ) : todos?.length ? (
          todos.map(
            todo => (
              <div>
                <b>{todo.id}: </b>{todo.title}
              </div>
            )
          )
        ) : (
          <h2>Data not found</h2>
        )}
      </div>
    </>
  )
}
