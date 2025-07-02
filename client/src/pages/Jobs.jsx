import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import JobCard from "@/components/JobCard";
import CategoryBrowser from "@/components/CategoryBrowser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    categoryId: null,
    subcategoryId: null,
    specializationId: null
  });
  const [selectedType, setSelectedType] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");

  // Fetch job categories for reference
  const { data: jobCategories = [] } = useQuery({
    queryKey: ["/api/job-categories"],
    queryFn: () => fetch("/api/job-categories").then(res => res.json())
  });

  // Build query params for filtering
  const buildJobsQuery = () => {
    const params = new URLSearchParams();
    if (selectedFilters.categoryId) params.append('categoryId', selectedFilters.categoryId);
    if (selectedFilters.subcategoryId) params.append('subcategoryId', selectedFilters.subcategoryId);
    if (selectedFilters.specializationId) params.append('specializationId', selectedFilters.specializationId);
    if (selectedType) params.append('jobType', selectedType);
    if (selectedExperience) params.append('experienceLevel', selectedExperience);
    if (searchQuery) params.append('search', searchQuery);
    
    return params.toString() ? `?${params.toString()}` : '';
  };

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["/api/jobs", selectedFilters, selectedType, selectedExperience, searchQuery],
    queryFn: () => fetch(`/api/jobs${buildJobsQuery()}`).then(res => res.json())
  });

  // Get selected category objects for display
  const getSelectedCategoryObjects = () => {
    if (!jobCategories.length || !selectedFilters.categoryId) return {};
    
    const category = jobCategories.find(cat => cat.id === selectedFilters.categoryId);
    if (!category) return {};
    
    const result = { selectedCategory: category };
    
    if (selectedFilters.subcategoryId && category.subcategories) {
      const subcategory = category.subcategories.find(sub => sub.id === selectedFilters.subcategoryId);
      if (subcategory) {
        result.selectedSubcategory = subcategory;
        
        if (selectedFilters.specializationId && subcategory.specializations) {
          const specialization = subcategory.specializations.find(spec => spec.id === selectedFilters.specializationId);
          if (specialization) result.selectedSpecialization = specialization;
        }
      }
    }
    
    return result;
  };

  const { selectedCategory, selectedSubcategory, selectedSpecialization } = getSelectedCategoryObjects();

  const handleCategorySelect = (filters) => {
    setSelectedFilters(filters);
  };

  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Lead", "Principal"];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Browse Jobs by Category
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-6">
            Explore our hierarchical job categories and find opportunities that match your expertise
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
          
          {/* Additional Filters */}
          <div className="flex flex-wrap gap-2">
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

            <select
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background text-foreground"
            >
              <option value="">All Experience Levels</option>
              {experienceLevels.map(level => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            {(selectedType || selectedExperience || searchQuery || selectedFilters.categoryId) && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  setSelectedFilters({ categoryId: null, subcategoryId: null, specializationId: null });
                  setSelectedType("");
                  setSelectedExperience("");
                  setSearchQuery("");
                }}
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="browse" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Categories</TabsTrigger>
            <TabsTrigger value="results">Job Results</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-6">
            <CategoryBrowser 
              onCategorySelect={handleCategorySelect}
              selectedCategory={selectedCategory}
              selectedSubcategory={selectedSubcategory}
              selectedSpecialization={selectedSpecialization}
            />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-slate-600 dark:text-slate-400">Loading jobs...</p>
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                {jobs.map((job) => (
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
                  Try adjusting your search criteria or browse categories to find available positions.
                </p>
                <Button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedFilters({ categoryId: null, subcategoryId: null, specializationId: null });
                    setSelectedType("");
                    setSelectedExperience("");
                  }}
                >
                  View All Jobs
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}