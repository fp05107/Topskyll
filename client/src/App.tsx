import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Home } from "@/pages/Home";
import { TalentCategory } from "@/pages/TalentCategory";

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
              <Route path="/talents/:category" component={TalentCategory} />
              <Route path="/how-it-works">
                <div className="container mx-auto px-4 py-20">
                  <h1 className="text-3xl font-bold mb-8">How TopSkyll Works</h1>
                  <p className="text-muted-foreground">
                    Learn about our process for connecting you with top talent.
                  </p>
                </div>
              </Route>
              <Route path="/top-3-percent">
                <div className="container mx-auto px-4 py-20">
                  <h1 className="text-3xl font-bold mb-8">Top 3% Talent</h1>
                  <p className="text-muted-foreground">
                    Discover what makes our talent network so exclusive.
                  </p>
                </div>
              </Route>
              <Route path="/companies">
                <div className="container mx-auto px-4 py-20">
                  <h1 className="text-3xl font-bold mb-8">For Companies</h1>
                  <p className="text-muted-foreground">
                    Learn how companies benefit from hiring through TopSkyll.
                  </p>
                </div>
              </Route>
              <Route path="/apply">
                <div className="container mx-auto px-4 py-20">
                  <h1 className="text-3xl font-bold mb-8">Apply as Talent</h1>
                  <p className="text-muted-foreground">
                    Join our exclusive network of top professionals.
                  </p>
                </div>
              </Route>
              <Route path="/hire">
                <div className="container mx-auto px-4 py-20">
                  <h1 className="text-3xl font-bold mb-8">Hire Talent</h1>
                  <p className="text-muted-foreground">
                    Find and hire the best talent for your projects.
                  </p>
                </div>
              </Route>
              <Route path="/login">
                <div className="container mx-auto px-4 py-20">
                  <h1 className="text-3xl font-bold mb-8">Log In</h1>
                  <p className="text-muted-foreground">
                    Access your TopSkyll account.
                  </p>
                </div>
              </Route>
              <Route>
                <div className="container mx-auto px-4 py-20">
                  <h1 className="text-3xl font-bold mb-8">Page Not Found</h1>
                  <p className="text-muted-foreground">
                    The page you're looking for doesn't exist.
                  </p>
                </div>
              </Route>
            </Switch>
          </main>
          <Toaster />
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;