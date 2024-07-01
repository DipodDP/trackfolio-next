'use client'

import { IPortfolioResponse } from '@/lib/models/portfolio.api.model'
import React, { createContext, useContext, useState } from 'react'
/**
 * Creates an initial state object based on the structure of the provided sourceInterface.
 * The initial state object has the same structure as the sourceInterface, but with all properties set to empty strings.
 *
 * @template T - The type of the sourceInterface.
 * @param sourceInterface - The sourceInterface to create an initial state object from.
 * @returns An object with the same structure as the sourceInterface, but with all properties set to empty strings.
 */
// function createInitialState<T>(sourceInterface: T): T {
//  const initialState = {} as T;
//  for (let key in sourceInterface) {
//  if (typeof sourceInterface[key] === 'object' && sourceInterface[key] !== null) {
//    initialState[key] = createInitialState(sourceInterface[key] as any);
//  } else {
//    initialState[key] = '' as T[Extract<keyof T, string>];
//  }
//  }
//  return initialState;
// }
//
// const INITIAL_PORTFOLIO = createInitialState(IPortfolioResponse)

type IPortfolioContextType = {
  portfolio: IPortfolioResponse,
  // isLoading: boolean,
  setPortfolio: React.Dispatch<React.SetStateAction<IPortfolioResponse>>,
  // isFetched: boolean,
  // setIsFetched: React.Dispatch<React.SetStateAction<boolean>>
}

const INITIAL_STATE = {
  portfolio: {} as IPortfolioResponse,
  // isLoading: false,
  // isFetched: false,
  setPortfolio: () => {},
  // setIsFetched: () => {}
}

const PortfolioContext = createContext<IPortfolioContextType>(INITIAL_STATE)

const PortfolioProvider = ({children}: {children: React.ReactNode}) => {
  const [portfolio, setPortfolio] = useState<IPortfolioResponse>({} as IPortfolioResponse)
  // const [isLoading, setIsLoading] = useState(false)

  const value = {
    portfolio,
    setPortfolio,
    isLoading: false,
    // setIsLoading
  }

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  )
}

export default PortfolioProvider

export const usePortfolioContext = () => useContext(PortfolioContext)
