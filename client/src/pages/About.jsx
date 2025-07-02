import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function About() {
  const teamMembers = [
    {
      name: "Priya Sharma",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Former engineering leader at Google. Passionate about connecting Indian talent with global opportunities."
    },
    {
      name: "Arjun Patel",
      role: "CTO & Co-Founder", 
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Ex-Microsoft architect. Building technology to democratize remote work for Indian professionals."
    },
    {
      name: "Sneha Gupta",
      role: "Head of Talent",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face", 
      bio: "Former HR director at Flipkart. Expert in identifying and nurturing top-tier technical talent."
    }
  ];

  const stats = [
    { label: "Professionals Placed", value: "10,000+", icon: "fas fa-users" },
    { label: "Partner Companies", value: "500+", icon: "fas fa-building" },
    { label: "Countries Served", value: "50+", icon: "fas fa-globe" },
    { label: "Success Rate", value: "95%", icon: "fas fa-chart-line" }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            About TopSkyll
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            We're on a mission to connect India's brightest minds with the world's most innovative companies, 
            creating opportunities that transcend geographical boundaries.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/apply">
              <Button size="lg" className="px-8">
                Join Our Network
              </Button>
            </Link>
            <Link href="/hire">
              <Button variant="outline" size="lg" className="px-8">
                Hire Talent
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${stat.icon} text-2xl text-primary`}></i>
                </div>
                <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-600 dark:text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                Founded in 2020 by engineers who experienced the challenges of finding quality remote work opportunities, 
                TopSkyll was born from a simple observation: India has incredible technical talent, but limited access 
                to global opportunities.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-6">
                We started with a vision to bridge this gap by creating a platform that not only connects talent with 
                opportunities but ensures both parties find the perfect match through our rigorous screening process.
              </p>
              <p className="text-lg text-slate-600 dark:text-slate-400">
                Today, we're proud to have helped thousands of Indian professionals build successful remote careers 
                while helping companies worldwide access the best talent India has to offer.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Team collaboration"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Our Mission & Values
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-globe text-2xl text-blue-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Global Access
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Breaking down geographical barriers to give Indian talent access to the world's best opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-medal text-2xl text-green-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Excellence
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Maintaining the highest standards through our rigorous screening and continuous learning programs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-handshake text-2xl text-purple-600"></i>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                  Trust
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Building lasting relationships based on transparency, reliability, and mutual success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              The passionate individuals working to transform remote work for India
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Ready to Join Our Mission?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            Whether you're a talented professional looking for opportunities or a company seeking exceptional talent, 
            we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/apply">
              <Button size="lg" className="px-8">
                Apply as Talent
              </Button>
            </Link>
            <Link href="/hire">
              <Button variant="outline" size="lg" className="px-8">
                Hire Talent
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="lg" className="px-8">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}