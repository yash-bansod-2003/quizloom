import { Link, useLocation } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";

export function MainNav() {
  const { pathname } = useLocation();

  return (
    <div className="mr-4 hidden md:flex">
      <Link to="/" className="mr-4 flex items-center space-x-2 lg:mr-6">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold lg:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        <Link
          to="#"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Home
        </Link>
        <Link
          to="#"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/discover" ? "text-foreground" : "text-foreground/60",
          )}
        >
          Discover Quiz
        </Link>
        <Link
          to="#"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/leaderboard"
              ? "text-foreground"
              : "text-foreground/60",
          )}
        >
          Leaderboard
        </Link>
        <Link
          to="/charts"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === "/about" ? "text-foreground" : "text-foreground/60",
          )}
        >
          About
        </Link>
      </nav>
    </div>
  );
}
