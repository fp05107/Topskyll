import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useTheme } from "./ThemeProvider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glassmorphism">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center">
              <i className="fas fa-rocket text-white text-lg"></i>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Topskyll
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/jobs" className={`transition-colors ${location === '/jobs' ? 'text-primary' : 'text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary'}`}>
              Jobs
            </Link>
            <Link href="#companies" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
              Companies
            </Link>
            <Link href="#resources" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
              Resources
            </Link>
            <Link href="#about" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
              About
            </Link>
          </div>
          
          {/* Search Bar */}
          <div className="hidden lg:flex items-center bg-white dark:bg-slate-800 rounded-full px-4 py-2 shadow-sm border border-slate-200 dark:border-slate-700 w-80">
            <i className="fas fa-search text-slate-400 mr-3"></i>
            <Input 
              type="text" 
              placeholder="Search jobs, skills, companies..." 
              className="bg-transparent border-none outline-none shadow-none focus-visible:ring-0 text-slate-700 dark:text-slate-300 placeholder-slate-400"
            />
          </div>
          
          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              {theme === "dark" ? (
                <i className="fas fa-sun text-yellow-400"></i>
              ) : (
                <i className="fas fa-moon text-slate-600"></i>
              )}
            </Button>
            
            {/* Auth Buttons */}
            <Link href="/login">
              <Button variant="ghost" className="px-4 py-2 text-primary hover:text-primary/80 transition-colors">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="px-6 py-2 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                Sign Up
              </Button>
            </Link>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden p-2 text-slate-600 dark:text-slate-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <i className="fas fa-bars"></i>
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex flex-col space-y-4">
              <Link href="/jobs" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                Jobs
              </Link>
              <Link href="#companies" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                Companies
              </Link>
              <Link href="#resources" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                Resources
              </Link>
              <Link href="#about" className="text-slate-700 dark:text-slate-300 hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
