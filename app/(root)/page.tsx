import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
// import { Payment, columns } from "./portfolio/columns"
import { columns, columnsPortfolio } from "./portfolio/columns"
import { DataTable } from "./portfolio/data-table"

// import { columns } from "./components/columns"
// import { DataTable } from "./components/data-table"
import { UserNav } from "@/components/data-table/user-nav"
import { taskSchema } from "@/app/(root)/portfolio/data/schema"
import { shareSchema } from "./portfolio/data/seed"


export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

// Simulate a API response for positions in portfolio.
async function getPositions() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/app/(root)/portfolio/data/shares.json")
  )

  const positions = JSON.parse(data.toString())

  console.log('Positions: ', positions)
  return z.array(shareSchema).parse(positions)
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

  return (
    <>
      <div className="portfolio-container overflow-hidden rounded-[0.5rem] border bg-background shadow">
        <h1 className="head-text text-left">Portfolio</h1>
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex text-dark-3 bg-light-4">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Your assets</h2>
              <p className="text-muted-foreground">
                Here&apos;s your portfolio structure
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
              <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
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
