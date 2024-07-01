"use client"

import { ColumnDef } from "@tanstack/react-table"

import { RiskPart } from "../data/schema"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"
import { MoneyValue } from "@/lib/models/portfolio.api.model"
import { quotationToDecimal } from "@/lib/utils"


export const columnsStructure: ColumnDef<RiskPart>[] = [
    {
        // don't know how to get row format information from data in right way, so i've create a void column
        accessorKey: "format",
        header: () => <></>,
        cell: () => <></>

    },
    {
        accessorKey: "type",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Instrument type" className="text-center w-[120px]" />
        ),
        cell: ({ row }) => <div className={`w-[120px] ${row.getValue("format") ? 'font-bold' : 'font-medium'}`} >
            {row.getValue("type")}
        </div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "sum",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Sum" className="text-right w-[80px]" />
        ),
        cell: ({ row }) => {
            // const amount = parseFloat(row.getValue("price"))
            const amount = row.getValue<MoneyValue>("sum")
            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: amount.currency,
            }).format(quotationToDecimal(amount))

            return <div className={`text-right w-[80px]  ${row.getValue("format") ? 'font-bold' : 'font-medium'}`}>
                {formatted}
            </div>
        },
        enableSorting: false,
    },
    {
        accessorKey: "proportion",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Risk Part" className="text-center" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("proportion"))
            let formatted
            if (isNaN(amount)) {
                formatted = '-'
            } else {
                formatted = new Intl.NumberFormat("ru-RU", {
                    style: "percent",
                    maximumFractionDigits: 2
                }).format(amount)
            }

            return <div className={`text-right w-[80px] ${row.getValue("format") ? 'font-bold' : 'font-medium'}`}>
                {formatted}
            </div>
        },
        enableSorting: false,
    },
    {
        accessorKey: "plan_sum",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Plan sum" className="text-right w-[80px]" />
        ),
        cell: ({ row }) => {
            // const amount = parseFloat(row.getValue("price"))
            const amount = row.getValue<MoneyValue>("plan_sum")
            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("ru-RU", {
                style: "currency",
                currency: amount.currency,
            }).format(quotationToDecimal(amount))

            return <div className={`text-right w-[80px] ${row.getValue("format") ? 'font-bold' : 'font-medium'}`}>
                {formatted}
            </div>
        },
        enableSorting: false,
    },
    {
        accessorKey: "plan_proportion",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Plan proportion" className="text-center break-words w-[100px]" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("plan_proportion"))
            let formatted
            if (isNaN(amount)) {
                formatted = '-'
            } else {
                formatted = new Intl.NumberFormat("ru-RU", {
                    style: "percent",
                    maximumFractionDigits: 2
                }).format(amount)
            }

            return <div className={`text-right w-[80px] ${row.getValue("format") ? 'font-bold' : 'font-medium'}`}>
                {formatted}
            </div>
        },
        enableSorting: false,
    },
    {
        accessorKey: "disbalance",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Risk Parts Disbalance" className="text-center break-words w-[100px] py-2" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("disbalance"))
            let formatted
            if (isNaN(amount)) {
                formatted = '-'
            } else {
                formatted = new Intl.NumberFormat("ru-RU", {
                    style: "percent",
                    maximumFractionDigits: 2
                }).format(amount)
            }

            return <div className={`text-right w-[80px] ${row.getValue("format") ? 'font-bold' : 'font-medium'}`}>
                {formatted}
            </div>
        },
        enableSorting: false,
    },

    // Let's add row actions to our table. We'll use a <Dropdown /> component for this.
    {
        id: "actions",
        // cell: ({ row }) => <DataTableRowActions row={row} />
    },
]
