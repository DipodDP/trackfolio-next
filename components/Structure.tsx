'use client'
import { z } from "zod"
import { StructureTable } from "@/app/(root)/portfolio/structure-table"
import { columnsStructure } from "@/app/(root)/portfolio/columns/structure-columns"

import { riskPartSchema } from "@/app/(root)/portfolio/data/schema"
import { useGetStructure } from "@/lib/react-query/queriesAndMutations"
import Loader from "./shared/Loader"


export function Structure() {
    const { error, isLoading, data: dataStructure } = useGetStructure()

    let structure
    if (dataStructure) {
        structure = z.array(riskPartSchema).parse(dataStructure)
        console.log('Structure: ', structure)
    }

    return (
        <>
            {isLoading ? (
                <div className='flex-center gap-2'>
                    <div className="text-gray-400 min-w-max">Loading portfolio structure...</div>
                    <Loader />
                </div>
            ) : structure ? (
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
                        </div>
                        <StructureTable data={structure} columns={columnsStructure} />
                    </div>

                    {/* <section className="mt-9 flex flex-d gap-10"> */}
                    {/*   Section */}
                    {/* </section> */}
                </div>

            ) : (
                <h2 className="text-gray-400">Portfolio stucture not found</h2>
            )}
        </>
    )
}
