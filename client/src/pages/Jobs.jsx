import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { JobCard } from "@/components/JobCard.jsx";
import { EXPERIENCE_LEVELS, JOB_TYPES, SALARY_RANGES } from "@/lib/constants";

export default function Jobs() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "all",
    experienceLevel: "all",
    jobType: "all",
    salaryRange: "all",
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['/api/job-categories'],
  });

  // Popular categories for tabs
  const popularCategories = [
    { id: "all", name: "All Jobs", icon: "fas fa-briefcase", count: 0 },
    { id: "frontend", name: "Frontend", icon: "fab fa-react", slug: "frontend-development" },
    { id: "backend", name: "Backend", icon: "fas fa-server", slug: "backend-development" },
    { id: "fullstack", name: "Full Stack", icon: "fas fa-layer-group", slug: "full-stack-development" },
    { id: "ai-ml", name: "AI/ML", icon: "fas fa-brain", slug: "ai-ml" },
    { id: "cloud", name: "Cloud", icon: "fas fa-cloud", slug: "cloud-computing" },
    { id: "mobile", name: "Mobile", icon: "fas fa-mobile-alt", slug: "mobile-app-development" },
  ];

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['/api/jobs', { ...filters, activeTab }],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      
      // Handle tab-based category filtering
      if (activeTab !== 'all') {
        const selectedCategory = popularCategories.find(cat => cat.id === activeTab);
        if (selectedCategory?.slug) {
          params.append('categorySlug', selectedCategory.slug);
        }
      } else if (filters.categoryId && filters.categoryId !== 'all') {
        params.append('categoryId', filters.categoryId);
      }
      
      if (filters.experienceLevel && filters.experienceLevel !== 'all') params.append('experienceLevel', filters.experienceLevel);
      if (filters.jobType && filters.jobType !== 'all') params.append('jobType', filters.jobType);
      
      if (filters.salaryRange && filters.salaryRange !== 'all') {
        const [min, max] = filters.salaryRange.split('-');
        if (min) params.append('salaryMin', min);
        if (max && max !== 'undefined') params.append('salaryMax', max);
      }

      const response = await fetch(`/api/jobs?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return response.json();
    },
  });

  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    // Reset category dropdown when switching tabs
    if (tabValue !== 'all') {
      setFilters(prev => ({ ...prev, categoryId: 'all' }));
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      categoryId: "all",
      experienceLevel: "all",
      jobType: "all",
      salaryRange: "all",
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Find Your Perfect Remote Job
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            Browse through thousands of remote tech opportunities from top companies worldwide
          </p>
          
          {/* Job Stats */}
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{jobs.length} active jobs</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Updated today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Remote-first companies</span>
            </div>
          </div>
        </div>

        {/* Popular Categories Tabs */}
        <div className="mb-8">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid grid-cols-7 w-full max-w-4xl mx-auto bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              {popularCategories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center space-y-1 py-3 px-2 rounded-xl data-[state=active]:bg-white data-[state=active]:dark:bg-slate-700 data-[state=active]:shadow-sm transition-all duration-200"
                >
                  <i className={`${category.icon} text-lg`}></i>
                  <span className="text-xs font-medium">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Enhanced Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-slate-200 dark:border-slate-700 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i className="fas fa-search text-slate-400"></i>
              </div>
              <Input
                placeholder="Search jobs, companies, skills, locations..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-12 pr-4 py-4 text-lg rounded-2xl border-slate-300 dark:border-slate-600 focus:border-primary focus:ring-primary"
              />
              {filters.search && (
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <i className="fas fa-times text-slate-400 hover:text-slate-600"></i>
                </button>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Category Filter - Only show when "All Jobs" tab is active */}
            {activeTab === 'all' && (
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Category
                </label>
                <Select value={filters.categoryId} onValueChange={(value) => handleFilterChange('categoryId', value)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Experience Level Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Experience Level
              </label>
              <Select value={filters.experienceLevel} onValueChange={(value) => handleFilterChange('experienceLevel', value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Job Type Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Job Type
              </label>
              <Select value={filters.jobType} onValueChange={(value) => handleFilterChange('jobType', value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {JOB_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Salary Range Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Salary Range
              </label>
              <Select value={filters.salaryRange} onValueChange={(value) => handleFilterChange('salaryRange', value)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="All Salaries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Salaries</SelectItem>
                  {SALARY_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.search || 
            filters.categoryId !== 'all' || 
            filters.experienceLevel !== 'all' || 
            filters.jobType !== 'all' || 
            filters.salaryRange !== 'all' ||
            activeTab !== 'all') && (
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Active filters:</span>
                  
                  {activeTab !== 'all' && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      <i className={`${popularCategories.find(cat => cat.id === activeTab)?.icon} mr-1`}></i>
                      {popularCategories.find(cat => cat.id === activeTab)?.name}
                    </Badge>
                  )}
                  
                  {filters.search && (
                    <Badge variant="secondary">
                      Search: "{filters.search}"
                    </Badge>
                  )}
                  
                  {filters.experienceLevel !== 'all' && (
                    <Badge variant="secondary">
                      {EXPERIENCE_LEVELS.find(level => level.value === filters.experienceLevel)?.label}
                    </Badge>
                  )}
                  
                  {filters.jobType !== 'all' && (
                    <Badge variant="secondary">
                      {JOB_TYPES.find(type => type.value === filters.jobType)?.label}
                    </Badge>
                  )}
                  
                  {filters.salaryRange !== 'all' && (
                    <Badge variant="secondary">
                      {SALARY_RANGES.find(range => range.value === filters.salaryRange)?.label}
                    </Badge>
                  )}
                </div>
                
                <Button variant="outline" onClick={clearFilters} size="sm" className="rounded-xl">
                  <i className="fas fa-times mr-2"></i>
                  Clear All
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              {isLoading ? "Loading jobs..." : `${jobs.length} Jobs Found`}
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Showing the latest remote opportunities
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600 dark:text-slate-400">Sort by:</span>
            <Select defaultValue="newest">
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                <SelectItem value="relevance">Relevance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Job Listings */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/3"></div>
                  <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-search text-3xl text-slate-400"></i>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              No jobs found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Try adjusting your filters or search terms to find more opportunities.
            </p>
            <Button onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}

        {/* Load More */}
        {jobs.length > 0 && jobs.length % 10 === 0 && (
          <div className="text-center mt-12">
            <Button className="px-8 py-3">
              Load More Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}