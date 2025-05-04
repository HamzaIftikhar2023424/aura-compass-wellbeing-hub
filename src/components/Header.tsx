
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? "bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-lg" 
        : "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
    } border-b border-gray-200 dark:border-gray-800`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="overflow-hidden rounded-full transition-all duration-300 group-hover:shadow-lg">
            <img 
              src="/lovable-uploads/eba74012-7138-42ae-9d9a-0888bacd2d4f.png" 
              alt="Mentora Logo" 
              className="h-10 w-10 rounded-full transition-transform duration-500 group-hover:scale-110" 
            />
          </div>
          <span className="font-bold text-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-orange-400 bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-110 dark:text-white">
            Mentora
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {[
            { path: "/", label: "Home" },
            { path: "/conditions", label: "Conditions" },
            { path: "/assessment", label: "Assessment" },
            { path: "/therapy", label: "Therapy" },
            { path: "/community", label: "Community" },
          ].map(({ path, label }) => (
            <Link 
              key={path}
              to={path} 
              className={`relative text-mentora-text hover:text-cyan-500 dark:text-white dark:font-bold transition-colors after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-cyan-500 after:transition-transform hover:after:scale-x-100 ${
                location.pathname === path ? "text-cyan-500 after:scale-x-100" : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? 
              <Moon className="h-5 w-5 transition-transform hover:rotate-12" /> : 
              <Sun className="h-5 w-5 transition-transform hover:rotate-90" />}
          </Button>
          <Link to="/login">
            <Button variant="ghost" className="hover:text-cyan-500 transition-all">Login</Button>
          </Link>
          <Link to="/register" className="animate-fade-in">
            <Button className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:opacity-90 text-white shadow-md hover:shadow-lg transition-all">
              Register
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="rounded-full"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? 
              <X className="h-6 w-6 transition-transform rotate-90 duration-300" /> : 
              <Menu className="h-6 w-6 transition-transform duration-300" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] inset-x-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-fade-in shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {[
              { path: "/", label: "Home" },
              { path: "/conditions", label: "Conditions" },
              { path: "/assessment", label: "Assessment" },
              { path: "/therapy", label: "Therapy" },
              { path: "/community", label: "Community" },
            ].map(({ path, label }, index) => (
              <Link 
                key={path}
                to={path} 
                className={`py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md dark:text-white transition-colors animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full animate-fade-in" style={{ animationDelay: '250ms' }}>Login</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-400 text-white animate-fade-in" style={{ animationDelay: '300ms' }}>Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
