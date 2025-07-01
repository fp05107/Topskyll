import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { JobCard } from "@/components/JobCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Job, JobCategory } from "@shared/schema";

export default function JobsByCategory() {
  const [, params] = useRoute("/jobs/category/:slug");
  const slug = params?.slug;

  const { data: category } = useQuery<JobCategory>({
    queryKey: [`/api/job-categories/${slug}`],
    enabled: !!slug,
  });

  const { data: jobs = [], isLoading } = useQuery<Job[]>({
    queryKey: [`/api/categories/${category?.id}/jobs`],
    enabled: !!category?.id,
  });

  if (!slug) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">
      <p className="text-slate-600 dark:text-slate-400">Category not found</p>
    </div>;
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Category Header */}
        {category && (
          <div className="text-center mb-12">
            <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
              <i className={`${category.icon} text-white text-3xl`}></i>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              {category.name} Jobs
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4">
              {category.description}
            </p>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {jobs.length} jobs available
            </Badge>
          </div>
        )}

        {/* Job Listings */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 animate-pulse">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-slate-300 dark:bg-slate-700 rounded-xl"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded mb-2"></div>
                    <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
                  <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-1/3"></div>
                  <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-briefcase text-3xl text-slate-400"></i>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
              No jobs available yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              We're working hard to bring you the best {category?.name.toLowerCase()} opportunities. Check back soon!
            </p>
            <Button href="/jobs">
              Browse All Jobs
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
