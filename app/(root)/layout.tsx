import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Topbar />
      <main className="flex flex-row bg-dark-1">
        <LeftSidebar />
        <section className="container main-container">
          <div className="w-full">{children}</div>
        </section>
        <RightSidebar />
      </main>
      <Bottombar />
    </Providers>
  );
}
