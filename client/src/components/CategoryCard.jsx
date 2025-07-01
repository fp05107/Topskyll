import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export function CategoryCard({ category, jobCount = 0 }) {
  return (
    <Link href={`/jobs/category/${category.slug}`}>
      <Card className="gradient-border hover:scale-105 transition-transform duration-300 cursor-pointer h-full">
        <div className="p-6 h-full">
          <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4`}>
            <i className={`${category.icon} text-white text-xl`}></i>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
            {category.name}
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">
            {category.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-primary font-medium">
              {jobCount} jobs
            </span>
            <i className="fas fa-arrow-right text-slate-400 group-hover:text-primary transition-colors"></i>
          </div>
        </div>
      </Card>
    </Link>
  );
}