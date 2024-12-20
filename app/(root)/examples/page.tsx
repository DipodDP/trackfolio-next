import { Query } from "./Query";
import TableExample from "./DataTable";
import { Counter } from "./Counter";
import { PopoverDemo } from "./PopoverDemo";
import Tooltip from "@/components/shared/Tooltip";
import FormExample from "./Form";
import { DialogDemo } from "./Dialog";

function Page() {

  return (
    <div>
      {/* Redux-toolkit example */}
      <h2 className="head-text text-left mb-2">Redux counter example</h2>
      <Counter />

      {/* Table example */}
      <h2 className="head-text text-left mb-2">Data table example</h2>
      <TableExample />

      {/* React-query example */}
      <h2 className="head-text text-left mb-2">React-query example</h2>
      <Query />

      {/* Popover example */}
      <h2 className="head-text text-left mb-2">Popover example</h2>
      <Tooltip message="Click to open popover">
        <PopoverDemo />
      </Tooltip>

      {/* Form example */}
      <h2 className="head-text text-left mb-2">Form example</h2>
      <FormExample />

      {/* Dialog example */}
      <h2 className="head-text text-left mb-2">Dialog example</h2>
      <DialogDemo />
    </div>
  )
}

export default Page;
