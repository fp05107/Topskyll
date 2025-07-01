import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock companies data - this will be dynamic once backend is properly structured
  const companies = [
    {
      id: 1,
      name: "TechCorp Solutions",
      logo: "TC",
      description: "Leading cloud infrastructure provider with global reach",
      location: "San Francisco, CA",
      employees: "1000+",
      openJobs: 45,
      founded: 2015,
      website: "techcorp.com",
      industry: "Cloud Computing"
    },
    {
      id: 2,
      name: "DataFlow Inc",
      logo: "DF",
      description: "Advanced data analytics and machine learning platform",
      location: "Austin, TX",
      employees: "500-1000",
      openJobs: 23,
      founded: 2018,
      website: "dataflow.io",
      industry: "AI/ML"
    },
    {
      id: 3,
      name: "CyberGuard Systems",
      logo: "CG",
      description: "Cybersecurity solutions for enterprise organizations",
      location: "Boston, MA",
      employees: "200-500",
      openJobs: 18,
      founded: 2020,
      website: "cyberguard.com",
      industry: "Cybersecurity"
    },
    {
      id: 4,
      name: "DevStream Technologies",
      logo: "DS",
      description: "Developer tools and platform for modern software teams",
      location: "Seattle, WA",
      employees: "100-200",
      openJobs: 31,
      founded: 2019,
      website: "devstream.dev",
      industry: "Developer Tools"
    }
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Top Remote Companies
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Explore companies that are actively hiring for remote positions across India
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <Input
            placeholder="Search companies or industries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-bold text-primary mb-2">800+</div>
            <div className="text-slate-600 dark:text-slate-400">Partner Companies</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">15,000+</div>
            <div className="text-slate-600 dark:text-slate-400">Active Job Openings</div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">30+</div>
            <div className="text-slate-600 dark:text-slate-400">Industries Covered</div>
          </div>
        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCompanies.map((company) => (
            <Card key={company.id} className="hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{company.logo}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
                      {company.name}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {company.industry} • {company.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{company.openJobs}</div>
                    <div className="text-sm text-slate-500">open jobs</div>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {company.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
                  <span>👥 {company.employees} employees</span>
                  <span>📅 Founded {company.founded}</span>
                  <span>🌐 {company.website}</span>
                </div>
                
                <div className="flex space-x-3">
                  <Button className="flex-1 bg-primary text-white hover:bg-primary/90">
                    View Jobs ({company.openJobs})
                  </Button>
                  <Button variant="outline" className="px-6">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button className="px-8 py-3">
            Load More Companies
          </Button>
        </div>
      </div>
    </div>
  );
}