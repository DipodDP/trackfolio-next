import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
// import Image from "next/image"
import { z } from "zod"
// import { Payment, columns } from "./portfolio/columns"
import { columns, columnsPortfolio } from "./portfolio/columns"
import { DataTable } from "./portfolio/data-table"

// import { columns } from "./components/columns"
// import { DataTable } from "./components/data-table"
import { UserNav } from "@/components/data-table/user-nav"
import { structureSchema, taskSchema, shareSchema, proportionSchema } from "@/app/(root)/portfolio/data/schema"
// import { shareSchema } from "./portfolio/data/seed"
import { StructureTable } from "./portfolio/structure-table"
import { columnsStructure } from "./portfolio/columns/structure-columns"


export const metadata: Metadata = {
  title: "Portfolio",
  description: "A invest portfolio tracker table build using ShadCN and Tanstack Table.",
}

// Simulate a API response for positions in portfolio.
async function getPositions() {

  const dataPositions = await fs.readFile(
    path.join(process.cwd(), "/app/(root)/portfolio/data/positions.json")
  )
  const positions = JSON.parse(dataPositions.toString())

  // console.log('Positions: ', positions)

  return z.array(shareSchema).parse(positions).filter(item => item.instrument_type !== 'currency')
}

// Simulate a database read for tasks.
async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/app/(root)/portfolio/data/tasks.json")
  )

  const tasks = JSON.parse(data.toString())

  // console.log('Tasks: ', tasks)
  return z.array(taskSchema).parse(tasks)
}

// Simulate a API response for structure of the portfolio.
async function getStructure() {

  const dataStructure = await fs.readFile(
    path.join(process.cwd(), "/app/(root)/portfolio/data/structure.json")
  )
  const structure = JSON.parse(dataStructure.toString())

  // console.log('Structure: ', structure)
  let proportions = [
    {
      type: "Low risk part",
      sum: structure.low_risk_part.low_risk_total_amount,
      plan_sum: structure.low_risk_part.low_risk_total_amount,
      proportion: structure.low_risk_part.low_risk_total_proportion,
      plan_proportion: structure.low_risk_part.low_risk_total_proportion,
      format: true
    },
    {
      type: "Gov bonds",
      sum: structure.low_risk_part.gov_bonds_amount,
      plan_sum: structure.low_risk_part.gov_bonds_amount,
      proportion: structure.low_risk_part.gov_bonds_proportion,
      plan_proportion: structure.low_risk_part.gov_bonds_proportion,
      format: false
    },
    {
      type: "Corp bonds",
      sum: structure.low_risk_part.corp_bonds_amount,
      plan_sum: structure.low_risk_part.corp_bonds_amount,
      proportion: structure.low_risk_part.corp_bonds_proportion,
      plan_proportion: structure.low_risk_part.corp_bonds_proportion,
      format: false
    },
    {
      type: "High risk part",
      sum: structure.high_risk_part.high_risk_total_amount,
      plan_sum: structure.high_risk_part.high_risk_total_amount,
      proportion: structure.high_risk_part.high_risk_total_proportion,
      plan_proportion: structure.high_risk_part.high_risk_total_proportion,
      format: true
    },
    {
      type: "ETF",
      sum: structure.high_risk_part.etf_amount,
      plan_sum: structure.high_risk_part.etf_amount,
      proportion: structure.high_risk_part.etf_proportion,
      plan_proportion: structure.high_risk_part.etf_proportion,
      format: false
    },
    {
      type: "Shares",
      sum: structure.high_risk_part.shares_amount,
      plan_sum: structure.high_risk_part.shares_amount,
      proportion: structure.high_risk_part.shares_proportion,
      plan_proportion: structure.high_risk_part.shares_proportion,
      format: false
    },
  ]
  proportions = proportions.map(item => {
  return {
    ...item,
    disbalance: item.proportion !== null ? parseFloat(item.plan_proportion) - parseFloat(item.proportion) : null
  };
});

  console.log('Structure: ', proportions)
  console.log('Z Array', z.array(proportionSchema).parse(proportions))
  return z.array(proportionSchema).parse(proportions)
}
// async function getData(): Promise<Payment[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: "728ed52f",
//       amount: 100,
//       status: "pending",
//       email: "m@example.com",
//     },
//     // ...
//   ]
// }

export default async function Home() {
  // const data = await getData()
  const tasks = await getTasks()
  const positions = await getPositions()
  const structure = await getStructure()

  return (
    <>
      <div className="portfolio-container">
        <h1 className="head-text text-left">Structure</h1>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex text-dark-3 bg-light-4">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-format tracking-tight">Porfolio structure</h2>
              <p className="text-muted-foreground">
                Here&apos;s your portfolio structure
              </p>
            </div>
            {/* <div className="flex items-center space-x-2"> */}
            {/*   <UserNav /> */}
            {/* </div> */}
          </div>
          <StructureTable data={structure} columns={columnsStructure} />
        </div>

        <section className="mt-9 flex flex-d gap-10">
          Section          
        </section>
      </div>

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
          {/* <DataTable data={positions} columns={columns} /> */}
          <DataTable data={positions} columns={columnsPortfolio} />
        </div>

        <section className="mt-9 flex flex-d gap-10">
          Section          
        </section>
      </div>

      // example table
      <div className="portfolio-container overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <h1 className="head-text text-left">Home</h1>
        {/* <div className="container mx-auto py-10"> */}
        {/*   <DataTable columns={columns} data={data} /> */}
        {/* </div> */}
        {/* <div className="md:hidden"> */}
        {/*   <Image */}
        {/*     src="/examples/tasks-light.png" */}
        {/*     width={1280} */}
        {/*     height={998} */}
        {/*     alt="Playground" */}
        {/*     className="block dark:hidden" */}
        {/*   /> */}
        {/*   <Image */}
        {/*     src="/examples/tasks-dark.png" */}
        {/*     width={1280} */}
        {/*     height={998} */}
        {/*     alt="Playground" */}
        {/*     className="hidden dark:block" */}
        {/*   /> */}
        {/* </div> */}
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex text-dark-3 bg-light-4">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-format tracking-tight">Welcome back!</h2>
              <p className="text-muted-foreground">
                Here&apos;s a list of your tasks for this month!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <UserNav />
            </div>
          </div>
          <DataTable data={tasks} columns={columns} />
        </div>

        <section className="mt-9 flex flex-d gap-10">
          Section          
        </section>
      </div>
    </>
  )
}
