import {
  IPortfolioResponse,
  IStructureResponse,
} from "@/lib/models/portfolio.api.model";
import { API_ENDPOINTS } from "@/lib/react-query/endpoints";
import axios from "axios";

class PortfolioService {
  // private url = process.env.NEXT_PUBLIC_API_BASE_URL;
  private url = '/api';
  private headers = {
    'accept': 'application/json',
    // 'Authorization': 'Bearer ' + getAccessToken
  }

  async getPortfolio() {
    'use server';
    return axios.get<IPortfolioResponse>(
      `${this.url}${API_ENDPOINTS.PORTFOLIO}`, {
        headers: this.headers,
        // withCredentials: true
      }
    );
  }

  async getStructure() {
    'use server';
    return axios.get<IStructureResponse>(
      `${this.url}${API_ENDPOINTS.STRUCTURE}`, {
        headers: this.headers,
        // withCredentials: true
      }
    );
  }
}

export default new PortfolioService();
