import React from 'react';

interface NumberWithPercentageProps {
 mainNumber: string;
 percentageNumber: string | null;
}

const NumberWithPercentage: React.FC<NumberWithPercentageProps> = ({ mainNumber, percentageNumber }) => {
 let formatted;
 if (!percentageNumber) {
   formatted = ' - ';
 } else {
   formatted = new Intl.NumberFormat("ru-RU", {
     style: "percent",
     maximumFractionDigits: 1
   }).format(parseFloat(percentageNumber));
 }
 return (
   <div className="flex items-center space-x-2 w-[80px]">
     <span className="text-right font-medium ">{mainNumber}</span>
     <span className="bg-gray-400 rounded-full px-2 py-1 text-xs hover:text-base">
       {formatted}
     </span>
   </div>
 );
};

export default NumberWithPercentage;

