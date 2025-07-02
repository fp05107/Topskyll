import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Sample user profiles data
const sampleProfiles = [
  {
    id: 1,
    name: "Rajesh Kumar",
    title: "Senior Full Stack Developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    location: "Mumbai, India",
    hourlyRate: "$45/hr",
    rating: 4.9,
    totalReviews: 127,
    skills: ["React", "Node.js", "MongoDB", "AWS"],
    bio: "8+ years building scalable web applications for global clients. Specialized in e-commerce and fintech solutions.",
    verified: true,
    responseTime: "1 hour",
    availability: "Available now",
    category: "developers"
  },
  {
    id: 2,
    name: "Priya Sharma",
    title: "Senior UI/UX Designer",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b4d0?w=100&h=100&fit=crop&crop=face",
    location: "Bangalore, India",
    hourlyRate: "$38/hr",
    rating: 4.8,
    totalReviews: 89,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    bio: "Creating beautiful and intuitive user experiences for SaaS products. 6+ years in design thinking and user-centered design.",
    verified: true,
    responseTime: "2 hours",
    availability: "Available now",
    category: "designers"
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
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    bio: "Infrastructure automation specialist with 7+ years in cloud technologies. Helped scale startups to handle millions of users.",
    verified: true,
    responseTime: "30 minutes",
    availability: "Available now",
    category: "developers"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    title: "Digital Marketing Specialist",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    location: "Hyderabad, India",
    hourlyRate: "$25/hr",
    rating: 4.7,
    totalReviews: 156,
    skills: ["Google Ads", "SEO", "Content Marketing", "Analytics"],
    bio: "Growth-focused marketer with proven track record of increasing online visibility and conversions for B2B and B2C companies.",
    verified: true,
    responseTime: "1 hour",
    availability: "Available now",
    category: "marketing"
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
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    bio: "AI/ML expert with 5+ years in predictive analytics and deep learning. Worked with Fortune 500 companies on data-driven solutions.",
    verified: true,
    responseTime: "2 hours",
    availability: "Available now",
    category: "developers"
  },
  {
    id: 6,
    name: "Kavya Nair",
    title: "Project Manager",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
    location: "Kochi, India",
    hourlyRate: "$35/hr",
    rating: 4.9,
    totalReviews: 112,
    skills: ["Scrum", "Agile", "Jira", "Stakeholder Management"],
    bio: "Certified PMP with 8+ years managing complex software projects. Expert in Agile methodologies and cross-functional team leadership.",
    verified: true,
    responseTime: "1 hour",
    availability: "Available now",
    category: "project-managers"
  }
];

const talentCategories = [
  {
    id: 1,
    name: "Software Developers",
    slug: "developers",
    description: "Full-stack developers, frontend specialists, backend engineers",
    icon: "💻",
    color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
    totalTalents: 2847,
    averageRate: "$45"
  },
  {
    id: 2,
    name: "Designers",
    slug: "designers",
    description: "UI/UX designers, graphic designers, product designers",
    icon: "🎨",
    color: "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800",
    totalTalents: 1523,
    averageRate: "$38"
  },
  {
    id: 3,
    name: "Marketing Experts",
    slug: "marketing",
    description: "Digital marketers, content strategists, SEO specialists",
    icon: "📈",
    color: "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800",
    totalTalents: 892,
    averageRate: "$32"
  },
  {
    id: 4,
    name: "Project Managers",
    slug: "project-managers",
    description: "Scrum masters, product managers, technical leads",
    icon: "📋",
    color: "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800",
    totalTalents: 645,
    averageRate: "$42"
  }
];

function ProfileCard({ profile }) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border border-slate-200 dark:border-slate-700">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            {profile.verified && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <i className="fas fa-check text-white text-xs"></i>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {profile.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {profile.title}
                </p>
                <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400 mb-3">
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-map-marker-alt text-xs"></i>
                    <span>{profile.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <i className="fas fa-star text-yellow-400 text-xs"></i>
                    <span>{profile.rating} ({profile.totalReviews})</span>
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  {profile.hourlyRate}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  {profile.availability}
                </div>
              </div>
            </div>
            
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
              {profile.bio}
            </p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {profile.skills.slice(0, 4).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {profile.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{profile.skills.length - 4}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Responds in {profile.responseTime}
              </span>
              <Link href={`/talents/${profile.category}`}>
                <Button size="sm" variant="outline">
                  View Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CategoryCard({ category }) {
  return (
    <Link href={`/talents/${category.slug}`}>
      <Card className={`hover:shadow-lg transition-all duration-200 cursor-pointer border ${category.color}`}>
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-4">{category.icon}</div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            {category.name}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {category.description}
          </p>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500 dark:text-slate-400">
              {category.totalTalents.toLocaleString()} talents
            </span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">
              From {category.averageRate}/hr
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const filteredProfiles = selectedCategory === "all" 
    ? sampleProfiles 
    : sampleProfiles.filter(profile => profile.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Hire the top 3% of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Indian talent
            </span>
          </h1>
          
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto">
            TopSkyll is an exclusive network of the top remote talent from India. 
            Hire skilled professionals who have been rigorously screened and are ready to contribute immediately.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link href="/hire">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <i className="fas fa-search mr-2"></i>
                Hire Talent
              </Button>
            </Link>
            
            <Link href="/apply">
              <Button size="lg" variant="outline">
                <i className="fas fa-user-plus mr-2"></i>
                Join as Talent
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center space-x-2">
              <i className="fas fa-shield-alt text-green-600"></i>
              <span>Pre-vetted talent</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-clock text-blue-600"></i>
              <span>Hire in 48 hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-globe text-purple-600"></i>
              <span>Time zone aligned</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-handshake text-orange-600"></i>
              <span>Risk-free trial</span>
            </div>
          </div>
        </div>
      </section>

      {/* Talent Categories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Browse talent by category
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Find the perfect professional for your project needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {talentCategories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Talent Profiles */}
      <section className="py-16 px-4 bg-white dark:bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Meet our top talent
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Experienced professionals ready to join your team
            </p>
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <Button
                variant={selectedCategory === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory("all")}
              >
                All Talents
              </Button>
              {talentCategories.map((category) => (
                <Button
                  key={category.slug}
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProfiles.map((profile) => (
              <ProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/talents/developers">
              <Button size="lg" variant="outline">
                View All Talent Profiles
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                5,000+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Vetted Talents
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                98%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Success Rate
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                48hr
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Avg. Hire Time
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                4.9/5
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Client Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to hire top talent?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Get matched with pre-vetted professionals in just 48 hours
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/hire">
              <Button size="lg" variant="secondary">
                <i className="fas fa-rocket mr-2"></i>
                Start Hiring Now
              </Button>
            </Link>
            <Link href="/how-it-works">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-slate-900">
                <i className="fas fa-play mr-2"></i>
                How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}