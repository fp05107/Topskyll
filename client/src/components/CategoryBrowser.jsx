import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowLeft, Code, Database, Cloud, Palette, Megaphone, Shield } from "lucide-react";

export default function CategoryBrowser({ onCategorySelect, selectedCategory, selectedSubcategory, selectedSpecialization }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState('categories'); // 'categories', 'subcategories', 'specializations'
  const [selectedCategoryData, setSelectedCategoryData] = useState(null);
  const [selectedSubcategoryData, setSelectedSubcategoryData] = useState(null);

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

  const getCategoryIcon = (categoryName) => {
    switch (categoryName.toLowerCase()) {
      case 'software development':
        return <Code className="h-6 w-6" />;
      case 'data science & analytics':
        return <Database className="h-6 w-6" />;
      case 'devops & cloud':
        return <Cloud className="h-6 w-6" />;
      case 'design & creative':
        return <Palette className="h-6 w-6" />;
      case 'marketing & sales':
        return <Megaphone className="h-6 w-6" />;
      case 'cybersecurity':
        return <Shield className="h-6 w-6" />;
      default:
        return <Code className="h-6 w-6" />;
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategoryData(category);
    setCurrentView('subcategories');
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategoryData(subcategory);
    setCurrentView('specializations');
  };

  const handleSpecializationClick = (specialization) => {
    if (onCategorySelect) {
      onCategorySelect({
        categoryId: selectedCategoryData.id,
        categoryName: selectedCategoryData.name,
        subcategoryId: selectedSubcategoryData.id,
        subcategoryName: selectedSubcategoryData.name,
        specializationId: specialization.id,
        specializationName: specialization.name,
        skills: specialization.skills || []
      });
    }
  };

  const goBack = () => {
    if (currentView === 'specializations') {
      setCurrentView('subcategories');
      setSelectedSubcategoryData(null);
    } else if (currentView === 'subcategories') {
      setCurrentView('categories');
      setSelectedCategoryData(null);
    }
  };

  const resetSelection = () => {
    setCurrentView('categories');
    setSelectedCategoryData(null);
    setSelectedSubcategoryData(null);
    if (onCategorySelect) {
      onCategorySelect(null);
    }
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
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {currentView !== 'categories' && (
            <Button variant="ghost" size="sm" onClick={goBack} className="flex items-center space-x-1">
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
          )}
          <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
            <span 
              onClick={() => setCurrentView('categories')}
              className={`cursor-pointer ${currentView === 'categories' ? 'font-medium text-slate-900 dark:text-slate-100' : 'hover:text-slate-900 dark:hover:text-slate-100'}`}
            >
              Categories
            </span>
            {selectedCategoryData && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span 
                  onClick={() => setCurrentView('subcategories')}
                  className={`cursor-pointer ${currentView === 'subcategories' ? 'font-medium text-slate-900 dark:text-slate-100' : 'hover:text-slate-900 dark:hover:text-slate-100'}`}
                >
                  {selectedCategoryData.name}
                </span>
              </>
            )}
            {selectedSubcategoryData && (
              <>
                <ChevronRight className="h-4 w-4" />
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {selectedSubcategoryData.name}
                </span>
              </>
            )}
          </div>
        </div>
        {(selectedCategoryData || selectedSubcategoryData) && (
          <Button variant="outline" size="sm" onClick={resetSelection}>
            Clear Selection
          </Button>
        )}
      </div>

      {/* Categories View */}
      {currentView === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
              style={{ borderLeftColor: category.color }}
              onClick={() => handleCategoryClick(category)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {getCategoryIcon(category.name)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {category.subcategories?.length || 0} subcategories
                  </Badge>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Subcategories View */}
      {currentView === 'subcategories' && selectedCategoryData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {selectedCategoryData.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {selectedCategoryData.description}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedCategoryData.subcategories?.map((subcategory) => (
              <Card 
                key={subcategory.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSubcategoryClick(subcategory)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{subcategory.name}</CardTitle>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {subcategory.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">
                      {subcategory.specializations?.length || 0} specializations
                    </Badge>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Specializations View */}
      {currentView === 'specializations' && selectedSubcategoryData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {selectedSubcategoryData.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {selectedSubcategoryData.description}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {selectedSubcategoryData.specializations?.map((specialization) => (
              <Card 
                key={specialization.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleSpecializationClick(specialization)}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{specialization.name}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {specialization.skills?.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                      {specialization.skills?.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{specialization.skills.length - 4} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Click to filter jobs
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}