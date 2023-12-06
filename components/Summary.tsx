'use client'
import { Label } from "@/components/ui/label"
import { formatCurrency, quotationToDecimal } from "@/lib/utils"
import Loader from "./shared/Loader"
import { useGetPortfolio } from "@/lib/react-query/queriesAndMutations"
import { useEffect, useRef } from "react"
import { IPortfolioPosition } from "@/lib/models/portfolio.api.model"

const Summary = () => {
  const { error, isLoading, data } = useGetPortfolio()
  let currencyPositions: Array<IPortfolioPosition> | undefined;
  if (data?.data) {
    currencyPositions = data.data.positions
      .filter(item => item.instrument_type === 'currency')

    console.log('Portfolio: ', currencyPositions, ' is fetched')
  }

  const myRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (data?.data && myRef.current) {
      myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [myRef, data?.data]);

  return (
    <div className="portfolio-container mt-8 mb-4">
      {isLoading ? (
        <div className='flex-center gap-2'>
          <div className="text-gray-400 min-w-max">Loading summary...</div>
          <Loader />
        </div>
      ) : (
        <div ref={myRef} className="grid gap-4">
          <div className="space-y-2">
            <h3 className="head-text text-left font-medium leading-none">Portfolio summary</h3>
            <p className="text-sm text-muted-foreground">
              Total amount of cash in the porfolio.
            </p>
          </div>

          <div className="grid gap-2 w-fit">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="totalAdditionalCash" className="text-light-3 small-medium">
                Total additional cash
              </Label>
              <div id="totalAdditionalCash" className="col-span-1 h-6 w-20">
                {data?.data ? formatCurrency(data.data.total_additional_cash) : <Loader />}
              </div>
            </div>

            {data?.data && <ul>
              {currencyPositions?.map(item => (
                <li key={item.name} className="grid grid-cols-2 items-center gap-4">
                  <Label htmlFor={item.name} className="text-light-3 small-medium">
                    Amount of {item.name}
                  </Label>
                  <div id={item.name} className="col-span-1 h-6 w-20">
                    {quotationToDecimal(item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
            }
          </div>
        </div>
      )}
    </div>
  )
}

export default Summary
