import EditPosition from "@/components/EditPosition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "A invest portfolio tracker table build using ShadCN and Tanstack Table.",
};

export default async function Home() {
  return (
    <>
      <EditPosition />
    </>
  );
}
