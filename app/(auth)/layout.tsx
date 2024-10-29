
import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen">
      <div className="auth-asset">
        <section className="flex-1 justify-center flex-col">
          {children}
        </section>

        <Image
          src="/assets/images/side-img.svg"
          alt="Auth image"
          width={500}
          height={500}
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        />
      </div>
    </main>
  )
}
