"use client"

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { cn } from "@/app/lib/utils";

type ThemeToggleProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: number;
  iconSize?: number;
};

export default function ThemeToggle({ 
  className = "", 
  size = 40,
  iconSize,
  ...props 
}: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Calcula o tamanho do ícone baseado no tamanho do botão se não for especificado
  const calculatedIconSize = iconSize || size * 0.6;

  // função para atualizar o favicon
  const updateFavicon = (currentTheme: string) => {

    // pega o link antigo
    const existingFavicon = document.querySelector("link[rel='icon']");

    // remove o link antigo
    if (existingFavicon) existingFavicon.remove();

    // cria um novo link
    const newFavicon = document.createElement('link');

    // seta 'icon' no atributo rel
    newFavicon.rel = 'icon';

    // define a URL do favicon com base no tema
    const iconUrl = currentTheme === "dark" ? "/icon-dark.png" : "/icon-light.png";

    // seta a iconUrl no atributo href e com timestamp para quebrar cache
    newFavicon.href = `${iconUrl}?v=${Date.now()}`;

    // insere o novo link no head do html
    document.head.appendChild(newFavicon);
  };

  // atualiza o favicon quando o tema mudar
  useEffect(() => {
    setMounted(true);
    updateFavicon(theme);
  }, [theme]);

  const handleToggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updateFavicon(newTheme);
  };

  // retorna um skeleton enquanto não montar (evita hidratação)
  if (!mounted) {
    return (
      <button
        style={{ width: size, height: size }}
        className={cn(
          'flex justify-center items-center bg-gray-400 rounded-[50%] cursor-wait animate-pulse',
          className
        )}
        aria-label="Loading theme toggle"
        disabled
      />
    );
  }

  return (
    <button
      onClick={handleToggle}
      style={{ width: size, height: size }}
      className={cn(
        'flex justify-center items-center bg-radial to-purple-950 from-purple-600 dark:to-yellow-600 dark:from-yellow-400 transition-colors rounded-[50%] cursor-pointer',
        className
      )}
      aria-label="Toggle theme"
      {...props}
    >
      {theme === 'light' ? (
        <Moon color='white' size={calculatedIconSize} />
      ) : (
        <Sun color='white' size={calculatedIconSize} />
      )}
    </button>
  )
}
