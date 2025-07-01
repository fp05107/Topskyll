import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="text-center">
        <div className="w-32 h-32 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <i className="fas fa-question text-white text-4xl"></i>
        </div>
        
        <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button className="px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all duration-300">
              <i className="fas fa-home mr-2"></i>
              Go Home
            </Button>
          </Link>
          <Link href="/jobs">
            <Button variant="outline" className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all duration-300">
              <i className="fas fa-search mr-2"></i>
              Browse Jobs
            </Button>
          </Link>
        </div>
        
        <div className="mt-12">
          <p className="text-slate-500 dark:text-slate-400 mb-4">
            Looking for something specific?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
            <Link href="/jobs" className="text-primary hover:underline">All Jobs</Link>
            <Link href="/companies" className="text-primary hover:underline">Companies</Link>
            <Link href="/resources" className="text-primary hover:underline">Resources</Link>
            <Link href="/about" className="text-primary hover:underline">About Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}