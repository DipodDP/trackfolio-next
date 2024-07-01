import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import React, { useState } from 'react';

interface PopoverProps {
  defaultValue: string
  toBuy: number
  children: React.ReactNode;
}

const PopoverPlanProportion: React.FC<PopoverProps> = ({ children, defaultValue, toBuy }) => {
  const [isOpen, setIsOpen] = useState(undefined as any);
  const handleClose = () => {
    setIsOpen(false);
  };


  return (
    <Popover open={isOpen} onOpenChange={() => setIsOpen(undefined)}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-60">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Asset plan proportion</h4>
            <p className="text-sm text-muted-foreground">
              Set desired proportion of the asset in the porfolio.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="planProportion">Plan proportion</Label>
              <Input
                id="planProportion"
                defaultValue={defaultValue}
                className="col-span-1 w-20"
              />
            </div>
            <div className="grid grid-cols-2 items-center gap-4">
              <Label htmlFor="lotsToBuy">Lots to buy or sell:</Label>
              <div id="lotsToBuy" className="col-span-1 h-6 w-20">
                {toBuy}
              </div>
            </div>

            <div className="grid grid-cols-2 items-center gap-2">
              <button
                className="col-span-1 mt-2 py-2 w-30 bg-primary-500 text-light-1 text-sm rounded hover:shadow-md transition-all"
              >
                Rebalance
              </button>
              <button
                className="col-span-1 mt-2 py-2 w-30 bg-gray-400 text-light-1 text-sm rounded hover:shadow-md transition-all"
                onClick={handleClose}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverPlanProportion;
