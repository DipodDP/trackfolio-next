import React from "react";
import Tooltip from "../shared/Tooltip";
import PopoverPlanProportion from "../popovers/PopoverPlanProportion";

interface NumberWithPercentageProps {
  mainNumber: string;
  percentageNumber: string | null;
  toBuy: number;
}

const NumberWithPercentage: React.FC<NumberWithPercentageProps> = ({
  mainNumber,
  percentageNumber,
  toBuy,
}) => {
  let formatted;
  if (!percentageNumber) {
    formatted = " - ";
  } else {
    formatted = new Intl.NumberFormat("ru-RU", {
      style: "percent",
      maximumFractionDigits: 1,
    }).format(parseFloat(percentageNumber));
  }

  return (
    <div className="flex items-center justify-end space-x-2 w-[100px]">
      <span className="text-right font-medium">{mainNumber}</span>
      <Tooltip message={"Click to set asset target proportion in portfolio"}>
        <PopoverPlanProportion defaultValue={formatted} toBuy={toBuy}>
          <span className="bg-gray-400 rounded-full px-2 py-1 text-xs hover:text-base">
            {formatted}
          </span>
        </PopoverPlanProportion>
      </Tooltip>
    </div>
  );
};

export default NumberWithPercentage;
