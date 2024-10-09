// declaration of client side rendered component
"use client";

import { sidebarLinks } from "@/constants";
import { usePostLogout } from "@/lib/react-query/queriesAndMutations";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

function LeftSidebar() {
  const { mutateAsync: postLogout } = usePostLogout()
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await postLogout();  // Trigger the login mutation
      const response = await postLogout();  // Trigger the login mutation
    } catch (error) {
      console.log(error)
    } finally {
      router.push('/sign-in')
    }
  }

  return (
    <section className="custom-scrollbar leftsidebar min-w-min">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
          return (
            <Link
              href={link.route}
              key={link.label}
              // showing active page
              className={`leftsidebar_link ${isActive && "bg-primary-500"}`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 px-6">
        <div className="flex cursor-pointer gap-4 p-4" onClick={handleLogout}>
          <Image src="/assets/logout.svg" alt="logout" width={24} height={24} />
          <p className="text-light-2 max-lg:hidden">Logout</p>
        </div>
      </div>
    </section>
  );
}

export default LeftSidebar;
