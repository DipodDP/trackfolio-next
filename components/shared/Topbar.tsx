"use client";

import { logout } from "@/app/(auth)/actions";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Topbar() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      /* const response = await postLogout();  // Trigger the login mutation */
      await logout()
    } catch (error) {
      console.log(error)
    } finally {
      router.push('/sign-in')
    }
  }

  return (
  // className from globals.css
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="logo" width={28} height={28} />
        <p className="text-heading3-bold text-light-1 max-xs:hidden">
          Trackfolio
        </p>
      </Link>
      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <div className="flex cursor-pointer" onClick={handleLogout}>
            <Image
              src="/assets/logout.svg"
              alt="logout"
              width={24}
              height={24}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Topbar;
