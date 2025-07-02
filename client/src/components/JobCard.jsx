import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function JobCard({ job, onApply }) {
  const [isSaved, setIsSaved] = useState(false);

  const formatSalary = (min, max, currency = 'USD') => {
    if (!min && !max) return "Salary not disclosed";
    
    const formatAmount = (amount) => {
      if (currency === 'INR') {
        if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
        if (amount >= 100000) return `₹${(amount / 100000).toFixed(0)}L`;
        return `₹${amount.toLocaleString()}`;
      } else if (currency === 'USD') {
        if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
        return `$${amount.toLocaleString()}`;
      } else if (currency === 'EUR') {
        if (amount >= 1000000) return `€${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `€${(amount / 1000).toFixed(0)}K`;
        return `€${amount.toLocaleString()}`;
      } else if (currency === 'GBP') {
        if (amount >= 1000000) return `£${(amount / 1000000).toFixed(1)}M`;
        if (amount >= 1000) return `£${(amount / 1000).toFixed(0)}K`;
        return `£${amount.toLocaleString()}`;
      } else {
        return `${amount.toLocaleString()}`;
      }
    };

    if (min && max) {
      return `${formatAmount(min)}-${formatAmount(max)} / year`;
    }
    return `${formatAmount(min || max)} / year`;
  };

  const getCompanyInitial = (company) => {
    const companyName = typeof company === 'string' ? company : company?.name || 'C';
    return companyName.charAt(0).toUpperCase();
  };

  const getDaysAgo = (date) => {
    if (!date) return "Recently posted";
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - new Date(date).getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card className="hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {getCompanyInitial(job.company)}
              </span>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-1 group-hover:text-primary transition-colors">
                {job.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {typeof job.company === 'string' ? job.company : (job.company?.name || 'Company')}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
            className="text-slate-400 hover:text-red-500 transition-colors"
          >
            <i className={isSaved ? "fas fa-heart text-red-500" : "far fa-heart"}></i>
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {job.skills?.slice(0, 3).map((skill, index) => (
            <Badge key={index} variant="secondary" className="font-medium">
              {skill}
            </Badge>
          ))}
          {job.skills && job.skills.length > 3 && (
            <Badge variant="outline" className="font-medium">
              +{job.skills.length - 3} more
            </Badge>
          )}
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
          {job.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <i className="fas fa-map-marker-alt mr-1"></i>
              {job.location}
            </span>
            <span className="flex items-center">
              <i className="fas fa-clock mr-1"></i>
              {job.jobType}
            </span>
            <span className="flex items-center">
              <i className="fas fa-calendar mr-1"></i>
              {getDaysAgo(job.postedAt)}
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              {job.formattedSalary || formatSalary(job.salaryMin, job.salaryMax, job.salaryCurrency)}
            </span>
            {job.salaryCurrency && job.salaryCurrency !== 'USD' && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                in {job.salaryCurrency}
              </div>
            )}
          </div>
          <Button 
            onClick={() => onApply?.(job)}
            className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
          >
            Apply Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}