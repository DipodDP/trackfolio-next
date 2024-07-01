import { Metadata } from "next"
import { Portfolio } from "@/components/Portfolio"
import { Structure } from "@/components/Structure"
import Summary from "@/components/Summary"


export const metadata: Metadata = {
    title: "Portfolio",
    description: "A invest portfolio tracker table build using ShadCN and Tanstack Table.",
}

export default async function Home() {

    return (
        <>
            <Structure />
            <Summary />
            <Portfolio />
        </>
    )
}
