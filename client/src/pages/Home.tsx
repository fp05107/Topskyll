import { useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Star, 
  MapPin, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Code, 
  Palette, 
  TrendingUp, 
  Users, 
  Package, 
  Megaphone,
  Globe,
  Zap,
  Shield
} from "lucide-react";

const talentCategories = [
  { 
    slug: "developers", 
    name: "Software Developers", 
    icon: Code, 
    color: "#3B82F6",
    description: "Seasoned software engineers, coders, and architects with expertise across hundreds of technologies.",
    averageRate: "$75-120/hr",
    totalTalents: "12,547+"
  },
  { 
    slug: "designers", 
    name: "Designers", 
    icon: Palette, 
    color: "#8B5CF6",
    description: "Expert UI, UX, Visual, and Interaction designers as well as illustrators and animators.",
    averageRate: "$65-100/hr",
    totalTalents: "8,934+"
  },
  { 
    slug: "management-consultants", 
    name: "Finance Experts", 
    icon: TrendingUp, 
    color: "#059669",
    description: "Finance experts, business strategists, M&A consultants, and financial modelers.",
    averageRate: "$95-150/hr",
    totalTalents: "3,421+"
  },
  { 
    slug: "project-managers", 
    name: "Project Managers", 
    icon: Users, 
    color: "#DC2626",
    description: "Digital and technical project managers, scrum masters with expertise in PM tools.",
    averageRate: "$70-110/hr",
    totalTalents: "5,632+"
  },
  { 
    slug: "product-managers", 
    name: "Product Managers", 
    icon: Package, 
    color: "#F59E0B",
    description: "Digital product managers and scrum product owners across multiple industries.",
    averageRate: "$85-130/hr",
    totalTalents: "4,127+"
  },
  { 
    slug: "marketing", 
    name: "Marketing Experts", 
    icon: Megaphone, 
    color: "#EC4899",
    description: "Experts in digital marketing, growth marketing, content creation, and brand strategy.",
    averageRate: "$60-95/hr",
    totalTalents: "6,891+"
  }
];

const featuredTalents = [
  {
    id: 1,
    name: "Sarah Chen",
    title: "Senior Full-Stack Developer",
    avatar: "https://via.placeholder.com/150x150?text=SC",
    hourlyRate: 95,
    location: "San Francisco, CA",
    skills: ["React", "Node.js", "TypeScript", "AWS"],
    rating: 4.9,
    jobsCompleted: 12,
    verificationLevel: "top3",
    previousCompany: "Meta"
  },
  {
    id: 2,
    name: "John Smith",
    title: "Senior UX/UI Designer",
    avatar: "https://via.placeholder.com/150x150?text=JS",
    hourlyRate: 85,
    location: "New York, NY",
    skills: ["Figma", "Adobe Creative Suite", "Prototyping"],
    rating: 4.8,
    jobsCompleted: 18,
    verificationLevel: "expert",
    previousCompany: "Apple"
  }
];

export function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: stats } = useQuery({
    queryKey: ["/api/stats"],
    queryFn: () => fetch("/api/stats").then(res => res.json())
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Hire the{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Top 3%
              </span>{" "}
              of Talent™
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              TopSkyll is an exclusive network of the top software developers, designers, marketing experts, 
              management consultants, product managers, and project managers in the world.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search for talents by skills, location, or expertise..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-32 py-4 text-lg rounded-full border-2 bg-background/50 backdrop-blur"
                />
                <Button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-8"
                >
                  Search
                </Button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/hire">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8">
                  Hire Top Talent
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/apply">
                <Button variant="outline" size="lg" className="px-8">
                  Apply as Talent
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{stats?.totalTalents || "40,000"}+</div>
                <div className="text-sm text-muted-foreground">Top Talents</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-sm text-muted-foreground">Trial Success Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">3%</div>
                <div className="text-sm text-muted-foreground">Acceptance Rate</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">48hr</div>
                <div className="text-sm text-muted-foreground">Matching Time</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Find Talent by Category
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access an exclusive network of top-tier professionals across all major disciplines
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {talentCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Link key={category.slug} href={`/talents/${category.slug}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200 dark:hover:border-blue-800">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          <IconComponent 
                            className="h-6 w-6" 
                            style={{ color: category.color }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                            {category.name}
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            {category.description}
                          </p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{category.averageRate}</span>
                            <span className="text-muted-foreground">{category.totalTalents} talents</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Talents */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Meet Our Top Talents
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover verified experts from leading companies worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredTalents.map((talent) => (
              <Card key={talent.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <img 
                      src={talent.avatar} 
                      alt={talent.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-semibold">{talent.name}</h3>
                        {talent.verificationLevel === "top3" && (
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Top 3%
                          </Badge>
                        )}
                        {talent.verificationLevel === "expert" && (
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                            <Star className="w-3 h-3 mr-1" />
                            Expert
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2">{talent.title}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {talent.location}
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                          {talent.rating}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-semibold">${talent.hourlyRate}/hr</div>
                      <div className="text-sm text-muted-foreground">
                        Previously at {talent.previousCompany}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {talent.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <Link href={`/talents/${talent.id}`}>
                    <Button variant="outline" className="w-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      View Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/talents">
              <Button size="lg" variant="outline">
                View All Talents
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              How TopSkyll Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get matched with top talent in 48 hours through our proven process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Tell Us Your Needs</h3>
              <p className="text-muted-foreground">
                Share your project requirements, timeline, and budget. Our team will understand your specific needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Get Matched</h3>
              <p className="text-muted-foreground">
                We'll match you with 2-3 pre-vetted talents from our network within 48 hours, guaranteed.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Start Working</h3>
              <p className="text-muted-foreground">
                Interview candidates and start with a no-risk trial. 98% of trials result in successful hires.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Why Choose TopSkyll?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Top 3% Talent</h3>
              <p className="text-sm text-muted-foreground">
                Rigorous screening process with only 3% acceptance rate
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">48-Hour Matching</h3>
              <p className="text-sm text-muted-foreground">
                Get matched with qualified candidates in just 2 days
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Global Network</h3>
              <p className="text-sm text-muted-foreground">
                Access to talent from around the world in every timezone
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No-Risk Trials</h3>
              <p className="text-sm text-muted-foreground">
                Start with confidence with our no-risk trial period
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Hire Top Talent?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of companies that have built amazing teams with TopSkyll
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hire">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10 px-8">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}