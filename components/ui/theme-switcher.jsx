"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./button";

export default function ThemeSwitcher() {
    const { theme, setTheme, resolvedTheme } = useTheme();

    return (
        <Button
            variant={"ghost"}
            size={"icon"}
            aria-label="Toggle theme"
            onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
        >
            <Sun className="absolute h-6 w-6 rotate-90 scale-0 transform transition-all duration-300 dark:rotate-0 dark:scale-100" />
            <Moon className="absolute h-6 w-6 rotate-0 scale-100 transform transition-all duration-300 dark:-rotate-90 dark:scale-0" />
        </Button>
    );
}
