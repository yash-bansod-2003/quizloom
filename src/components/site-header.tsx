import { Link } from "react-router-dom";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { Icons } from "./icons";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-end space-x-2 md:justify-end">
          <nav className="flex items-center gap-4">
            <Link to={siteConfig.links.github} target="_blank" rel="noreferrer">
              <div
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  }),
                  "h-8 w-8 px-0",
                )}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">Github</span>
              </div>
            </Link>
            <Link
              to="/auth/login"
              rel="noreferrer"
              className={buttonVariants()}
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
