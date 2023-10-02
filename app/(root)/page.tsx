import { Payment, columns } from "./portfolio/columns"
import { DataTable } from "./portfolio/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}

export default async function Home() {
  const data = await getData()

  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} />
      </div>

      <section className="mt-9 flex flex-d gap-10">
        Section          
      </section>
    </>
  )
}
