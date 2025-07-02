import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap,
  Award,
  Code,
  Upload,
  Plus,
  X,
  CheckCircle,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function JobSeekerRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const totalSteps = 5;

  const categories = [
    'Software Development',
    'Data Science & Analytics', 
    'DevOps & Cloud',
    'Design & Creative',
    'Marketing & Sales',
    'Product Management',
    'Cybersecurity',
    'QA & Testing'
  ];

  const skillsSuggestions = [
    'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'PHP', 'Ruby',
    'HTML/CSS', 'TypeScript', 'Vue.js', 'Angular', 'Laravel', 'Django',
    'AWS', 'Docker', 'Kubernetes', 'MongoDB', 'PostgreSQL', 'MySQL',
    'Git', 'Linux', 'Machine Learning', 'TensorFlow', 'PyTorch'
  ];

  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (2-5 years)', 
    'Senior Level (5-10 years)',
    'Expert Level (10+ years)'
  ];

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addSuggestedSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills([...skills, skill]);
    }
  };

  const addPortfolioItem = () => {
    setPortfolioItems([...portfolioItems, { 
      title: '', 
      description: '', 
      url: '', 
      technologies: '' 
    }]);
  };

  const updatePortfolioItem = (index, field, value) => {
    const updated = portfolioItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setPortfolioItems(updated);
  };

  const removePortfolioItem = (index) => {
    setPortfolioItems(portfolioItems.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    setEducation([...education, {
      degree: '',
      school: '',
      year: '',
      field: ''
    }]);
  };

  const updateEducation = (index, field, value) => {
    const updated = education.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setEducation(updated);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    setExperience([...experience, {
      title: '',
      company: '',
      duration: '',
      description: ''
    }]);
  };

  const updateExperience = (index, field, value) => {
    const updated = experience.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setExperience(updated);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      skills,
      portfolioItems,
      education,
      experience,
      registrationType: 'jobseeker'
    };

    try {
      // Save to JSON file storage
      const response = await fetch('/api/register/jobseeker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      if (response.ok) {
        alert('Registration successful! Welcome to Topskyll.');
        // Redirect to profile or dashboard
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      alert('Registration failed. Please try again.');
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-2 mb-8">
      {[...Array(totalSteps)].map((_, index) => (
        <div key={index} className="flex items-center">
          <div className={`
            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
            ${currentStep > index + 1 
              ? 'bg-green-500 text-white' 
              : currentStep === index + 1 
                ? 'bg-blue-500 text-white' 
                : 'bg-slate-200 text-slate-500'
            }
          `}>
            {currentStep > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
          </div>
          {index < totalSteps - 1 && (
            <div className={`w-8 h-0.5 ${currentStep > index + 1 ? 'bg-green-500' : 'bg-slate-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Join as a Job Seeker
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
            Connect with top companies and find your dream remote tech job
          </p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <><User className="h-5 w-5" /> Personal Information</>}
                {currentStep === 2 && <><Briefcase className="h-5 w-5" /> Professional Profile</>}
                {currentStep === 3 && <><Code className="h-5 w-5" /> Skills & Expertise</>}
                {currentStep === 4 && <><GraduationCap className="h-5 w-5" /> Experience & Education</>}
                {currentStep === 5 && <><Award className="h-5 w-5" /> Portfolio & Final Details</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        First Name *
                      </label>
                      <Input
                        {...register('firstName', { required: 'First name is required' })}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Last Name *
                      </label>
                      <Input
                        {...register('lastName', { required: 'Last name is required' })}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        {...register('email', { 
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address'
                          }
                        })}
                        placeholder="john.doe@example.com"
                        className="pl-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          {...register('phone')}
                          placeholder="+91 9876543210"
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          {...register('location', { required: 'Location is required' })}
                          placeholder="City, Country"
                          className="pl-10"
                        />
                      </div>
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Password *
                    </label>
                    <Input
                      type="password"
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters'
                        }
                      })}
                      placeholder="Create a strong password"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Confirm Password *
                    </label>
                    <Input
                      type="password"
                      {...register('confirmPassword', { 
                        required: 'Please confirm your password',
                        validate: value => value === watch('password') || 'Passwords do not match'
                      })}
                      placeholder="Confirm your password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Professional Profile */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Professional Title *
                    </label>
                    <Input
                      {...register('title', { required: 'Professional title is required' })}
                      placeholder="e.g., Full Stack Developer, UX Designer"
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Primary Category *
                    </label>
                    <Select onValueChange={(value) => setValue('category', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Experience Level *
                    </label>
                    <Select onValueChange={(value) => setValue('experienceLevel', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Hourly Rate (USD) *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        type="number"
                        {...register('hourlyRateMin', { required: 'Minimum rate is required' })}
                        placeholder="Minimum rate"
                      />
                      <Input
                        type="number"
                        {...register('hourlyRateMax', { required: 'Maximum rate is required' })}
                        placeholder="Maximum rate"
                      />
                    </div>
                    {(errors.hourlyRateMin || errors.hourlyRateMax) && (
                      <p className="text-red-500 text-sm mt-1">Please specify your hourly rate range</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Professional Summary *
                    </label>
                    <Textarea
                      {...register('bio', { required: 'Professional summary is required' })}
                      placeholder="Describe your experience, expertise, and what makes you unique..."
                      rows={4}
                    />
                    {errors.bio && (
                      <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      {...register('isAvailable')}
                      id="availability"
                    />
                    <label htmlFor="availability" className="text-sm text-slate-700 dark:text-slate-300">
                      I am currently available for new projects
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Skills & Expertise */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Add Your Skills
                    </label>
                    <div className="flex gap-2 mb-4">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        placeholder="Enter a skill"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                      />
                      <Button type="button" onClick={addSkill}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Current Skills */}
                    {skills.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">Your Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                              {skill}
                              <X 
                                className="h-3 w-3 cursor-pointer" 
                                onClick={() => removeSkill(skill)}
                              />
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggested Skills */}
                    <div>
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                        Popular Skills (click to add):
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skillsSuggestions
                          .filter(skill => !skills.includes(skill))
                          .map((skill) => (
                            <Badge 
                              key={skill} 
                              variant="outline" 
                              className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900"
                              onClick={() => addSuggestedSkill(skill)}
                            >
                              {skill}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Languages
                    </label>
                    <Input
                      {...register('languages')}
                      placeholder="e.g., English (Native), Hindi (Fluent), Spanish (Conversational)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Timezone
                    </label>
                    <Input
                      {...register('timezone')}
                      placeholder="e.g., UTC+05:30 (IST)"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Experience & Education */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  {/* Work Experience */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Work Experience
                      </h3>
                      <Button type="button" onClick={addExperience} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Experience
                      </Button>
                    </div>

                    {experience.map((exp, index) => (
                      <Card key={index} className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Experience {index + 1}</h4>
                            <Button 
                              type="button" 
                              onClick={() => removeExperience(index)}
                              variant="ghost" 
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Job Title"
                              value={exp.title}
                              onChange={(e) => updateExperience(index, 'title', e.target.value)}
                            />
                            <Input
                              placeholder="Company Name"
                              value={exp.company}
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                            />
                          </div>
                          
                          <Input
                            placeholder="Duration (e.g., Jan 2020 - Present)"
                            value={exp.duration}
                            onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                            className="mt-4"
                          />
                          
                          <Textarea
                            placeholder="Describe your responsibilities and achievements..."
                            value={exp.description}
                            onChange={(e) => updateExperience(index, 'description', e.target.value)}
                            className="mt-4"
                            rows={3}
                          />
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Separator />

                  {/* Education */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Education
                      </h3>
                      <Button type="button" onClick={addEducation} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Education
                      </Button>
                    </div>

                    {education.map((edu, index) => (
                      <Card key={index} className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Education {index + 1}</h4>
                            <Button 
                              type="button" 
                              onClick={() => removeEducation(index)}
                              variant="ghost" 
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            />
                            <Input
                              placeholder="School/University"
                              value={edu.school}
                              onChange={(e) => updateEducation(index, 'school', e.target.value)}
                            />
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <Input
                              placeholder="Graduation Year"
                              value={edu.year}
                              onChange={(e) => updateEducation(index, 'year', e.target.value)}
                            />
                            <Input
                              placeholder="Field of Study"
                              value={edu.field}
                              onChange={(e) => updateEducation(index, 'field', e.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Portfolio & Final Details */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  {/* Portfolio */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        Portfolio Projects
                      </h3>
                      <Button type="button" onClick={addPortfolioItem} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Add Project
                      </Button>
                    </div>

                    {portfolioItems.map((item, index) => (
                      <Card key={index} className="mb-4">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="font-medium">Project {index + 1}</h4>
                            <Button 
                              type="button" 
                              onClick={() => removePortfolioItem(index)}
                              variant="ghost" 
                              size="sm"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="space-y-4">
                            <Input
                              placeholder="Project Title"
                              value={item.title}
                              onChange={(e) => updatePortfolioItem(index, 'title', e.target.value)}
                            />
                            
                            <Textarea
                              placeholder="Project Description"
                              value={item.description}
                              onChange={(e) => updatePortfolioItem(index, 'description', e.target.value)}
                              rows={3}
                            />
                            
                            <Input
                              placeholder="Project URL (optional)"
                              value={item.url}
                              onChange={(e) => updatePortfolioItem(index, 'url', e.target.value)}
                            />
                            
                            <Input
                              placeholder="Technologies Used"
                              value={item.technologies}
                              onChange={(e) => updatePortfolioItem(index, 'technologies', e.target.value)}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Separator />

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        LinkedIn Profile
                      </label>
                      <Input
                        {...register('linkedin')}
                        placeholder="https://linkedin.com/in/yourprofile"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        GitHub Profile
                      </label>
                      <Input
                        {...register('github')}
                        placeholder="https://github.com/yourusername"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Personal Website
                      </label>
                      <Input
                        {...register('website')}
                        placeholder="https://yourwebsite.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Resume Upload
                      </label>
                      <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                        <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                        <p className="text-slate-600 dark:text-slate-400">
                          Upload your resume (PDF, DOC, DOCX)
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          {...register('resume')}
                          className="hidden"
                          id="resume-upload"
                        />
                        <Button type="button" variant="outline" className="mt-2" onClick={() => document.getElementById('resume-upload').click()}>
                          Choose File
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Complete Registration
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}