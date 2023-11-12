"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, portfolioLabels, profits, priorities, statuses } from "./data/data"
import { Share, Task } from "./data/schema"
import { DataTableRowActions } from "@/components/data-table/data-table-row-actions"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { PortfolioTableRowActions } from "@/components/data-table/portfolio-table-row-actions"
import { MoneyValue } from "@/lib/models/api.model"
import { QuotationToDecimal } from "@/lib/utils"
// import { Badge } from "@/registry/new-york/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

// export const columns: ColumnDef<Payment>[] = [
export const columns: ColumnDef<Task>[] = [
  // This adds a checkbox to each row and a checkbox in the header to select all rows.
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const label = labels.find((label) => label.value === row.original.label)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    // header: "Status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      )

      if (!status) {
        return null
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priority = priorities.find(
        (priority) => priority.value === row.getValue("priority")
      )

      if (!priority) {
        return null
      }

      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  // {
  //   accessorKey: "email",
  //   // Updating the email header cell to add sorting controls.
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     )
  //   },
  // },
  // {
  //   accessorKey: "amount",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)
  //
  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },

  // Let's add row actions to our table. We'll use a <Dropdown /> component for this.
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />
    //   const payment = row.original
    //
    //   return (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="ghost" className="h-8 w-8 p-0">
    //           <span className="sr-only">Open menu</span>
    //           <MoreHorizontal className="h-4 w-4" />
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //         <DropdownMenuItem
    //           onClick={() => navigator.clipboard.writeText(payment.id)}
    //         >
    //           Copy payment ID
    //         </DropdownMenuItem>
    //         <DropdownMenuSeparator />
    //         <DropdownMenuItem>View customer</DropdownMenuItem>
    //         <DropdownMenuItem>View payment details</DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   )
    // },
  },

]

export const columnsPortfolio: ColumnDef<Share>[] = [
  // This adds a checkbox to each row and a checkbox in the header to select all rows.
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "ticker",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ticker" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("ticker")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const label = portfolioLabels.find((label) => label.value === row.original.instrument_type)

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id))
    // },
  },
  {
    accessorKey: "current_price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("price"))
      const amount = row.getValue<MoneyValue>("current_price")
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: amount.currency,
      }).format(QuotationToDecimal(amount))

      return <div className="text-right font-medium w-[80px]">{formatted}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{QuotationToDecimal(row.getValue("quantity"))}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      // const amount = parseFloat(row.getValue("price"))
      const amount = row.getValue<MoneyValue>("total")
      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: amount.currency,
      }).format(QuotationToDecimal(amount))

      return <div className="text-right font-medium w-[80px]">{formatted}</div>
    },
    enableSorting: false,
  },
  {
    accessorKey: "proportion_in_portfolio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proportion" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("proportion_in_portfolio"))
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "percent",
        maximumFractionDigits: 2
      }).format(amount)

      return <div className="text-right font-medium w-[80px]">{formatted}</div>
    },
  },
  {
    accessorKey: "profit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profit" />
    ),
    cell: ({ row }) => {
      const profit = profits.find(
        // (profits) => profits.value === row.getValue("profit")
        (profits) => {
          if (row.getValue<number>("profit") >= 0) {
            return profits.value === "high"
          }
          else {
            return profits.value === "low"
          }
        }
      )

      if (!profit) {
        return null
      }

      const amount = parseFloat(row.getValue("profit"))
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "percent",
        maximumFractionDigits: 2
      }).format(amount)

      return (
        <div className="flex items-center text-green-600">
          {profit.icon && (
            <profit.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="max-w-[500px] truncate font-medium">
            {formatted}
          </span>
        </div>
      )
    }
  },
  // Let's add row actions to our table. We'll use a <Dropdown /> component for this.
  {
    id: "actions",
    cell: ({ row }) => <PortfolioTableRowActions row={row} />
  },

]

