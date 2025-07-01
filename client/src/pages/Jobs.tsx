import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobCard } from "@/components/JobCard";
import { EXPERIENCE_LEVELS, JOB_TYPES, SALARY_RANGES } from "@/lib/constants";
import type { Job, JobCategory } from "@shared/schema";

export default function Jobs() {
  const [filters, setFilters] = useState({
    search: "",
    categoryId: "",
    experienceLevel: "",
    jobType: "",
    salaryRange: "",
  });

  const { data: categories = [] } = useQuery<JobCategory[]>({
    queryKey: ['/api/job-categories'],
  });

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: ['/api/jobs', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters.search) params.append('search', filters.search);
      if (filters.categoryId) params.append('categoryId', filters.categoryId);
      if (filters.experienceLevel) params.append('experienceLevel', filters.experienceLevel);
      if (filters.jobType) params.append('jobType', filters.jobType);
      
      if (filters.salaryRange) {
        const [min, max] = filters.salaryRange.split('-');
        if (min) params.append('salaryMin', min);
        if (max && max !== 'undefined') params.append('salaryMax', max);
      }

      const response = await fetch(`/api/jobs?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch jobs');
      return response.json();
    },
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      categoryId: "",
      experienceLevel: "",
      jobType: "",
      salaryRange: "",
    });
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Find Your Perfect Remote Job
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Browse through thousands of remote tech opportunities from top companies worldwide
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <Input
                placeholder="Search jobs, companies, skills..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full"
              />
            </div>

            {/* Category Filter */}
            <div>
              <Select value={filters.categoryId} onValueChange={(value) => handleFilterChange('categoryId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Experience Level Filter */}
            <div>
              <Select value={filters.experienceLevel} onValueChange={(value) => handleFilterChange('experienceLevel', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Levels</SelectItem>
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
              <Select value={filters.jobType} onValueChange={(value) => handleFilterChange('jobType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Types</SelectItem>
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
              <Select value={filters.salaryRange} onValueChange={(value) => handleFilterChange('salaryRange', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Salary" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Salaries</SelectItem>
                  {SALARY_RANGES.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Clear Filters */}
          {Object.values(filters).some(Boolean) && (
            <div className="mt-4 flex justify-end">
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
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
