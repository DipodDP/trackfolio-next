import { IPortfolioResponse, IStructureResponse } from "@/lib/models/portfolio.api.model"
import { API_ENDPOINTS } from "@/lib/react-query/endpoints"
import axios from "axios"

class PortfolioService {

  private URL = process.env.NEXT_PUBLIC_API_BASE_URL

  async getPortfolio() {
    return axios.get<IPortfolioResponse>(
      `${this.URL}/${API_ENDPOINTS.PORTFOLIO}`
    )
  }

  async getStructure() {

    return axios.get<IStructureResponse>(
      `${this.URL}/${API_ENDPOINTS.STRUCTURE}`
    )
  }
}

export default new PortfolioService()
