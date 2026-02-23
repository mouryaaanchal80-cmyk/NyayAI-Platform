import { Link, useLocation } from "wouter";
import { Scale, Menu, X, Globe } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();

  const toggleLang = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/file-complaint", label: t("nav.fileComplaint") },
    { href: "/awareness", label: t("nav.awareness") },
    { href: "/impact", label: t("nav.impact") },
    { href: "/gov-resources", label: t("nav.gov") },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full glass-panel border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-primary/10 p-2.5 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Scale className="h-7 w-7 text-primary" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-foreground">
                Nyay<span className="text-primary">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleLang}
              className="gap-2 rounded-full border-primary/20 text-primary hover:bg-primary/5"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-3 rounded-xl text-base font-medium ${
                  location === link.href 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-3 pt-4">
              <Button 
                variant="outline" 
                className="w-full justify-center gap-2" 
                onClick={() => {
                  toggleLang();
                  setIsOpen(false);
                }}
              >
                <Globe className="h-4 w-4" />
                Switch to {language === 'en' ? 'हिंदी' : 'English'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
