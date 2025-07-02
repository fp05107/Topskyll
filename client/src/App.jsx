import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
import JobsByCategory from "@/pages/JobsByCategory";
import About from "@/pages/About";
import TalentCategory from "@/pages/TalentCategory";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <div className="min-h-screen bg-background font-sans antialiased">
          <Navbar />
          <main>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/jobs" component={Jobs} />
              <Route path="/jobs-by-category" component={JobsByCategory} />
              <Route path="/about" component={About} />
              <Route path="/talents/:category" component={TalentCategory} />
              <Route path="/how-it-works">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">How TopSkyll Works</h1>
                  <div className="max-w-4xl">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                      Our comprehensive process ensures you get matched with the perfect opportunities or talent.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-user-plus text-2xl text-blue-600"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">1. Apply & Screen</h3>
                        <p className="text-slate-600 dark:text-slate-400">Submit your application and go through our rigorous screening process.</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-handshake text-2xl text-green-600"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">2. Get Matched</h3>
                        <p className="text-slate-600 dark:text-slate-400">We connect you with opportunities that match your skills and preferences.</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="fas fa-rocket text-2xl text-purple-600"></i>
                        </div>
                        <h3 className="text-xl font-semibold mb-2 text-slate-900 dark:text-slate-100">3. Start Working</h3>
                        <p className="text-slate-600 dark:text-slate-400">Begin your remote work journey with ongoing support from our team.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Route>
              <Route path="/top-3-percent">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">Top 3% Talent</h1>
                  <div className="max-w-4xl">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                      We maintain the highest standards by accepting only the top 3% of applicants into our exclusive network.
                    </p>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm border mb-8">
                      <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Our Rigorous Selection Process</h2>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <i className="fas fa-check text-white text-xs"></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Technical Excellence</h3>
                            <p className="text-slate-600 dark:text-slate-400">Comprehensive technical assessments and coding challenges.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <i className="fas fa-check text-white text-xs"></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Communication Skills</h3>
                            <p className="text-slate-600 dark:text-slate-400">English proficiency and clear communication assessment.</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <i className="fas fa-check text-white text-xs"></i>
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Professional Experience</h3>
                            <p className="text-slate-600 dark:text-slate-400">Minimum 3+ years of proven industry experience.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Route>
              <Route path="/companies">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">For Companies</h1>
                  <div className="max-w-4xl">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                      Access India's top 3% of remote talent. Skip the lengthy hiring process and get matched with pre-vetted professionals.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
                        <i className="fas fa-clock text-3xl text-blue-600 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">Save Time</h3>
                        <p className="text-slate-600 dark:text-slate-400">Reduce hiring time from months to weeks with our pre-screened talent pool.</p>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
                        <i className="fas fa-dollar-sign text-3xl text-green-600 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">Cost Effective</h3>
                        <p className="text-slate-600 dark:text-slate-400">Access top talent at competitive rates without compromising on quality.</p>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
                        <i className="fas fa-shield-alt text-3xl text-purple-600 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">Risk-Free</h3>
                        <p className="text-slate-600 dark:text-slate-400">2-week trial period with full money-back guarantee if not satisfied.</p>
                      </div>
                      
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border">
                        <i className="fas fa-headset text-3xl text-orange-600 mb-4"></i>
                        <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-slate-100">24/7 Support</h3>
                        <p className="text-slate-600 dark:text-slate-400">Dedicated account manager and round-the-clock technical support.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Route>
              <Route path="/apply">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">Apply as Talent</h1>
                  <div className="max-w-4xl">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                      Ready to join our exclusive network of top professionals? Start your application today.
                    </p>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm border">
                      <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Application Process</h2>
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">1</div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Submit Application</h3>
                            <p className="text-slate-600 dark:text-slate-400">Complete our comprehensive application form with your experience and skills.</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">2</div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Technical Assessment</h3>
                            <p className="text-slate-600 dark:text-slate-400">Take our skill-specific technical tests and coding challenges.</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">3</div>
                          <div>
                            <h3 className="font-semibold text-slate-900 dark:text-slate-100">Interview Process</h3>
                            <p className="text-slate-600 dark:text-slate-400">Participate in technical and cultural fit interviews with our team.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Route>
              <Route path="/hire">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-4xl font-bold mb-8 text-slate-900 dark:text-slate-100">Hire Top Talent</h1>
                  <div className="max-w-4xl">
                    <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
                      Find and hire the best remote talent from India. Get matched with pre-vetted professionals in just 48 hours.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-6 border">
                        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Full-Time Hiring</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Hire dedicated professionals for long-term projects and team building.</p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-check text-green-600"></i>
                            <span>Dedicated team members</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-check text-green-600"></i>
                            <span>Long-term commitment</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-check text-green-600"></i>
                            <span>Competitive monthly rates</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-6 border">
                        <h3 className="text-xl font-semibold mb-4 text-slate-900 dark:text-slate-100">Project-Based</h3>
                        <p className="text-slate-600 dark:text-slate-400 mb-4">Get expert help for specific projects with flexible engagement models.</p>
                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-check text-green-600"></i>
                            <span>Flexible duration</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-check text-green-600"></i>
                            <span>Specialist expertise</span>
                          </li>
                          <li className="flex items-center space-x-2">
                            <i className="fas fa-check text-green-600"></i>
                            <span>Hourly or fixed pricing</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-8 shadow-sm border">
                      <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-slate-100">Popular Skills</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["React.js", "Node.js", "Python", "Java", "React Native", "DevOps", "AI/ML", "Blockchain"].map((skill) => (
                          <div key={skill} className="bg-slate-50 dark:bg-slate-700 rounded-lg p-3 text-center">
                            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Route>
              <Route path="/login">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">Log In</h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Access your TopSkyll account to manage your profile and opportunities.
                  </p>
                </div>
              </Route>
              <Route path="/privacy-policy">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">Privacy Policy</h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Learn about how we protect and handle your personal information.
                  </p>
                </div>
              </Route>
              <Route path="/terms-of-service">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">Terms of Service</h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Read our terms and conditions for using TopSkyll.
                  </p>
                </div>
              </Route>
              <Route path="/contact">
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">Contact Us</h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Get in touch with our team for support and inquiries.
                  </p>
                </div>
              </Route>
              <Route>
                <div className="container mx-auto px-4 py-20 min-h-screen pt-20">
                  <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-slate-100">Page Not Found</h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                  </p>
                </div>
              </Route>
            </Switch>
          </main>
          <Footer />
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;