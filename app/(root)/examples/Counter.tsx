'use client'

import { decrement, increment } from "@/store/slice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

export function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="text-white flex flex-col mb-4">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
        className="leftsidebar_link bg-primary-500 max-w-xs"
      >
        Increment
      </button>
      <span className="px-4 bg-dark-4 py-2 max-w-xs text-center">{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
        className="leftsidebar_link bg-primary-500 max-w-xs "
      >
        Decrement
      </button>
    </div>
  )
}
