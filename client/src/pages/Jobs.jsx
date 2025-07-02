import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["/api/jobs"],
    queryFn: () => fetch("/api/jobs").then(res => res.json())
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/talent-categories"],
    queryFn: () => fetch("/api/talent-categories").then(res => res.json())
  });

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchQuery === "" || 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (job.company?.name && job.company.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "" || job.categoryId.toString() === selectedCategory;
    const matchesType = selectedType === "" || job.jobType === selectedType;
    
    return matchesSearch && matchesCategory && matchesType;
  });

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];

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
              <span>{filteredJobs.length} active jobs</span>
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

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search jobs by title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Button className="px-6">
              Search Jobs
            </Button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-foreground"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-foreground"
            >
              <option value="">All Types</option>
              {jobTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            {(selectedCategory || selectedType || searchQuery) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedCategory("");
                  setSelectedType("");
                  setSearchQuery("");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
          
          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mt-4">
            {searchQuery && (
              <Badge variant="secondary">
                Search: {searchQuery}
                <button 
                  onClick={() => setSearchQuery("")}
                  className="ml-2 text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedCategory && (
              <Badge variant="secondary">
                Category: {categories.find(c => c.id.toString() === selectedCategory)?.name}
                <button 
                  onClick={() => setSelectedCategory("")}
                  className="ml-2 text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
            {selectedType && (
              <Badge variant="secondary">
                Type: {selectedType}
                <button 
                  onClick={() => setSelectedType("")}
                  className="ml-2 text-xs"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>

        {/* Jobs Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading jobs...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-search text-3xl text-slate-400"></i>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
              No jobs found
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Try adjusting your search criteria or browse all available positions.
            </p>
            <Button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedType("");
              }}
            >
              View All Jobs
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}