import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/ThemeProvider";
import { 
  Menu, 
  Sun, 
  Moon, 
  Code, 
  Palette, 
  TrendingUp, 
  Users, 
  Package, 
  Megaphone,
  ChevronDown,
  Search
} from "lucide-react";

const talentCategories = [
  { slug: "developers", name: "Developers", icon: Code, color: "#3B82F6" },
  { slug: "designers", name: "Designers", icon: Palette, color: "#8B5CF6" },
  { slug: "management-consultants", name: "Finance Experts", icon: TrendingUp, color: "#059669" },
  { slug: "project-managers", name: "Project Managers", icon: Users, color: "#DC2626" },
  { slug: "product-managers", name: "Product Managers", icon: Package, color: "#F59E0B" },
  { slug: "marketing", name: "Marketing", icon: Megaphone, color: "#EC4899" }
];

export function Navbar() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [showTalentMenu, setShowTalentMenu] = useState(false);

  const isActive = (path: string) => location === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TopSkyll
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Talent Menu */}
            <div 
              className="relative"
              onMouseEnter={() => setShowTalentMenu(true)}
              onMouseLeave={() => setShowTalentMenu(false)}
            >
              <button className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                <span>Hire Talent</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showTalentMenu && (
                <div className="absolute top-full left-0 mt-2 w-80 rounded-lg border bg-background/95 backdrop-blur shadow-lg z-50">
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-2">
                      {talentCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <Link 
                            key={category.slug} 
                            href={`/talents/${category.slug}`}
                            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors"
                          >
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${category.color}20` }}
                            >
                              <IconComponent 
                                className="h-5 w-5" 
                                style={{ color: category.color }}
                              />
                            </div>
                            <div>
                              <div className="text-sm font-medium">{category.name}</div>
                              <div className="text-xs text-muted-foreground">
                                Top 3% talent
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              href="/how-it-works"
              className={`text-sm font-medium transition-colors ${
                isActive("/how-it-works") 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              How It Works
            </Link>

            <Link 
              href="/top-3-percent"
              className={`text-sm font-medium transition-colors ${
                isActive("/top-3-percent") 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Top 3%
            </Link>

            <Link 
              href="/companies"
              className={`text-sm font-medium transition-colors ${
                isActive("/companies") 
                  ? "text-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              For Companies
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="h-4 w-4" />
            </Button>

            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log In
                </Button>
              </Link>
              <Link href="/apply">
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Apply as Talent
                </Button>
              </Link>
              <Link href="/hire">
                <Button size="sm">
                  Hire Talent
                </Button>
              </Link>
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Mobile Search */}
                  <div>
                    <Button variant="outline" className="w-full justify-start">
                      <Search className="h-4 w-4 mr-2" />
                      Search talents...
                    </Button>
                  </div>

                  {/* Talent Categories */}
                  <div>
                    <h3 className="text-sm font-medium mb-3">Hire Talent</h3>
                    <div className="space-y-2">
                      {talentCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                          <Link 
                            key={category.slug} 
                            href={`/talents/${category.slug}`}
                            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-colors"
                            onClick={() => setIsOpen(false)}
                          >
                            <div 
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: `${category.color}20` }}
                            >
                              <IconComponent 
                                className="h-4 w-4" 
                                style={{ color: category.color }}
                              />
                            </div>
                            <span className="text-sm">{category.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  {/* Navigation Links */}
                  <div className="space-y-2">
                    <Link 
                      href="/how-it-works"
                      className="block p-2 text-sm hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      How It Works
                    </Link>
                    <Link 
                      href="/top-3-percent"
                      className="block p-2 text-sm hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Top 3%
                    </Link>
                    <Link 
                      href="/companies"
                      className="block p-2 text-sm hover:bg-muted rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      For Companies
                    </Link>
                  </div>

                  {/* Auth Actions */}
                  <div className="space-y-2 pt-4 border-t">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">
                        Log In
                      </Button>
                    </Link>
                    <Link href="/apply" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                        Apply as Talent
                      </Button>
                    </Link>
                    <Link href="/hire" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">
                        Hire Talent
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}