"use client"

import Squares from "@/components/Squares";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/hooks/useTheme";
import Image from "next/image";

export default function Home() {

  const { theme } = useTheme();

  return (
    <div className="relative flex justify-center h-screen min-h-screen font-sans p-0 dark:bg-radial from-purple-900 from-40% to-purple-950 overflow-hidden ">
      <ThemeToggle className="absolute right-5 top-5" />
      <Squares
        speed={0.5}
        squareSize={40}
        direction='up'
        borderColor={theme === 'dark' ? '#6642a084' : '#dfccff'}
        hoverFillColor={theme === 'dark' ? '#7340bb': '#d2b2ff'}
      />
      <main className="absolute flex flex-col justify-center items-center gap-10 w-full h-full py-32 px-16 z-1 pointer-events-none">
        <div className="flex items-center gap-3">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <h1 className="max-w-md text-8xl leading-tight tracking-tight bg-linear-to-r from-purple-900 via-purple-800 to-purple-700 dark:from-white dark:via-white dark:to-white bg-clip-text text-transparent">
            Konexo
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center gap-6 text-center sm:items-start sm:text-left">
          <p className=" text-lg text-home-foreground font-medium leading-8 text-nowrap text-center">
            Procurando o projeto open source ideal para colaborar?<br />Crie uma conta e encontre projetos que se encaixam no seu perfil!
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="pointer-events-auto flex h-12 w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-purple-950 to-purple-700 dark:bg-linear-to-br dark:from-stone-300 dark:via-stone-200 dark:to-white px-5 text-home-background transition-colors hover:brightness-95 dark:hover:bg-home-foreground/93 md:w-[158px]"
            href="#"
            rel="noopener noreferrer"
          >
            Get started
          </a>
          <a
            className="pointer-events-auto text-home-foreground bg-[#ffffff0d] backdrop-blur-[2px] flex h-12 w-full items-center justify-center rounded-full border border-solid border-[#4a3968] px-5 transition-colors hover:bg-black/4 dark:border-white/[.145] md:w-[158px]"
            href="#"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
      </main>
    </div>
  );
}