import { IOrder } from "@/lib/models/order.api.model";
import axios from "axios";

class OrdersService {
  private URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  async postOrder() {
    return axios.post<IOrder[]>(`${this.URL}/portfolio`);
  }
}

export default new OrdersService();
