"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"

import { portfolioLabels, profits } from "../data/data"
import { Portfolio } from "../data/schema"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { Badge } from "@/components/ui/badge"
import { PortfolioTableRowActions } from "@/components/data-table/portfolio-table-row-actions"
import { MoneyValue } from "@/lib/models/portfolio.api.model"
import { formatCurrency, quotationToDecimal } from "@/lib/utils"
import NumberWithPercentage from "@/components/numeric/NumberWithPercentage"


export const columnsPortfolio: ColumnDef<Portfolio>[] = [
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
    cell: ({ row }) => <div className="w-[50px] truncate">{row.getValue("ticker")}</div>,
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
          <span className="max-w-[500px] truncate font-medium translate-y-[4px]">
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

      return <div className="text-right font-medium tuncate w-[80px]">
        {formatCurrency(amount)}
      </div>
    },
    enableSorting: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <div className="w-[60px]">{quotationToDecimal(row.getValue("quantity"))}</div>,
    enableSorting: false,
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<MoneyValue>("total")

      return <div className="text-right font-medium truncate max-w-[250px]">
        {formatCurrency(amount)}
      </div>
    },
    enableSorting: false,
  },
  {
    accessorKey: "plan_total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plan Total" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue<MoneyValue>("plan_total")

      return <div className="text-right font-medium truncate max-w-[250px]">
        {formatCurrency(amount)}
      </div>
    },
    enableSorting: false,
  },
  {
    accessorKey: "proportion_in_portfolio",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Proportion" className="max-w-[100px]" />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("proportion_in_portfolio"))
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "percent",
        maximumFractionDigits: 2
      }).format(amount)
      const planProportion = row.original.plan_proportion_in_portfolio
      const toBuy = row.original.to_buy_lots

      return <NumberWithPercentage
        toBuy={quotationToDecimal(toBuy)}
        mainNumber={formatted}
        percentageNumber={planProportion}
      />
    },
  },
  {
    accessorKey: "profit",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Profit" className="max-w-[80px]" />
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
        <div className={`flex items-center ${amount < 0 ? "text-red-700" : "text-green-600"}`}>
          {profit.icon && (
            <profit.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="truncate font-medium">
            {formatted}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "target_progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Target Progress" className="max-w-[80px]" />
    ),
    cell: ({ row }) => {
      const profit = profits.find(
        (profits) => {
          if (row.getValue<number>("target_progress") >= 0) {
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

      const amount = parseFloat(row.getValue("target_progress"))
      const formatted = new Intl.NumberFormat("ru-RU", {
        style: "percent",
        maximumFractionDigits: 2
      }).format(amount)

      return (
        <div className={`flex items-center ${amount < 0 ? "text-red-700" : "text-green-600"}`}>
          {profit.icon && (
            <profit.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span className="truncate font-medium">
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

