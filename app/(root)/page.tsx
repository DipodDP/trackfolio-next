import { Metadata } from "next"
import { Portfolio } from "@/components/shared/Portfolio"
import { Structure } from "@/components/shared/Structure"


export const metadata: Metadata = {
  title: "Portfolio",
  description: "A invest portfolio tracker table build using ShadCN and Tanstack Table.",
}

export default async function Home() {

  return (
    <>
      <Structure />
      <Portfolio />
    </>
  )
}
