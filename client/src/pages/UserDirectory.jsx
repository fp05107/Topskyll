import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, Link } from 'wouter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, MapPin, Clock, User, Filter, Search } from 'lucide-react';

export default function UserDirectory() {
  const [location, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  // Extract category from URL params
  const urlParams = new URLSearchParams(window.location.search);
  const categoryFromUrl = urlParams.get('category') || '';
  const subcategoryFromUrl = urlParams.get('subcategory') || '';
  
  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }
  }, [categoryFromUrl]);

  const { data: talents = [], isLoading } = useQuery({
    queryKey: ['/api/talents', { 
      category: selectedCategory, 
      search: searchTerm,
      experience: selectedExperience,
      location: selectedLocation
    }],
    enabled: true
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['/api/talent-categories']
  });

  const experienceLevels = ['Junior', 'Mid-Level', 'Senior', 'Expert'];
  const locations = ['India', 'United States', 'United Kingdom', 'Canada', 'Germany', 'Remote'];

  const filteredTalents = talents.filter(talent => {
    const matchesSearch = !searchTerm || 
      talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !selectedCategory || 
      talent.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchesExperience = !selectedExperience || 
      talent.experienceLevel === selectedExperience;

    const matchesLocation = !selectedLocation || 
      (selectedLocation === 'Remote' ? talent.isRemote : talent.location.includes(selectedLocation));

    return matchesSearch && matchesCategory && matchesExperience && matchesLocation;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-lg h-64 animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                {categoryFromUrl ? `${categoryFromUrl} Professionals` : 'Top 3% Talent Directory'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                {filteredTalents.length} verified experts available for hire
              </p>
            </div>
            
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search talents by name, skills, or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Experience Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Experience Level
                  </label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  >
                    <option value="">All Levels</option>
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-2 border rounded-md bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                    setSelectedExperience('');
                    setSelectedLocation('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Talents Grid */}
          <div className="flex-1">
            {filteredTalents.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    No talents found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Try adjusting your search criteria or filters.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTalents.map((talent) => (
                  <TalentCard key={talent.id} talent={talent} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TalentCard({ talent }) {
  return (
    <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
      <Link href={`/profile/${talent.id}`}>
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <img
                src={talent.avatar}
                alt={talent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              {talent.isTopTalent && (
                <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
                  <Star className="h-3 w-3 text-white fill-current" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                {talent.name}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 truncate">
                {talent.title}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3 text-slate-400" />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {talent.location}
                </span>
              </div>
            </div>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm font-medium text-slate-900 dark:text-slate-100 ml-1">
                {talent.rating}
              </span>
            </div>
            <span className="text-sm text-slate-500 dark:text-slate-400">
              ({talent.totalReviews} reviews)
            </span>
          </div>

          {/* Verification Badge */}
          <div className="mb-3">
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              {talent.verificationLevel}
            </Badge>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {talent.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {talent.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{talent.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Hourly Rate:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                ${talent.hourlyRate}/{talent.currency}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Experience:</span>
              <span className="font-medium text-slate-900 dark:text-slate-100">
                {talent.experience}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Availability:</span>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-green-500" />
                <span className="text-green-600 dark:text-green-400 text-xs font-medium">
                  {talent.availability}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}