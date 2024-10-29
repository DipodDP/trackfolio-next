import {
  IPortfolioResponse,
  IStructureResponse,
} from "@/lib/models/portfolio.api.model";
import { API_ENDPOINTS } from "@/lib/react-query/endpoints";
import axios from "axios";

class PortfolioService {
  private URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  private headers = {
    'accept': 'application/json',
  }

  async getPortfolio() {
    return axios.get<IPortfolioResponse>(
      `${this.URL}${API_ENDPOINTS.PORTFOLIO}`, {
        headers: this.headers,
        withCredentials: true
      }
    );
  }

  async getStructure() {
    return axios.get<IStructureResponse>(
      `${this.URL}${API_ENDPOINTS.STRUCTURE}`, {
        headers: this.headers,
        withCredentials: true
      }
    );
  }
}

export default new PortfolioService();
