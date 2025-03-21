import clsx from "clsx";

import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";
import { BlurImage } from "./BlurImage";

export const Logo = ({
  textClassName,
  logoClassName,
}: {
  textClassName?: string;
  logoClassName?: string;
}) => {
  return (
    <Link
      href="/"
      className={clsx(
        "font-bold   text-sm flex items-center justify-center text-white space-x-2",
        textClassName
      )}
    >
      <BlurImage
        width={30}
        height={30}
        src={`/images/avatar.jpg`}
        className={twMerge("rounded-full", logoClassName)}
      />
      <span className={twMerge("font-inter font-bold", textClassName)}>
        0xDragon888
      </span>
    </Link>
  );
};
