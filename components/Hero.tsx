import React from "react";
import { LinkPreview } from "./LinkPreview";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 md:mt-20 px-8">
      <h1 className="font-bold text-3xl md:text-5xl leading-tight text-zinc-50 max-w-3xl">
        I'm an AI Native Developer{" "}
        <span className="text-primary-900">who writes code.</span>
      </h1>
      <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 leading-loose tracking-wide">
        AI Native Developer refers to developers who have grown up or transformed in the context of the full flow of AI development.
      </p>
      
      <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-4 leading-loose tracking-wide">
        They not only regard AI as a tool, but also take it as part of their "native thinking" for thinking, decision-making and problem-solving, and make creative products.
      </p>
      <div className="mt-8 text-zinc-400 text-sm md:text-base max-w-2xl leading-loose tracking-wide">
        Building{" "}
        <LinkPreview
          className={
            "text-zinc-200 font-bold hover:text-primary-900 transition duration-150 outline-none"
          }
          url="XXX"
        >
          BookTile
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview
          className={
            "text-zinc-200 font-bold hover:text-primary-900 transition duration-150"
          }
          url="Shenzhencai"
        >
          Shenzhencai
        </LinkPreview>{" "}
        when I'm not working on my day job.
      </div>
    </div>
  );
};
