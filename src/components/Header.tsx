
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/eba74012-7138-42ae-9d9a-0888bacd2d4f.png" 
            alt="Mentora Logo" 
            className="h-10 w-10 rounded-full" 
          />
          <span className="font-bold text-2xl bg-gradient-to-r from-cyan-500 via-teal-400 to-orange-400 bg-clip-text text-transparent dark:text-white">
            Mentora
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-mentora-text hover:text-cyan-500 transition-colors dark:text-white dark:font-bold">Home</Link>
          <Link to="/conditions" className="text-mentora-text hover:text-cyan-500 transition-colors dark:text-white dark:font-bold">Conditions</Link>
          <Link to="/assessment" className="text-mentora-text hover:text-cyan-500 transition-colors dark:text-white dark:font-bold">Assessment</Link>
          <Link to="/therapy" className="text-mentora-text hover:text-cyan-500 transition-colors dark:text-white dark:font-bold">Therapy</Link>
          <Link to="/community" className="text-mentora-text hover:text-cyan-500 transition-colors dark:text-white dark:font-bold">Community</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Link to="/login">
            <Button variant="ghost" className="hover:text-cyan-500">Login</Button>
          </Link>
          <Link to="/register">
            <Button className="bg-gradient-to-r from-cyan-500 to-teal-400 hover:opacity-90 text-white">
              Register
            </Button>
          </Link>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-[72px] inset-x-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link to="/" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md dark:text-white" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/conditions" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md dark:text-white" onClick={() => setIsMenuOpen(false)}>Conditions</Link>
            <Link to="/assessment" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md dark:text-white" onClick={() => setIsMenuOpen(false)}>Assessment</Link>
            <Link to="/therapy" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md dark:text-white" onClick={() => setIsMenuOpen(false)}>Therapy</Link>
            <Link to="/community" className="py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md dark:text-white" onClick={() => setIsMenuOpen(false)}>Community</Link>
            <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-teal-400 text-white">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
