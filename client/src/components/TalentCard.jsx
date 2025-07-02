import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TalentCard({ talent }) {
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-200 border-slate-200 dark:border-slate-700">
      <div className="flex items-start space-x-4">
        {/* Avatar and Verification */}
        <div className="relative">
          <Avatar className="w-16 h-16">
            <AvatarImage src={talent.avatar} alt={talent.name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400">
              {talent.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {talent.isTopTalent && (
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <i className="fas fa-check text-white text-xs"></i>
            </div>
          )}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 truncate">
                {talent.name}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                {talent.title}
              </p>
              <div className="flex items-center space-x-2 mb-3">
                <i className="fas fa-map-marker-alt text-slate-400 text-xs"></i>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {talent.location}
                </span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {talent.timezone}
                </span>
              </div>
            </div>
            
            {/* Rating and Verification Badge */}
            <div className="text-right">
              <div className="flex items-center space-x-1 mb-1">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fas fa-star text-xs ${
                        i < Math.floor(talent.rating) ? "text-yellow-400" : "text-slate-300"
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {talent.rating}
                </span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {talent.totalReviews} reviews
              </div>
              {talent.verificationLevel && (
                <Badge variant="secondary" className="text-xs mt-1 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  {talent.verificationLevel}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
            {talent.description}
          </p>
          
          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {talent.skills?.slice(0, 6).map((skill, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs px-2 py-1 bg-slate-50 border-slate-200 text-slate-600 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300"
                >
                  {skill}
                </Badge>
              ))}
              {talent.skills?.length > 6 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{talent.skills.length - 6}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <i className="fas fa-clock"></i>
                <span>{talent.responseTime}</span>
              </span>
              <span className="flex items-center space-x-1">
                <i className="fas fa-project-diagram"></i>
                <span>{talent.completedProjects || 0} projects</span>
              </span>
              <span className="flex items-center space-x-1">
                <i className="fas fa-percentage"></i>
                <span>{talent.clientRetentionRate || 95}% success</span>
              </span>
            </div>
            <div className="text-slate-500 dark:text-slate-400">
              Member since {new Date(talent.toptalMemberSince).getFullYear()}
            </div>
          </div>
          
          {/* Rate and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                ${talent.hourlyRate}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">/hr {talent.currency}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="text-xs">
                View Profile
              </Button>
              <Button size="sm" className="text-xs bg-blue-600 hover:bg-blue-700">
                Contact
              </Button>
            </div>
          </div>
          
          {/* Availability Status */}
          <div className="mt-3 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              talent.availability === "Available Now" 
                ? "bg-green-500" 
                : "bg-yellow-500"
            }`}></div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {talent.availability}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}