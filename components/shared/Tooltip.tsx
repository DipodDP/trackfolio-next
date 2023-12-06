'use client'
import React, { useState } from 'react';

interface TooltipProps {
  message: string | React.ReactNode;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="group relative flex cursor-pointer"
      onClick={() => setShowTooltip(false)}
      onMouseOut={() => setShowTooltip(true)}>
      {children}
      {showTooltip && (
        <span className="absolute bottom-full mb-2 right-0 scale-0 transition-all rounded bg-gray-800 p-2 text-white group-hover:scale-100 whitespace-nowrap truncate max-w-[500px] max-h-[60px]">
          {message}
        </span>
      )}
    </div>
  );
};

export default Tooltip;
