import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

export const sidebarItems = [
  {
    id: "home",
    title: "Página inicial",
    url: "/home",
    icon: Home,
  },
  {
    id: "explore",
    title: "Explorar",
    icon: Search,
  },
  {
    id: "calendar",
    title: "Calendário",
    url: "#",
    icon: Calendar,
  },
  {
    id: "inbox",
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    id: "settings",
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
]