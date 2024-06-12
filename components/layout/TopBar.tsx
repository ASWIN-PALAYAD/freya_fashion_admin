"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";


import { navLinks } from "@/lib/constants";


function TopBar() {
  const [dropDownMenu, setDropDownMenu] = useState(false);
  const pathName = usePathname();

  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src={"/freya_logo.png"} alt="logo" width={150} height={70} />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathName === link.url ? "text-blue-1" : 'text-grey-1'} `}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="relative flex gap-4  items-center">
        {dropDownMenu ? (
          <X
            className="cursor-pointer md:hidden"
            onClick={() => setDropDownMenu(false)}
          />
        ) : (
          <Menu
            className="cursor-pointer md:hidden"
            onClick={() => setDropDownMenu(!dropDownMenu)}
          />
        )}

        {dropDownMenu && (
          <div className="absolute top-10 right-6 flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg  md:hidden lg:hidden">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className=" flex gap-4 text-body-medium "
              >
                {link.icon} <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  );
}

export default TopBar;
