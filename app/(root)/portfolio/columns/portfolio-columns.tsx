"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import { portfolioLabels, profits } from "../data/data"
import { Position } from "../data/schema"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { PortfolioTableRowActions } from "@/components/data-table/portfolio-table-row-actions"
import { MoneyValue } from "@/lib/models/portfolio.api.model"
import { QuotationToDecimal } from "@/lib/utils"


export const columnsPortfolio: ColumnDef<Position>[] = [
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

