'use client'
import { z } from "zod"
import { columnsPortfolio } from "@/app/(root)/portfolio/columns/portfolio-columns"
import { DataTable } from "@/app/(root)/portfolio/portfolio-table"

import { UserNav } from "@/components/data-table/user-nav"
import { portfolioSchema } from "@/app/(root)/portfolio/data/schema"
import { useGetPortfolio } from "@/lib/react-query/queriesAndMutations"


export function Portfolio() {
  const { error, isLoading, data: dataPositions } = useGetPortfolio()
  let positions;
  if (dataPositions?.data) {
    const portfolioPositions = dataPositions.data.positions
      .filter(item => item.instrument_type !== 'currency')
    const portfolioPlanPositions = dataPositions.data.plan_positions
      .filter(item => item.instrument_type !== 'currency')

    const combinedPositions = portfolioPositions.reduce((acc, position) => {
      const positionData = portfolioPlanPositions.find(planPositions => planPositions.ticker === position.ticker)
      const allPositionData = {...position, ...positionData}
      acc.push(allPositionData)

      return acc
    }, [] as Array<Object>)
    positions = z.array(portfolioSchema).parse(combinedPositions)
    console.log('Positions: ', positions)
  }

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : positions ? (
        <div className="portfolio-container overflow-hidden rounded-[0.5rem] border bg-background shadow">
          <h1 className="head-text text-left">Portfolio</h1>
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex text-dark-3 bg-light-4">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-format tracking-tight">Your assets</h2>
                <p className="text-muted-foreground">
                  Here&apos;s assets in your portfolio
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <UserNav />
              </div>
            </div>
            <DataTable data={positions} columns={columnsPortfolio} />
          </div>

          <section className="mt-9 flex flex-d gap-10">
            Section
          </section>
        </div>

      ) : (
        <h2>Portfolio not found</h2>
      )}
    </>
  )
}
