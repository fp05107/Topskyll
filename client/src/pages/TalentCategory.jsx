import { useState } from "react";
import { useParams } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Sample talent profiles data for different categories
const sampleTalentsByCategory = {
  developers: [
    {
      id: 1,
      name: "Rajesh Kumar",
      title: "Senior Full Stack Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      location: "Mumbai, India",
      hourlyRate: "$45/hr",
      rating: 4.9,
      totalReviews: 127,
      skills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript", "Docker"],
      bio: "8+ years building scalable web applications for global clients. Specialized in e-commerce and fintech solutions with expertise in modern JavaScript frameworks.",
      verified: true,
      responseTime: "1 hour",
      availability: "Available now",
      experienceLevel: "Senior"
    },
    {
      id: 3,
      name: "Amit Patel",
      title: "DevOps Engineer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      location: "Pune, India",
      hourlyRate: "$42/hr",
      rating: 4.9,
      totalReviews: 95,
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform", "Jenkins"],
      bio: "Infrastructure automation specialist with 7+ years in cloud technologies. Helped scale startups to handle millions of users with reliable deployment pipelines.",
      verified: true,
      responseTime: "30 minutes",
      availability: "Available now",
      experienceLevel: "Senior"
    },
    {
      id: 5,
      name: "Vikram Singh",
      title: "Data Scientist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      location: "Delhi, India",
      hourlyRate: "$50/hr",
      rating: 4.8,
      totalReviews: 73,
      skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "PyTorch", "Pandas"],
      bio: "AI/ML expert with 5+ years in predictive analytics and deep learning. Worked with Fortune 500 companies on data-driven solutions and recommendation systems.",
      verified: true,
      responseTime: "2 hours",
      availability: "Available now",
      experienceLevel: "Mid-level"
    },
    {
      id: 7,
      name: "Rohit Sharma",
      title: "Frontend Developer",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face",
      location: "Bangalore, India",
      hourlyRate: "$35/hr",
      rating: 4.7,
      totalReviews: 84,
      skills: ["React", "Vue.js", "JavaScript", "CSS", "Tailwind", "Figma"],
      bio: "Creative frontend developer with 4+ years experience building beautiful, responsive web applications. Expert in modern frontend frameworks and UI/UX best practices.",
      verified: true,
      responseTime: "1 hour",
      availability: "Available now",
      experienceLevel: "Mid-level"
    }
  ],
  designers: [
    {
      id: 2,
      name: "Priya Sharma",
      title: "Senior UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d0?w=100&h=100&fit=crop&crop=face",
      location: "Bangalore, India",
      hourlyRate: "$38/hr",
      rating: 4.8,
      totalReviews: 89,
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Sketch", "InVision"],
      bio: "Creating beautiful and intuitive user experiences for SaaS products. 6+ years in design thinking and user-centered design with focus on conversion optimization.",
      verified: true,
      responseTime: "2 hours",
      availability: "Available now",
      experienceLevel: "Senior"
    },
    {
      id: 8,
      name: "Ananya Gupta",
      title: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=100&h=100&fit=crop&crop=face",
      location: "Mumbai, India",
      hourlyRate: "$40/hr",
      rating: 4.9,
      totalReviews: 67,
      skills: ["Figma", "Product Strategy", "Design Systems", "User Testing", "Wireframing"],
      bio: "Product designer specializing in B2B SaaS platforms. 5+ years designing end-to-end user experiences from research to final implementation.",
      verified: true,
      responseTime: "1 hour",
      availability: "Available now",
      experienceLevel: "Senior"
    }
  ],
  marketing: [
    {
      id: 4,
      name: "Sneha Reddy",
      title: "Digital Marketing Specialist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      location: "Hyderabad, India",
      hourlyRate: "$25/hr",
      rating: 4.7,
      totalReviews: 156,
      skills: ["Google Ads", "SEO", "Content Marketing", "Analytics", "Social Media", "Email Marketing"],
      bio: "Growth-focused marketer with proven track record of increasing online visibility and conversions for B2B and B2C companies. Expert in performance marketing.",
      verified: true,
      responseTime: "1 hour",
      availability: "Available now",
      experienceLevel: "Mid-level"
    }
  ],
  "project-managers": [
    {
      id: 6,
      name: "Kavya Nair",
      title: "Senior Project Manager",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
      location: "Kochi, India",
      hourlyRate: "$35/hr",
      rating: 4.9,
      totalReviews: 112,
      skills: ["Scrum", "Agile", "Jira", "Stakeholder Management", "Risk Management", "Budget Planning"],
      bio: "Certified PMP with 8+ years managing complex software projects. Expert in Agile methodologies and cross-functional team leadership with focus on delivery excellence.",
      verified: true,
      responseTime: "1 hour",
      availability: "Available now",
      experienceLevel: "Senior"
    }
  ]
};

const categoryInfo = {
  developers: {
    name: "Software Developers",
    description: "Full-stack developers, frontend specialists, backend engineers, and DevOps professionals",
    icon: "💻",
    totalTalents: 2847
  },
  designers: {
    name: "Designers",
    description: "UI/UX designers, product designers, and creative professionals",
    icon: "🎨",
    totalTalents: 1523
  },
  marketing: {
    name: "Marketing Experts",
    description: "Digital marketers, content strategists, and growth specialists",
    icon: "📈",
    totalTalents: 892
  },
  "project-managers": {
    name: "Project Managers",
    description: "Scrum masters, product managers, and technical leads",
    icon: "📋",
    totalTalents: 645
  }
};

function TalentProfileCard({ profile }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-slate-200 dark:border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="w-20 h-20">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {profile.verified && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {profile.name}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-2">
                  {profile.title}
                </p>
                <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-map-marker-alt text-xs"></i>
                    <span>{profile.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <span>{profile.rating} ({profile.totalReviews} reviews)</span>
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {profile.experienceLevel}
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {profile.hourlyRate}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400 mb-1">
                  {profile.availability}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Responds in {profile.responseTime}
                </div>
              </div>
            </div>
            
            <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
              {profile.bio}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <i className="fas fa-eye mr-2"></i>
                  View Profile
                </Button>
                <Button size="sm" variant="outline">
                  <i className="fas fa-bookmark mr-2"></i>
                  Save
                </Button>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <i className="fas fa-paper-plane mr-2"></i>
                Contact
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function TalentCategory() {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [experienceFilter, setExperienceFilter] = useState("all");
  
  const categoryData = categoryInfo[category];
  const talents = sampleTalentsByCategory[category] || [];
  
  // Filter and sort talents
  const filteredTalents = talents
    .filter(talent => {
      const matchesSearch = talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           talent.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesExperience = experienceFilter === "all" || 
                               talent.experienceLevel.toLowerCase() === experienceFilter.toLowerCase();
      
      return matchesSearch && matchesExperience;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price-low":
          return parseInt(a.hourlyRate.replace(/[^0-9]/g, '')) - parseInt(b.hourlyRate.replace(/[^0-9]/g, ''));
        case "price-high":
          return parseInt(b.hourlyRate.replace(/[^0-9]/g, '')) - parseInt(a.hourlyRate.replace(/[^0-9]/g, ''));
        case "reviews":
          return b.totalReviews - a.totalReviews;
        default:
          return 0;
      }
    });

  if (!categoryData) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Category Not Found
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            The talent category you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 bg-slate-50 dark:bg-slate-900">
      {/* Header Section */}
      <section className="py-12 px-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <div className="text-5xl">{categoryData.icon}</div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                {categoryData.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-2">
                {categoryData.description}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {categoryData.totalTalents.toLocaleString()} verified professionals available
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 px-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search by name, skills, or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              
              <Select value={experienceFilter} onValueChange={setExperienceFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="mid-level">Mid-level</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="text-sm text-slate-600 dark:text-slate-400">
              {filteredTalents.length} talent{filteredTalents.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>
      </section>

      {/* Talents Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredTalents.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTalents.map((talent) => (
                <TalentProfileCard key={talent.id} profile={talent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No talents found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search criteria or filters to find more results.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Need help finding the right talent?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our team can help you find and interview the perfect candidates for your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              <i className="fas fa-phone mr-2"></i>
              Schedule a Call
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
              <i className="fas fa-envelope mr-2"></i>
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}