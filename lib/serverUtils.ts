'use server'
import { promises as fs } from "fs"
import path from "path"
import { IPortfolioResponse, IStructureResponse } from "./models/portfolio.api.model"

// Simulate a database read.
export async function getTestStructure() {
    'use server'
    const dataFromFile = await fs.readFile(
        path.join(process.cwd(), "/app/(root)/portfolio/data/structure.json")
    )
    const data = JSON.parse(dataFromFile.toString()) as IStructureResponse

    return { data: data, isLoading: false, error: false }
}

export async function getTestPortfolio() {
    'use server'
    const dataFromFile = await fs.readFile(
        path.join(process.cwd(), "/app/(root)/portfolio/data/portfolio.json")
    )
    const data = JSON.parse(dataFromFile.toString()) as IPortfolioResponse

    return { data: data, isLoading: false, error: false }
}
