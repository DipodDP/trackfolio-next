"use client";
import { z } from "zod";
import { columnsPortfolio } from "@/app/(root)/portfolio/columns/portfolio-columns";
import { DataTable } from "@/app/(root)/portfolio/portfolio-table";

import { UserNav } from "@/components/data-table/user-nav";
import { portfolioSchema } from "@/app/(root)/portfolio/data/schema";
import { useGetPortfolio } from "@/lib/react-query/queriesAndMutations";
// import { useEffect, useRef } from "react"
import { usePortfolioContext } from "@/context/PortfolioContext";
import Loader from "./shared/Loader";

export function Portfolio() {
  const { error, isLoading, data: dataPositions } = useGetPortfolio();
  const { portfolio, setPortfolio } = usePortfolioContext();

  let positions: Array<any> | undefined;
  if (dataPositions?.data) {
    const portfolioPositions = dataPositions.data.positions.filter(
      (item) => item.instrument_type !== "currency",
    );
    const portfolioPlanPositions = dataPositions.data.plan_positions.filter(
      (item) => item.instrument_type !== "currency",
    );

    const combinedPositions = portfolioPositions.reduce((acc, position) => {
      const positionData = portfolioPlanPositions.find(
        (planPositions) => planPositions.ticker === position.ticker,
      );
      const allPositionData = { ...position, ...positionData };
      acc.push(allPositionData);

      return acc;
    }, [] as Array<Object>);

    positions = z.array(portfolioSchema).parse(combinedPositions);

    setPortfolio(dataPositions.data);
    console.log("Portfolio: ", portfolio, " is fetched");
  }

  // useEffect(() => {
  //   const element = document.getElementById("portfolio");
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, [positions]);
  // const myRef = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (positions && myRef.current) {
  //     myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  //   }
  // }, [myRef, positions]);

  return (
    <>
      {isLoading ? (
        <div className="flex-center gap-2">
          <div className="text-gray-400 min-w-max">Loading portfolio...</div>
          <Loader />
        </div>
      ) : positions ? (
        <div
          id="portfolio"
          className="portfolio-container overflow-hidden rounded-[0.5rem] border bg-background shadow"
        >
          <h1 className="head-text text-left">Portfolio</h1>
          <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex text-dark-3 bg-light-4">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-format tracking-tight">
                  Your assets
                </h2>
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
        </div>
      ) : (
        <h2 className="text-gray-400">Portfolio not found</h2>
      )}
    </>
  );
}
