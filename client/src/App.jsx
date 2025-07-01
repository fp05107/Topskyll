import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import Home from "@/pages/Home.jsx";
import Jobs from "@/pages/Jobs.jsx";
import Companies from "@/pages/Companies.jsx";
import Resources from "@/pages/Resources.jsx";
import About from "@/pages/About.jsx";
import JobsByCategory from "@/pages/JobsByCategory.jsx";
import Login from "@/pages/Login.jsx";
import Signup from "@/pages/Signup.jsx";
import Profile from "@/pages/Profile.jsx";
import NotFound from "@/pages/not-found.jsx";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/jobs" component={Jobs} />
      <Route path="/companies" component={Companies} />
      <Route path="/resources" component={Resources} />
      <Route path="/about" component={About} />
      <Route path="/jobs/category/:slug" component={JobsByCategory} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen font-inter">
            <Navbar />
            <Toaster />
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;