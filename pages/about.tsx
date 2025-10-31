import { Container } from "@/components/Container";
import { Projects } from "@/components/Projects";
import { Timeline } from "@/components/Timeline";
import { user } from "@/constants/user";
import Image from "next/image";
import {
  AiOutlineGithub,
  AiOutlineLinkedin,
  AiOutlineTwitter,
} from "react-icons/ai";

export default function ProjectsPage() {
  const socials = [
    {
      name: "twitter",
      icon: (
        <AiOutlineTwitter className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: user.twitter,
    },
    {
      name: "LinkedIn",
      icon: (
        <AiOutlineLinkedin className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: user.linkedin,
    },
    {
      name: "GitHub",
      icon: (
        <AiOutlineGithub className="h-5 w-5 hover:text-primary transition duration-150" />
      ),
      link: user.github,
    },
  ];
  return (
    <Container title={`Projects | Devpro`}>
      <div className="max-w-5xl mx-auto px-8 md:mt-20 relative flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10 justify-between">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl md:leading-tight text-zinc-50 max-w-3xl">
            Hey! I'm
            <span className="text-primary-900"> 0xDragon888</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
            I've been obsessed with technology ever since AI booming,
            Such as Claude code、Codex
          </p>
        </div>

        <div className="order-first md:order-last">
          <Image
            src={`/images/avatar.jpg`}
            width={200}
            height={200}
            alt="Avatar"
            className="rounded-2xl"
          />
          <div className="flex flex-row justify-start md:justify-center space-x-2 mt-2">
            {socials.map((socialLink: any, idx: number) => (
              <a
                key={`footer-link-${idx}`}
                href={socialLink.link}
                className="text-zinc-500 text-sm relative"
                target="__blank"
              >
                <span className="relative z-10 px-2 py-2 inline-block hover:text-primary-900">
                  {socialLink.icon}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 mt-10 relative">
        <p className="text-zinc-400 text-sm md:text-base md:leading-loose tracking-wide">
        </p>
        <p className="text-zinc-400 text-sm md:text-base mt-4 md:leading-loose tracking-wide">
          Here's a timeline of what I've been upto
        </p>
        <Timeline />
      </div>
    </Container>
  );
}
