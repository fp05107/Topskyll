import { useParams, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Calendar,
  Building,
  Users,
  Star,
  Send,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Globe,
  Briefcase,
  GraduationCap,
  Target
} from 'lucide-react';

export default function JobDetails() {
  const { id } = useParams();

  const { data: job, isLoading, error } = useQuery({
    queryKey: [`/api/jobs/${id}`],
    enabled: !!id
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white dark:bg-slate-800 rounded-lg h-96 animate-pulse" />
        </div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          <Card>
            <CardContent className="p-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
                Job Not Found
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                The job posting you're looking for doesn't exist or has been removed.
              </p>
              <Link href="/jobs">
                <Button>Browse All Jobs</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Job Header */}
      <div className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Company Logo */}
            <div className="flex-shrink-0">
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                <Building className="h-10 w-10 lg:h-12 lg:w-12 text-slate-400" />
              </div>
            </div>

            {/* Job Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
                    {job.title}
                  </h1>
                  <p className="text-xl text-blue-600 dark:text-blue-400 mt-2">
                    Company Name
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {job.location || 'Remote'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        {job.jobType}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        ${job.budgetMin?.toLocaleString()} - ${job.budgetMax?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-slate-400" />
                      <span className="text-slate-600 dark:text-slate-400">
                        Posted {new Date(job.postedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Job Type & Experience Level */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {job.jobType}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      {job.experienceLevel}
                    </Badge>
                    {job.isRemote && (
                      <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        Remote
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                    <Send className="h-4 w-4 mr-2" />
                    Apply Now
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {job.description}
                  </p>
                  
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
                    What You'll Do:
                  </h4>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    <li>• Design and develop scalable web applications</li>
                    <li>• Collaborate with cross-functional teams</li>
                    <li>• Write clean, maintainable code</li>
                    <li>• Participate in code reviews and architectural decisions</li>
                    <li>• Optimize application performance and user experience</li>
                  </ul>

                  <h4 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mt-6 mb-3">
                    What We Offer:
                  </h4>
                  <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                    <li>• Competitive salary and equity package</li>
                    <li>• Flexible working hours and remote options</li>
                    <li>• Professional development opportunities</li>
                    <li>• Health, dental, and vision insurance</li>
                    <li>• Modern tech stack and tools</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">
                      Required Skills:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {job.skillsRequired?.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Experience Requirements:
                    </h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        5+ years of experience in software development
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Strong proficiency in modern JavaScript frameworks
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Experience with cloud platforms (AWS, GCP, or Azure)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Bachelor's degree in Computer Science or related field
                      </li>
                    </ul>
                  </div>

                  <Separator />

                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      Nice to Have:
                    </h4>
                    <ul className="space-y-2 text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-2">
                        <div className="w-4 h-4 border border-slate-300 dark:border-slate-600 rounded mt-0.5 flex-shrink-0" />
                        Experience with microservices architecture
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-4 h-4 border border-slate-300 dark:border-slate-600 rounded mt-0.5 flex-shrink-0" />
                        Knowledge of DevOps practices
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-4 h-4 border border-slate-300 dark:border-slate-600 rounded mt-0.5 flex-shrink-0" />
                        Previous startup experience
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  About the Company
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    We are a fast-growing technology company focused on revolutionizing the way 
                    businesses operate. Our mission is to build innovative solutions that help 
                    companies scale efficiently and improve their bottom line.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="font-semibold text-slate-900 dark:text-slate-100">50-200</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Employees</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <Building className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Series B</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Funding Stage</div>
                    </div>
                    <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                      <Globe className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <div className="font-semibold text-slate-900 dark:text-slate-100">Global</div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">Remote-First</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardHeader>
                <CardTitle>Apply for this Position</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                  <Send className="h-5 w-5 mr-2" />
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  <Heart className="h-4 w-4 mr-2" />
                  Save Job
                </Button>
                
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
                    Join 25 other applicants
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Job Type:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {job.jobType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Experience:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {job.experienceLevel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Location:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {job.location || 'Remote'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Salary:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    ${job.budgetMin?.toLocaleString()} - ${job.budgetMax?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Posted:</span>
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {new Date(job.postedAt).toLocaleDateString()}
                  </span>
                </div>
                {job.deadline && (
                  <div className="flex justify-between">
                    <span className="text-slate-600 dark:text-slate-400">Deadline:</span>
                    <span className="font-medium text-red-600 dark:text-red-400">
                      {new Date(job.deadline).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Skills Required */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Skills Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {job.skillsRequired?.map((skill) => (
                    <div key={skill} className="flex items-center justify-between">
                      <Badge variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <Star className="h-3 w-3 text-slate-300" />
                        <Star className="h-3 w-3 text-slate-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Similar Jobs */}
            <Card>
              <CardHeader>
                <CardTitle>Similar Jobs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[1, 2, 3].map((jobItem) => (
                    <div key={jobItem} className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                        Similar Position {jobItem}
                      </h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        Company Name • Remote
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500 dark:text-slate-400">$80k - $120k</span>
                        <span className="text-slate-500 dark:text-slate-400">2 days ago</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View All Similar Jobs
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}