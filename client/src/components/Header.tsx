import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Spade, ArrowRight, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/quiz", label: "Quiz" },
  { href: "/ranges", label: "Ranges" },
  { href: "/spots", label: "Spots" },
  { href: "/hands", label: "Hands" },
  { href: "/wiki", label: "Wiki" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-6xl mx-auto flex h-14 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center" data-testid="icon-logo">
                <Spade className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold" data-testid="text-brand">Poker Coach</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center gap-6" data-testid="nav-desktop">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span 
                className={`text-sm transition-colors cursor-pointer ${
                  location === item.href 
                    ? "text-foreground font-medium" 
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid={`link-${item.label.toLowerCase()}`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/app" className="hidden sm:block">
            <Button size="sm" data-testid="button-launch-app">
              Launch App
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background" data-testid="nav-mobile">
          <nav className="container max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span 
                  className={`block py-2 px-3 rounded-md text-sm transition-colors cursor-pointer ${
                    location === item.href 
                      ? "bg-muted text-foreground font-medium" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${item.label.toLowerCase()}`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/app">
              <Button className="w-full mt-2" onClick={() => setMobileMenuOpen(false)} data-testid="button-mobile-launch-app">
                Launch App
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
