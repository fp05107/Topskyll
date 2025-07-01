import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  const teamMembers = [
    {
      id: 1,
      name: "Arjun Sharma",
      role: "Founder & CEO",
      description: "Former tech lead with 10+ years experience in remote hiring",
      avatar: "AS",
      linkedin: "#"
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Head of Product",
      description: "Product expert focused on creating seamless user experiences",
      avatar: "PP",
      linkedin: "#"
    },
    {
      id: 3,
      name: "Rahul Kumar",
      role: "Tech Lead",
      description: "Full-stack developer passionate about scalable solutions",
      avatar: "RK",
      linkedin: "#"
    },
    {
      id: 4,
      name: "Anjali Singh",
      role: "Head of Partnerships",
      description: "Building relationships with top companies for remote opportunities",
      avatar: "AS",
      linkedin: "#"
    }
  ];

  const stats = [
    { label: "Active Job Seekers", value: "50,000+", icon: "fas fa-users" },
    { label: "Partner Companies", value: "800+", icon: "fas fa-building" },
    { label: "Successful Placements", value: "15,000+", icon: "fas fa-handshake" },
    { label: "Cities Covered", value: "100+", icon: "fas fa-map-marker-alt" }
  ];

  const values = [
    {
      title: "Remote-First Culture",
      description: "We believe in the power of remote work to unlock global opportunities for Indian talent",
      icon: "fas fa-globe-americas",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Quality Over Quantity",
      description: "We carefully curate opportunities to ensure the best match between candidates and companies",
      icon: "fas fa-star",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Transparency",
      description: "Clear communication about salary, benefits, and expectations from day one",
      icon: "fas fa-eye",
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Continuous Growth",
      description: "Supporting career development through resources, mentorship, and skill-building",
      icon: "fas fa-chart-line",
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            About Topskyll
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to connect talented professionals in India with amazing remote opportunities 
            from companies around the world. Founded in 2024, Topskyll has become India's leading platform 
            for remote tech jobs.
          </p>
        </div>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-bullseye text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Our Mission
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  To democratize access to global remote opportunities, enabling Indian professionals 
                  to work with top companies worldwide while contributing to India's growing tech ecosystem.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 dark:border-slate-700">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <i className="fas fa-eye text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                  Our Vision
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  To become the world's most trusted platform for remote work, where geography is no 
                  barrier to talent and opportunity, fostering a truly global workforce.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className={`${stat.icon} text-white`}></i>
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The principles that guide everything we do at Topskyll
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-4`}>
                    <i className={`${value.icon} text-white`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              The passionate individuals working to revolutionize remote work in India
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="text-center border border-slate-200 dark:border-slate-700">
                <CardContent className="p-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">{member.avatar}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium mb-3">
                    {member.role}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
                    {member.description}
                  </p>
                  <Button variant="outline" size="sm">
                    <i className="fab fa-linkedin mr-2"></i>
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Remote Revolution?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Whether you're a job seeker looking for remote opportunities or a company 
            wanting to hire top Indian talent, we'd love to hear from you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button className="px-8 py-3 bg-white text-primary rounded-full font-semibold hover:bg-slate-100">
                <i className="fas fa-user-plus mr-2"></i>
                Join as Job Seeker
              </Button>
            </Link>
            <Button variant="outline" className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-primary">
              <i className="fas fa-building mr-2"></i>
              Partner with Us
            </Button>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">Get in touch</p>
            <div className="flex items-center justify-center space-x-6 text-sm">
              <span>📧 hello@topskyll.com</span>
              <span>📞 +91-9999-TOPSKYLL</span>
              <span>📍 Bangalore, India</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}