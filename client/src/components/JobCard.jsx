import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function JobCard({ job }) {
  const formatSalary = (min, max, currency) => {
    if (!min || !max) return "Salary not specified";
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency || 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
    
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-slate-200 dark:border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {job.companyLogo && (
            <img 
              src={job.companyLogo} 
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-cover bg-slate-100 dark:bg-slate-800"
            />
          )}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {job.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {job.company}
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900 dark:text-slate-100">
            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {job.currency || 'USD'} per year
          </p>
        </div>
      </div>

      {/* Category Hierarchy */}
      <div className="mb-3">
        <div className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
          <span>{job.categoryName}</span>
          {job.subcategoryName && (
            <>
              <span>›</span>
              <span>{job.subcategoryName}</span>
            </>
          )}
          {job.specializationName && (
            <>
              <span>›</span>
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {job.specializationName}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
        {job.description}
      </p>

      {/* Skills */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-1">
          {job.skills?.slice(0, 6).map((skill, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className="text-xs px-2 py-1 bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
            >
              {skill}
            </Badge>
          ))}
          {job.skills?.length > 6 && (
            <Badge variant="outline" className="text-xs px-2 py-1">
              +{job.skills.length - 6} more
            </Badge>
          )}
        </div>
      </div>

      {/* Job Details */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <i className="fas fa-map-marker-alt"></i>
            <span>{job.location}</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-briefcase"></i>
            <span>{job.jobType}</span>
          </span>
          <span className="flex items-center space-x-1">
            <i className="fas fa-layer-group"></i>
            <span>{job.experienceLevel}</span>
          </span>
          {job.isRemote && (
            <Badge variant="secondary" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300">
              Remote
            </Badge>
          )}
        </div>
        <span>{getTimeAgo(job.postedAt)}</span>
      </div>

      {/* Benefits */}
      {job.benefits && job.benefits.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {job.benefits.slice(0, 3).map((benefit, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-xs px-2 py-1 bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-300"
              >
                {benefit}
              </Badge>
            ))}
            {job.benefits.length > 3 && (
              <Badge variant="outline" className="text-xs px-2 py-1">
                +{job.benefits.length - 3} benefits
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="text-xs">
            View Details
          </Button>
          <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700">
            Apply Now
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="text-xs text-slate-500 hover:text-slate-700">
          <i className="fas fa-bookmark mr-1"></i>
          Save
        </Button>
      </div>
    </Card>
  );
}