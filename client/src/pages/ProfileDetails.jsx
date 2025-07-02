import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Star, 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  ExternalLink,
  Award,
  BookOpen,
  Users,
  TrendingUp,
  MessageCircle,
  Heart,
  Share2,
  Globe,
  Mail,
  Phone,
  LinkedinIcon,
  GithubIcon
} from 'lucide-react';

export default function ProfileDetails() {
  const { id } = useParams();

  const { data: talent, isLoading, error } = useQuery({
    queryKey: [`/api/talents/${id}`],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-lg h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !talent) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Profile Not Found
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                The talent profile you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/directory">
                <Button>Browse All Talents</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Image & Basic Info */}
            <div className="flex-shrink-0">
              <div className="relative">
                <img
                  src={talent.avatar}
                  alt={talent.name}
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-white dark:border-slate-700 shadow-lg"
                />
                {talent.isTopTalent && (
                  <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                    <Star className="h-5 w-5 text-white fill-current" />
                  </div>
                )}
              </div>
            </div>

            {/* Main Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
                    {talent.name}
                  </h1>
                  <p className="text-xl text-slate-600 dark:text-slate-400 mt-2">
                    {talent.title}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {talent.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {talent.timezone}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        Member since {talent.toptalMemberSince}
                      </span>
                    </div>
                  </div>

                  {/* Verification Badge */}
                  <div className="mt-4">
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Award className="h-3 w-3 mr-1" />
                      {talent.verificationLevel}
                    </Badge>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Contact {talent.name.split(' ')[0]}
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {talent.rating}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    {talent.totalReviews} reviews
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-green-500" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      ${talent.hourlyRate}/hr
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Hourly rate
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {talent.completedProjects}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Projects completed
                  </p>
                </div>
                
                <div className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span className="font-semibold text-slate-900 dark:text-slate-100">
                      {talent.clientRetentionRate}%
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    Client retention
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* About */}
                <Card>
                  <CardHeader>
                    <CardTitle>About {talent.name.split(' ')[0]}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {talent.description}
                    </p>
                  </CardContent>
                </Card>

                {/* Skills */}
                <Card>
                  <CardHeader>
                    <CardTitle>Skills & Expertise</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {talent.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {talent.categories.map((category) => (
                        <Badge key={category} className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="portfolio" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Portfolio & Work Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                      Portfolio showcasing {talent.name.split(' ')[0]}'s best work and projects.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="bg-slate-100 dark:bg-slate-700 rounded-lg h-32 mb-3 flex items-center justify-center">
                            <BookOpen className="h-8 w-8 text-slate-400" />
                          </div>
                          <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                            Project {item}
                          </h4>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            Brief description of the project and technologies used.
                          </p>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3 mr-1" />
                            View Project
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Client Reviews ({talent.totalReviews})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-slate-200 dark:border-slate-700 pb-6 last:border-b-0">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-slate-500" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-medium text-slate-900 dark:text-slate-100">
                                Client {review}
                              </span>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                ))}
                              </div>
                            </div>
                            <p className="text-slate-700 dark:text-slate-300 mb-2">
                              "Excellent work! {talent.name.split(' ')[0]} delivered exactly what we needed and exceeded our expectations. Professional, timely, and skilled."
                            </p>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                              2 months ago
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability & Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          Current Status:
                        </span>
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          {talent.availability}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          Response Time:
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          {talent.responseTime}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          Languages:
                        </span>
                        <span className="text-slate-600 dark:text-slate-400">
                          {talent.languages.join(', ')}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Start Conversation
                </Button>
                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Call
                </Button>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        {talent.timezone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Available via Topskyll
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Key Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Experience:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {talent.experience}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Projects:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {talent.completedProjects}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Success Rate:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {talent.clientRetentionRate}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Rating:</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-medium text-slate-900 dark:text-slate-100">
                      {talent.rating}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Similar Talents */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Talents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  Other top talents in similar categories
                </p>
                <Button variant="outline" className="w-full">
                  View Similar Profiles
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}