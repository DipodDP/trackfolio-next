import { IOrder } from "@/lib/models/order.api.model";
import { API_ENDPOINTS } from "@/lib/react-query/endpoints";
import axios from "axios";

class OrdersService {
  private URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  async postOrder() {
    return axios.post<IOrder[]>(`${this.URL}${API_ENDPOINTS.PORTFOLIO}`);
  }
}

export default new OrdersService();
