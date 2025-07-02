import { useRoute } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Clock, CheckCircle } from "lucide-react";

interface TalentProfile {
  id: number;
  name: string;
  title: string;
  avatar: string;
  location: string;
  hourlyRate: string;
  rating: number;
  totalReviews: number;
  skills: string[];
  bio: string;
  verified: boolean;
  responseTime: string;
  availability: string;
}

const mockTalents: Record<string, TalentProfile[]> = {
  developers: [
    {
      id: 1,
      name: "Rajesh Kumar",
      title: "Senior Full Stack Developer",
      avatar: "/api/placeholder/64/64",
      location: "Bangalore, India",
      hourlyRate: "$45-65",
      rating: 4.9,
      totalReviews: 127,
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      bio: "Experienced full-stack developer with 8+ years building scalable web applications for Fortune 500 companies.",
      verified: true,
      responseTime: "< 2 hours",
      availability: "Available now"
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Frontend React Specialist",
      avatar: "/api/placeholder/64/64",
      location: "Mumbai, India",
      hourlyRate: "$35-50",
      rating: 4.8,
      totalReviews: 89,
      skills: ["React", "Redux", "TypeScript", "Next.js", "Tailwind CSS"],
      bio: "Frontend expert specializing in modern React applications with a focus on performance and user experience.",
      verified: true,
      responseTime: "< 1 hour",
      availability: "Available now"
    },
    {
      id: 3,
      name: "Arjun Patel",
      title: "Backend API Developer",
      avatar: "/api/placeholder/64/64",
      location: "Pune, India",
      hourlyRate: "$40-55",
      rating: 4.9,
      totalReviews: 156,
      skills: ["Node.js", "Python", "PostgreSQL", "Docker", "Microservices"],
      bio: "Backend specialist with expertise in building robust APIs and distributed systems for high-traffic applications.",
      verified: true,
      responseTime: "< 3 hours",
      availability: "Available in 2 weeks"
    }
  ],
  designers: [
    {
      id: 4,
      name: "Sneha Gupta",
      title: "UI/UX Design Lead",
      avatar: "/api/placeholder/64/64",
      location: "Delhi, India",
      hourlyRate: "$30-45",
      rating: 4.9,
      totalReviews: 94,
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping", "Design Systems"],
      bio: "Creative designer with 6+ years experience designing intuitive interfaces for mobile and web applications.",
      verified: true,
      responseTime: "< 2 hours",
      availability: "Available now"
    },
    {
      id: 5,
      name: "Kartik Singh",
      title: "Product Designer",
      avatar: "/api/placeholder/64/64",
      location: "Hyderabad, India",
      hourlyRate: "$35-50",
      rating: 4.8,
      totalReviews: 73,
      skills: ["Sketch", "Figma", "InVision", "User Testing", "Wireframing"],
      bio: "Product designer focused on creating user-centered designs that drive business growth and engagement.",
      verified: true,
      responseTime: "< 1 hour",
      availability: "Available now"
    }
  ],
  finance: [
    {
      id: 6,
      name: "Anita Desai",
      title: "Financial Planning Expert",
      avatar: "/api/placeholder/64/64",
      location: "Mumbai, India",
      hourlyRate: "$25-40",
      rating: 4.9,
      totalReviews: 112,
      skills: ["Financial Modeling", "Excel", "Budgeting", "Forecasting", "Risk Analysis"],
      bio: "CFA with 10+ years experience in financial planning and analysis for tech startups and Fortune 500 companies.",
      verified: true,
      responseTime: "< 4 hours",
      availability: "Available now"
    }
  ],
  managers: [
    {
      id: 7,
      name: "Vikram Malhotra",
      title: "Senior Product Manager",
      avatar: "/api/placeholder/64/64",
      location: "Bangalore, India",
      hourlyRate: "$50-75",
      rating: 4.9,
      totalReviews: 87,
      skills: ["Product Strategy", "Agile", "Roadmapping", "Analytics", "User Research"],
      bio: "Experienced product manager who has launched 15+ successful products, with expertise in B2B SaaS platforms.",
      verified: true,
      responseTime: "< 2 hours",
      availability: "Available in 1 week"
    }
  ],
  marketing: [
    {
      id: 8,
      name: "Kavya Reddy",
      title: "Digital Marketing Strategist",
      avatar: "/api/placeholder/64/64",
      location: "Chennai, India",
      hourlyRate: "$30-45",
      rating: 4.8,
      totalReviews: 68,
      skills: ["SEO", "Google Ads", "Social Media", "Content Strategy", "Analytics"],
      bio: "Growth marketing expert with proven track record of scaling startups from 0 to $10M+ revenue.",
      verified: true,
      responseTime: "< 1 hour",
      availability: "Available now"
    }
  ]
};

const categoryTitles: Record<string, string> = {
  developers: "Top Developers",
  designers: "Top Designers", 
  finance: "Top Finance Experts",
  managers: "Top Project & Product Managers",
  marketing: "Top Marketing Experts"
};

const categoryDescriptions: Record<string, string> = {
  developers: "Connect with elite developers who have been rigorously screened for technical excellence and communication skills.",
  designers: "Work with top-tier designers who create exceptional user experiences and beautiful, functional designs.",
  finance: "Access financial experts who provide strategic insights and comprehensive financial planning services.",
  managers: "Partner with experienced project and product managers who drive successful outcomes and team efficiency.",
  marketing: "Collaborate with marketing professionals who generate measurable growth and brand success."
};

export function TalentCategory() {
  const [match, params] = useRoute("/talents/:category");
  const category = params?.category || "developers";
  const talents = mockTalents[category] || mockTalents.developers;
  const title = categoryTitles[category] || "Top Talent";
  const description = categoryDescriptions[category] || "Connect with top professionals in this field.";

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
          <div className="mt-6">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              <CheckCircle className="w-4 h-4 mr-2" />
              Top 3% of Global Talent
            </Badge>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm border">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by skills, location, or expertise..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm">All Locations</Button>
            <Button variant="outline" size="sm">Hourly Rate</Button>
            <Button variant="outline" size="sm">Availability</Button>
            <Button variant="outline" size="sm">Experience</Button>
          </div>
        </div>

        {/* Talent Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {talents.map((talent) => (
            <Card key={talent.id} className="hover:shadow-lg transition-all duration-200 border-0 shadow-md">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={talent.avatar} alt={talent.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        {talent.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center gap-2">
                        {talent.name}
                        {talent.verified && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </CardTitle>
                      <CardDescription className="font-medium">
                        {talent.title}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{talent.rating}</span>
                    <span className="text-sm text-muted-foreground">
                      ({talent.totalReviews} reviews)
                    </span>
                  </div>
                  <Badge variant="secondary" className="text-lg font-bold">
                    {talent.hourlyRate}/hr
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {talent.bio}
                </p>

                <div className="flex flex-wrap gap-1">
                  {talent.skills.slice(0, 4).map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {talent.skills.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{talent.skills.length - 4} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{talent.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{talent.responseTime}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Talents
          </Button>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-4">Ready to Hire Top Talent?</h2>
          <p className="text-lg mb-6 opacity-90">
            Get matched with pre-vetted professionals who can start immediately.
          </p>
          <Button size="lg" variant="secondary" className="px-8">
            Start Hiring Now
          </Button>
        </div>
      </div>
    </div>
  );
}