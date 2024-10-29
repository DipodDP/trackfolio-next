"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // Make the email column sortable
  const [sorting, setSorting] = React.useState<SortingState>([])
  // Adding a search input to filter emails in table
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  // Adding 
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  // Add row selection to table
  const [rowSelection, setRowSelection] = React.useState({})
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    // Table plugins
    getCoreRowModel: getCoreRowModel(),
    // Add pagination to table. Automatically paginate rows into pages of 10
    getPaginationRowModel: getPaginationRowModel(),
    // Add sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // Add filtering
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // Adding column visibility column visibility
    onColumnVisibilityChange: setColumnVisibility,
    // Add row selection to table
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-dark-1">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
    // <div>
    //   <div className="flex items-center py-4">
    //     <Input
    //       placeholder="Filter emails..."
    //       value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
    //       onChange={(event) =>
    //         table.getColumn("email")?.setFilterValue(event.target.value)
    //       }
    //       className="max-w-sm"
    //     />
    //     {/* Adding column visibility */}
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="outline" className="ml-auto">
    //           Columns
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         {table
    //           .getAllColumns()
    //           .filter(
    //             (column) => column.getCanHide()
    //           )
    //           .map((column) => {
    //             return (
    //               <DropdownMenuCheckboxItem
    //                 key={column.id}
    //                 className="capitalize"
    //                 checked={column.getIsVisible()}
    //                 onCheckedChange={(value) =>
    //                   column.toggleVisibility(!!value)
    //                 }
    //               >
    //                 {column.id}
    //               </DropdownMenuCheckboxItem>
    //             )
    //           })}
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   </div>
    //   <div className="rounded-md border">
    //     <Table>
    //       <TableHeader>
    //         {table.getHeaderGroups().map((headerGroup) => (
    //           <TableRow key={headerGroup.id}>
    //             {headerGroup.headers.map((header) => {
    //               return (
    //                 <TableHead key={header.id}>
    //                   {header.isPlaceholder
    //                     ? null
    //                     : flexRender(
    //                         header.column.columnDef.header,
    //                         header.getContext()
    //                       )}
    //                 </TableHead>
    //               )
    //             })}
    //           </TableRow>
    //         ))}
    //       </TableHeader>
    //       <TableBody>
    //         {table.getRowModel().rows?.length ? (
    //           table.getRowModel().rows.map((row) => (
    //             <TableRow
    //               key={row.id}
    //               data-state={row.getIsSelected() && "selected"}
    //             >
    //               {row.getVisibleCells().map((cell) => (
    //                 <TableCell key={cell.id}>
    //                   {flexRender(cell.column.columnDef.cell, cell.getContext())}
    //                 </TableCell>
    //               ))}
    //             </TableRow>
    //           ))
    //         ) : (
    //           <TableRow>
    //             <TableCell colSpan={columns.length} className="h-24 text-center">
    //               No results.
    //             </TableCell>
    //           </TableRow>
    //         )}
    //       </TableBody>
    //     </Table>
    //   </div>
    //
    //   {/* Add pagination controls */}
    //   <div className="flex items-center justify-end space-x-2 py-4">
    //     <Button
    //       variant="outline"
    //       size="sm"
    //       onClick={() => table.previousPage()}
    //       disabled={!table.getCanPreviousPage()}
    //     >
    //       Previous
    //     </Button>
    //     <Button
    //       variant="outline"
    //       size="sm"
    //       onClick={() => table.nextPage()}
    //       disabled={!table.getCanNextPage()}
    //     >
    //       Next
    //     </Button>
    //   </div>
    //
    //   {/* show the number of selected rows */}
    //   <div className="flex-1 text-sm text-muted-foreground">
    //     {table.getFilteredSelectedRowModel().rows.length} of{" "}
    //     {table.getFilteredRowModel().rows.length} row(s) selected.
    //   </div>
    //
    // </div>
  )
}
