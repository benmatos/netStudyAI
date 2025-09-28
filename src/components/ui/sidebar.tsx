"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Book, Bot, Home, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Button } from "./button"

const navItems = [
  { href: "/", label: "Dashboard", icon: Home },
];


export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden h-screen w-16 flex-col border-r bg-background sm:flex">
        <TooltipProvider>
            <nav className="flex flex-col items-center gap-4 px-2 py-4">
            <Link
                href="#"
                className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
                <Bot className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">AI Quiz</span>
            </Link>

            {navItems.map((item) => (
                <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                    <Link href={item.href}>
                        <Button
                            variant={pathname === item.href ? 'default' : 'ghost'}
                            size="icon"
                            className={cn(
                                "rounded-lg",
                                pathname === item.href &&
                                "bg-primary text-primary-foreground"
                            )}
                            aria-label={item.label}
                        >
                            <item.icon className="h-5 w-5" />
                        </Button>
                    </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                </Tooltip>
            ))}
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
            <Tooltip>
                <TooltipTrigger asChild>
                <Link href="#">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="mt-auto rounded-lg"
                        aria-label="Configurações"
                    >
                        <Settings className="h-5 w-5" />
                    </Button>
                </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Configurações</TooltipContent>
            </Tooltip>
            </nav>
        </TooltipProvider>
    </aside>
  );
}
