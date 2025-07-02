import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function CategoryBrowser({ onCategorySelect, selectedCategory, selectedSubcategory, selectedSpecialization }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/job-categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    onCategorySelect({
      categoryId: category.id,
      subcategoryId: null,
      specializationId: null
    });
  };

  const handleSubcategoryClick = (category, subcategory) => {
    onCategorySelect({
      categoryId: category.id,
      subcategoryId: subcategory.id,
      specializationId: null
    });
  };

  const handleSpecializationClick = (category, subcategory, specialization) => {
    onCategorySelect({
      categoryId: category.id,
      subcategoryId: subcategory.id,
      specializationId: specialization.id
    });
  };

  const clearFilters = () => {
    onCategorySelect({
      categoryId: null,
      subcategoryId: null,
      specializationId: null
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-500 dark:text-slate-400">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Filters */}
      {(selectedCategory || selectedSubcategory || selectedSpecialization) && (
        <Card className="p-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                Active Filters:
              </span>
              <div className="flex items-center space-x-1 text-sm text-blue-700 dark:text-blue-300">
                {selectedCategory && <span>{selectedCategory.name}</span>}
                {selectedSubcategory && (
                  <>
                    <span>›</span>
                    <span>{selectedSubcategory.name}</span>
                  </>
                )}
                {selectedSpecialization && (
                  <>
                    <span>›</span>
                    <span className="font-medium">{selectedSpecialization.name}</span>
                  </>
                )}
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearFilters}
              className="text-blue-700 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-100"
            >
              Clear All
            </Button>
          </div>
        </Card>
      )}

      {/* Categories */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="software">Software</TabsTrigger>
          <TabsTrigger value="data">Data & AI</TabsTrigger>
          <TabsTrigger value="devops">DevOps</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
          <TabsTrigger value="marketing">Marketing</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category}
                isSelected={selectedCategory?.id === category.id}
                onCategoryClick={handleCategoryClick}
                onSubcategoryClick={handleSubcategoryClick}
                onSpecializationClick={handleSpecializationClick}
                selectedSubcategory={selectedSubcategory}
                selectedSpecialization={selectedSpecialization}
              />
            ))}
          </div>
        </TabsContent>

        {categories.map((category) => (
          <TabsContent 
            key={category.slug} 
            value={category.slug.split('-')[0]} 
            className="space-y-4"
          >
            <CategoryCard 
              category={category}
              isSelected={selectedCategory?.id === category.id}
              onCategoryClick={handleCategoryClick}
              onSubcategoryClick={handleSubcategoryClick}
              onSpecializationClick={handleSpecializationClick}
              selectedSubcategory={selectedSubcategory}
              selectedSpecialization={selectedSpecialization}
              expanded={true}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function CategoryCard({ 
  category, 
  isSelected, 
  onCategoryClick, 
  onSubcategoryClick, 
  onSpecializationClick, 
  selectedSubcategory, 
  selectedSpecialization,
  expanded = false 
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  const handleCategoryClick = () => {
    onCategoryClick(category);
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className={`p-4 transition-all duration-200 ${
      isSelected 
        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' 
        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
    }`}>
      <div 
        className="cursor-pointer"
        onClick={handleCategoryClick}
      >
        <div className="flex items-center space-x-3 mb-2">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white`}
               style={{ backgroundColor: category.color }}>
            <i className={category.icon}></i>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100">
              {category.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {category.description}
            </p>
          </div>
          <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'} text-slate-400`}></i>
        </div>
      </div>

      {isExpanded && category.subcategories && (
        <div className="mt-4 space-y-3 border-t pt-4">
          {category.subcategories.map((subcategory) => (
            <div key={subcategory.id}>
              <div 
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  selectedSubcategory?.id === subcategory.id
                    ? 'bg-blue-100 dark:bg-blue-800/30'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                onClick={() => onSubcategoryClick(category, subcategory)}
              >
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">
                    {subcategory.name}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {subcategory.description}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {subcategory.specializations?.length || 0} specs
                </Badge>
              </div>

              {selectedSubcategory?.id === subcategory.id && subcategory.specializations && (
                <div className="mt-2 ml-4 space-y-1">
                  {subcategory.specializations.map((specialization) => (
                    <div 
                      key={specialization.id}
                      className={`flex items-center justify-between p-2 rounded cursor-pointer transition-colors ${
                        selectedSpecialization?.id === specialization.id
                          ? 'bg-blue-200 dark:bg-blue-700/40'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                      onClick={() => onSpecializationClick(category, subcategory, specialization)}
                    >
                      <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {specialization.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {specialization.skills?.slice(0, 3).map((skill, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {specialization.skills?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{specialization.skills.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}