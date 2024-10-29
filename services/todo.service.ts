import { ITodo } from "@/lib/models/query.model"
import axios from "axios"

class TodoService {

  private URL = 'https://jsonplaceholder.typicode.com/todos'

  async getAll() {
    return axios.get<ITodo[]>(
      `${this.URL}/?_start=0&_limit=5`
    )
  }

  async getById(id: string) {
    return axios.get<ITodo>(
      `${this.URL}/${id}`
    )
  }
}

export default new TodoService()
