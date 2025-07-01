import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Resources() {
  const resources = [
    {
      id: 1,
      title: "Remote Work Setup Guide",
      description: "Complete guide to setting up an effective home office for remote work",
      category: "Productivity",
      readTime: "8 min read",
      tags: ["Remote Work", "Productivity", "Setup"],
      featured: true
    },
    {
      id: 2,
      title: "Salary Negotiation for Tech Roles",
      description: "Strategies and tips for negotiating better compensation in tech jobs",
      category: "Career",
      readTime: "12 min read",
      tags: ["Salary", "Negotiation", "Career Growth"]
    },
    {
      id: 3,
      title: "Building a Standout Tech Portfolio",
      description: "How to create a portfolio that gets you noticed by top tech companies",
      category: "Portfolio",
      readTime: "15 min read",
      tags: ["Portfolio", "Projects", "Career"]
    },
    {
      id: 4,
      title: "Interview Prep for Remote Positions",
      description: "Specific tips for acing remote job interviews and video calls",
      category: "Interview",
      readTime: "10 min read",
      tags: ["Interview", "Remote", "Preparation"]
    },
    {
      id: 5,
      title: "Time Zone Management for Global Teams",
      description: "Best practices for working across different time zones effectively",
      category: "Remote Work",
      readTime: "6 min read",
      tags: ["Time Zones", "Global Teams", "Communication"]
    },
    {
      id: 6,
      title: "Tax Implications of Remote Work in India",
      description: "Understanding tax obligations when working for international companies",
      category: "Legal",
      readTime: "20 min read",
      tags: ["Tax", "Legal", "India", "International"]
    }
  ];

  const tools = [
    {
      id: 1,
      name: "Resume Builder",
      description: "Create ATS-optimized resumes tailored for tech roles",
      icon: "fas fa-file-alt",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Salary Calculator",
      description: "Compare salaries across different tech roles and locations",
      icon: "fas fa-calculator",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Interview Scheduler",
      description: "Manage and schedule your job interviews efficiently",
      icon: "fas fa-calendar",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Skill Assessment",
      description: "Test your technical skills and get personalized recommendations",
      icon: "fas fa-chart-line",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Career Resources
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Tools, guides, and resources to help you land your dream remote tech job
          </p>
        </div>

        {/* Career Tools */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Career Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool) => (
              <Card key={tool.id} className="hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <i className={`${tool.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {tool.description}
                  </p>
                  <Button className="w-full">
                    Use Tool
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Career Guides */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Career Guides
            </h2>
            <Button variant="outline">
              View All Guides
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <Card key={resource.id} className={`hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200 dark:border-slate-700 ${resource.featured ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-6">
                  {resource.featured && (
                    <Badge className="mb-3 bg-primary text-white">
                      Featured
                    </Badge>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary">{resource.category}</Badge>
                    <span className="text-sm text-slate-500">{resource.readTime}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    {resource.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resource.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" variant="outline">
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with Career Tips
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Get weekly insights, job market trends, and exclusive remote opportunities
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-full text-slate-900 flex-1 w-full sm:w-auto"
            />
            <Button className="bg-white text-primary hover:bg-slate-100 px-8 py-3 rounded-full">
              Subscribe
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}