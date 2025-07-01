import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CategoryCard } from "@/components/CategoryCard";
import { JobCard } from "@/components/JobCard";
import type { JobCategory, Job } from "@shared/schema";

export default function Home() {
  const { data: categories = [] } = useQuery<JobCategory[]>({
    queryKey: ['/api/job-categories'],
  });

  const { data: featuredJobs = [] } = useQuery<Job[]>({
    queryKey: ['/api/jobs'],
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block animate-float mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-primary via-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-globe-asia text-white text-2xl"></i>
              </div>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-primary to-purple-600 dark:from-slate-100 dark:via-primary dark:to-purple-400 bg-clip-text text-transparent">
                Remote Tech Jobs
              </span>
              <br />
              <span className="text-slate-700 dark:text-slate-300">Made for India</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8 leading-relaxed">
              Discover amazing remote opportunities across 20+ tech specializations. From AI/ML to Cloud Computing, 
              find your dream job with global companies while staying in India.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/jobs">
                <Button className="px-8 py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full font-semibold text-lg hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <i className="fas fa-search mr-2"></i>
                  Find Jobs Now
                </Button>
              </Link>
              <Button variant="outline" className="px-8 py-4 border-2 border-primary text-primary rounded-full font-semibold text-lg hover:bg-primary/10 transition-all duration-300">
                <i className="fas fa-play mr-2"></i>
                Watch Demo
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
                <div className="text-slate-600 dark:text-slate-400">Active Jobs</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
                <div className="text-slate-600 dark:text-slate-400">Partner Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">95%</div>
                <div className="text-slate-600 dark:text-slate-400">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Explore Tech Specializations
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Browse opportunities across cutting-edge technologies and find your perfect match
            </p>
          </div>
          
          {/* Categories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                jobCount={Math.floor(Math.random() * 1000) + 100} 
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/jobs">
              <Button variant="outline" className="px-8 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary/10 transition-all duration-300">
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Featured Remote Jobs
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                Hand-picked opportunities from top companies
              </p>
            </div>
            <Link href="/jobs">
              <Button className="px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors">
                View All Jobs
              </Button>
            </Link>
          </div>
          
          {/* Job Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredJobs.slice(0, 4).map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Land Your Dream Remote Job?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of professionals who've found amazing remote opportunities through Topskyll. 
            Create your profile and start applying today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button className="px-8 py-4 bg-white text-primary rounded-full font-semibold text-lg hover:bg-slate-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <i className="fas fa-user-plus mr-2"></i>
                Create Free Profile
              </Button>
            </Link>
            <Link href="/jobs">
              <Button variant="outline" className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-primary transition-all duration-300">
                <i className="fas fa-briefcase mr-2"></i>
                Browse All Jobs
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute top-20 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '-2s'}}></div>
        <div className="absolute bottom-10 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '-4s'}}></div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-rocket text-white text-lg"></i>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                  Topskyll
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Connecting talented professionals in India with amazing remote opportunities worldwide. 
                Your gateway to global tech careers.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/jobs" className="hover:text-primary transition-colors">Browse Jobs</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Companies</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Job Categories</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Salary Guide</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Career Resources</a></li>
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-slate-400 mb-4 md:mb-0">
              © 2024 Topskyll. All rights reserved. Made with ❤️ in India
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <span className="text-slate-400">🇮🇳 Remote Jobs for India</span>
              <span className="text-slate-400">🌐 Global Opportunities</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
