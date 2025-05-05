
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Moon, Sun, Menu, X, User } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm z-20 relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-teal-600 bg-clip-text text-transparent">
              Mentora
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400">
                  Dashboard
                </Link>
                <Link to="/mood" className="text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400">
                  Mood Tracker
                </Link>
                <Link to="/journal" className="text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400">
                  Journal
                </Link>
                <Link to="/therapy" className="text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400">
                  Therapy
                </Link>
              </>
            ) : (
              <>
                <Link to="/about" className="text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400">
                  About
                </Link>
                <Link to="/features" className="text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400">
                  Features
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {user ? (
              <div className="hidden md:flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  className="flex items-center space-x-2"
                  onClick={handleLogout}
                >
                  <span>Logout</span>
                </Button>
                <Button className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90">
                  <User className="mr-2 h-4 w-4" />
                  <span>{user.username}</span>
                </Button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 py-4 shadow-lg absolute top-full left-0 right-0 z-50 animate-fade-in">
          <div className="container mx-auto px-4 space-y-3">
            <Link
              to="/"
              className="block py-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="block py-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/mood"
                  className="block py-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  Mood Tracker
                </Link>
                <Link
                  to="/journal"
                  className="block py-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  Journal
                </Link>
                <Link
                  to="/therapy"
                  className="block py-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  Therapy
                </Link>
                <button
                  className="block w-full text-left py-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/about"
                  className="block py-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/features"
                  className="block py-2 text-gray-600 hover:text-cyan-500 dark:text-gray-300 dark:hover:text-cyan-400"
                  onClick={() => setIsOpen(false)}
                >
                  Features
                </Link>
                <div className="pt-2 space-y-2">
                  <Link to="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-cyan-400 to-cyan-500 hover:opacity-90">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
