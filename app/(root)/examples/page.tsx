import { Query } from "./Query";
import  TableExample  from "./DataTable";
import { Counter } from "./Counter";

function Page() {

return (
    <div>
      // Redux-toolkit example
      <h2 className="head-text text-left mb-2">Redux counter example</h2>
      <Counter />

      // Table example
      <TableExample />

      // React-query example
      <h2 className="head-text text-left mb-2">React-query example</h2>
      <Query />
    </div>
  )
}

export default Page;
