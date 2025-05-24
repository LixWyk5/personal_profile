import React from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../utils/utils";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle({ className }) {
  const { theme, setTheme } = useTheme();

  const toggle = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <Button
      variant="outline"
      size="icon"
      className={cn("border-none bg-transparent", className)}
      onClick={toggle}
    >
      {theme === "light" ? (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
}
