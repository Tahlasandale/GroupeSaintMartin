"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  Menu, 
  X, 
  User, 
  LogOut, 
  Settings, 
  ChevronDown,
  Moon,
  Sun
} from "lucide-react";

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
}

interface NavbarProps {
  user?: UserData | null;
  onLogout?: () => void;
  showThemeToggle?: boolean;
}

export function Navbar({ 
  user = null, 
  onLogout,
  showThemeToggle = true 
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const pathname = usePathname();

  // Navigation items
  const publicNav = [
    { name: "Accueil", href: "/" },
    { name: "Services", href: "/services" },
    { name: "À propos", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const privateNav = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Projets", href: "/projects" },
    { name: "Équipe", href: "/team" },
    { name: "Paramètres", href: "/settings" },
  ];

  const navigation = user ? privateNav : publicNav;

  // Theme toggle
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const isDarkMode = theme === "dark" || 
      (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsProfileOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <span className="text-xl font-bold">MonApp</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive(item.href) 
                  ? "text-primary" 
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          {showThemeToggle && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hidden md:flex"
            >
              {isDark ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          )}

          {/* User Actions */}
          {user ? (
            <div className="relative">
              <Button
                variant="ghost"
                className="flex items-center space-x-2"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName} 
                      className="h-6 w-6 rounded-full" 
                    />
                  ) : (
                    <span className="text-xs font-medium">
                      {user.displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block text-sm">{user.displayName}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background border rounded-md shadow-lg z-50">
                  <div className="p-3 border-b">
                    <p className="text-sm font-medium">{user.displayName}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/settings"
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-accent rounded-md"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      <span>Paramètres</span>
                    </Link>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm justify-start hover:bg-accent rounded-md"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Déconnexion</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button asChild variant="ghost">
                <Link href="/auth/signin">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/signup">S'inscrire</Link>
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block text-sm font-medium transition-colors hover:text-primary py-2 ${
                  isActive(item.href) 
                    ? "text-primary" 
                    : "text-muted-foreground"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Theme Toggle */}
            {showThemeToggle && (
              <Button
                variant="ghost"
                className="flex items-center space-x-2 w-full justify-start"
                onClick={toggleTheme}
              >
                {isDark ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                <span>Thème {isDark ? "clair" : "sombre"}</span>
              </Button>
            )}

            {/* Mobile User Actions */}
            {user ? (
              <div className="pt-3 border-t space-y-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.displayName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <Link
                  href="/settings"
                  className="block w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Paramètres
                </Link>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-accent"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Déconnexion</span>
                </Button>
              </div>
            ) : (
              <div className="pt-3 border-t space-y-2">
                <Link
                  href="/auth/signin"
                  className="block w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Se connecter
                </Link>
                <Link
                  href="/auth/signup"
                  className="block w-full px-4 py-2 text-left text-sm text-muted-foreground hover:bg-accent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Créer un compte
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}