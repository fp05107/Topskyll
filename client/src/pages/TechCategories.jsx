import { useState } from "react";
import CategoryBrowser from "@/components/CategoryBrowser";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

export default function TechCategories() {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleCategorySelect = (filterData) => {
    setSelectedFilter(filterData);
  };

  const viewJobs = () => {
    if (selectedFilter) {
      // Navigate to jobs page with filters
      const params = new URLSearchParams();
      if (selectedFilter.categoryId) params.set('categoryId', selectedFilter.categoryId);
      if (selectedFilter.subcategoryId) params.set('subcategoryId', selectedFilter.subcategoryId);
      if (selectedFilter.specializationId) params.set('specializationId', selectedFilter.specializationId);
      
      window.location.href = `/jobs?${params.toString()}`;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Tech Categories
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Browse through our comprehensive tech categories. Navigate from broad categories to specific specializations 
            to find exactly what you need: Category → Subcategory → Specialization
          </p>
        </div>

        {/* Selection Summary */}
        {selectedFilter && (
          <div className="mb-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Selected Specialization
                </h3>
                <div className="flex items-center space-x-2 text-blue-700 dark:text-blue-300">
                  <Badge variant="outline" className="bg-white dark:bg-slate-800">
                    {selectedFilter.categoryName}
                  </Badge>
                  <ArrowRight className="h-4 w-4" />
                  <Badge variant="outline" className="bg-white dark:bg-slate-800">
                    {selectedFilter.subcategoryName}
                  </Badge>
                  <ArrowRight className="h-4 w-4" />
                  <Badge variant="default" className="bg-blue-600 text-white">
                    {selectedFilter.specializationName}
                  </Badge>
                </div>
                {selectedFilter.skills && selectedFilter.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    <span className="text-sm text-blue-700 dark:text-blue-300 mr-2">Required Skills:</span>
                    {selectedFilter.skills.slice(0, 6).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {selectedFilter.skills.length > 6 && (
                      <Badge variant="secondary" className="text-xs">
                        +{selectedFilter.skills.length - 6} more
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              <Button onClick={viewJobs} className="bg-blue-600 hover:bg-blue-700">
                View Jobs
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Category Browser */}
        <CategoryBrowser onCategorySelect={handleCategorySelect} />

        {/* Help Section */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm border">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              How to Use Tech Categories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">1</span>
                </div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Select Category</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Start by choosing a broad tech category like Software Development or Data Science.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">2</span>
                </div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Choose Subcategory</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Narrow down to specific areas like Frontend Development or Machine Learning.
                </p>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">3</span>
                </div>
                <h4 className="font-medium text-slate-900 dark:text-slate-100">Pick Specialization</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Find your exact specialization like React Developer or Angular Developer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}