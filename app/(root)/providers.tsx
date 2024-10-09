import PortfolioProvider from "@/context/PortfolioContext";
import React from "react";

export function Providers(props: { children: React.ReactNode }) {
  return (
    <PortfolioProvider>
      {props.children}
    </PortfolioProvider>
  );
}
