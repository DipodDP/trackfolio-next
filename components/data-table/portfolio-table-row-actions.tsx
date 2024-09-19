"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { portfolioLabels } from "@/app/(root)/portfolio/data/data";
import { portfolioSchema } from "@/app/(root)/portfolio/data/schema";
// import Link from "next/link"
import { EditPositionDialog } from "../Dialog";
import { useState } from "react";

interface PortfolioTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function PortfolioTableRowActions<TData>({
  row,
}: PortfolioTableRowActionsProps<TData>) {
  const position = portfolioSchema.parse(row.original);
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <EditPositionDialog
        open={isEditOpen}
        setIsOpen={setIsEditOpen}
        position={position}
      />
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onSelect={() => setIsEditOpen(true)}>
          {/* <Link href="edit-position"> */}
          Edit Position
          {/* </Link> */}
        </DropdownMenuItem>
        {/* <EditPositionDialog open={isEditOpen} setIsOpen={setIsEditOpen} /> */}
        <DropdownMenuItem>Show info</DropdownMenuItem>
        <DropdownMenuItem>Favorite</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Asset type</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={position.instrument_type}>
              {portfolioLabels.map((type) => (
                <DropdownMenuRadioItem key={type.value} value={type.value}>
                  {type.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
