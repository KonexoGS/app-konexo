"use client"

import Squares from "@/components/squares/squares";
import ThemeToggle from "@/components/theme-toggle";
import GradientButton from "@/components/gradient-button/gradient-button";
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import Link from "next/link";

export default function Landing() {

  const { theme } = useTheme();
  
  return (
    <div className="relative flex justify-center h-screen min-h-screen p-0 dark:bg-radial from-[#280137] from-50% to-purple-950 overflow-hidden ">
      <div className="absolute flex gap-5 items-center right-5 top-5">
        <Link className="relative overflow-hidden text-white dark:text-home-background font-medium rounded-3xl px-5 py-2 bg-linear-to-br from-purple-900 to-purple-800 dark:from-white dark:to-white bg-size-[200%_200%] bg-position-[0%_50%] hover:bg-position-[100%_50%] transition-[background-position] duration-500 ease-in-out dark:hover:opacity-95" href='/login'>
          Entrar
        </Link>
        <Link className="relative overflow-hidden text-white dark:text-home-background font-medium rounded-3xl px-5 py-2 bg-linear-to-br from-purple-900 to-purple-800 dark:from-white dark:to-white bg-size-[200%_200%] bg-position-[0%_50%] hover:bg-position-[100%_50%] transition-[background-position] duration-500 ease-in-out dark:hover:opacity-95" href='/register'>
          Cadastre-se
        </Link>
        <ThemeToggle/>
      </div>
      <Squares
        speed={0.5}
        squareSize={40}
        direction='up'
        borderColor={theme === 'dark' ? '#4e337984' : '#dfccff'}
        hoverFillColor={theme === 'dark' ? '#402764': '#d2b2ff'}
      />
      <main className="absolute flex flex-col justify-center items-center gap-10 w-full h-full py-32 px-16 z-1 pointer-events-none">
        <div className="flex items-center gap-3">
          <Image
            className="dark:invert"
            src="/logo.svg"
            alt="Logo da Konexo"
            style={{height: "auto", width: "auto"}}
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
            Procurando o projeto open source ideal para colaborar?
            <br />
            Encontre projetos que se encaixam com suas habilidades!
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <GradientButton
            href="#"
            colors={theme === 'dark' 
              ? ['#e7e5e4', '#d6d3d1', '#ffffff', '#d6d3d1', '#e7e5e4']
              : ['#581c87', '#6b21a8', '#7e22ce', '#6b21a8', '#581c87']
            }
            animationSpeed={.6}
            className={theme === 'dark' ? 'dark-variant' : ''}
          >
            Get started
          </GradientButton>
          <a
            className="pointer-events-auto text-home-foreground bg-[#ffffff0d] backdrop-blur-[2px] flex h-12 w-full items-center justify-center rounded-full border border-home-foreground px-5 transition-colors hover:bg-[#ffffff3f] dark:hover:bg-black/4 dark:border-white/[.145] md:w-[158px]"
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