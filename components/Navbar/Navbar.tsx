import { navItems } from "@/constants/navItems";
import Link from "next/link";
import React from "react";
import AnimatedDesktopNav from "./DesktopNav";
import { MobileNav } from "./MobileNav";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between sm:justify-between py-8 max-w-5xl mx-auto relative z-[100] px-8 ">
      <div className="hidden lg:flex w-full justify-between items-center">
        <AnimatedDesktopNav navItems={navItems} />
        <a
          href="https://t.me/dragon0195"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-800 text-white font-medium rounded-full transition-colors duration-200 ml-4"
        >
          Contact me
        </a>
      </div>

      <div className="flex lg:hidden w-full items-center justify-between">
        <MobileNav navItems={navItems} />
        <a
          href="https://t.me/dragon0195"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-3 py-1.5 bg-primary hover:bg-primary-800 text-white text-sm font-medium rounded-full transition-colors duration-200 ml-4"
        >
          Contact me
        </a>
      </div>
    </div>
  );
};

export default Navbar;
