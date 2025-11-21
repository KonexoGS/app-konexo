import { Calendar, Home, Inbox, Search, Settings, Code } from "lucide-react";

export const sidebarItems = [
  {
    id: "home",
    title: "Página inicial",
    url: "/home",
    icon: Home,
    disabled: false
  },
  {
    id: "explore",
    title: "Explorar",
    icon: Search,
    disabled: false
  },
  {
    id: "users",
    title: "Desenvolvedores",
    url: "/dev/",
    icon: Code,
    disabled: false
  },
  {
    id: "projects",
    title: "Projetos",
    url: "/projects",
    icon: Inbox,
    disabled: false
  },
  {
    id: "settings",
    title: "Configurações",
    url: "#",
    icon: Settings,
    disabled: true
  },
]