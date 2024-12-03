import { ILogin, ILoginResponse, IRegister } from "@/lib/models/auth.api.model";
import { API_ENDPOINTS } from "@/lib/react-query/endpoints";
// import { verifySession } from "@/lib/stateless-session";
import axios from "axios";

class AuthService {
  // private url = '/api';
  private url = process.env.NEXT_PUBLIC_API_BASE_URL
  private headers = {
    'accept': 'application/json',
    // 'Authorization': 'Bearer ' + getAccessToken
    // 'Access-Control-Allow-Origin': '*',
  }

  async postRegister(request: IRegister) {
    // Make the POST request using axios and return the response
    return axios.post<IRegister>(`${this.url}${API_ENDPOINTS.AUTH_REGISTER}`, request, {
      headers: {
        ...this.headers,
        'Content-Type': 'application/json',
      },
      // withCredentials: true
    });
  }

  async postLogin(request: ILogin) {
    // Use URLSearchParams to format the request body as application/x-www-form-urlencoded
    const params = new URLSearchParams();
    // Dynamically append all properties from the request object (ILogin)
    Object.keys(request).forEach((key) => {
      params.append(key, (request as any)[key]); // Cast request to any to access values dynamically
    });

    // Make the POST request using axios and return the response
    return axios.post<ILoginResponse>(`${this.url}${API_ENDPOINTS.AUTH_LOGIN}`, params, {
      headers: {
        ...this.headers,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      // withCredentials: true
    });
  }

  async postLogout() {
    return axios.post(`${this.url}${API_ENDPOINTS.AUTH_LOGOUT}`, {}, {
      headers: this.headers,
      // withCredentials: true
    });
  }
}

export default new AuthService();
