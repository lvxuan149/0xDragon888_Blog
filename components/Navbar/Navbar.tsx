import { navItems } from "@/constants/navItems";
import Link from "next/link";
import React from "react";
import AnimatedDesktopNav from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { ThemeToggle } from '@/components/ThemeToggle';

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between sm:justify-between py-8 max-w-5xl mx-auto relative z-[100] px-8">
      <div className="hidden lg:flex w-full items-center space-x-4">
        <AnimatedDesktopNav navItems={navItems} />
        <div className="flex items-center space-x-4">
          <a
            href="https://t.me/dragon0195"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center whitespace-nowrap px-6 py-2.5 bg-primary hover:bg-primary-800 text-white font-medium rounded-full transition-colors duration-200 min-w-[120px] justify-center"
          > 
            Contact me
          </a>
          <ThemeToggle />
        </div>
      </div>

      <div className="flex lg:hidden w-full items-center justify-between">
        <MobileNav navItems={navItems} />
        <div className="flex items-center space-x-3">
          <a
            href="https://t.me/dragon0195"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center whitespace-nowrap px-6 py-2.5 bg-primary hover:bg-primary-800 text-white font-medium rounded-full transition-colors duration-200 min-w-[120px] justify-center"
          >
            Contact me
          </a>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
