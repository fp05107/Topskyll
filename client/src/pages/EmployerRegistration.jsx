import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Building, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  DollarSign,
  Globe,
  Upload,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  User,
  Briefcase
} from 'lucide-react';

export default function EmployerRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();

  const totalSteps = 4;

  const companySizes = [
    '1-10 employees (Startup)',
    '11-50 employees (Small)',
    '51-200 employees (Medium)',
    '201-1000 employees (Large)',
    '1000+ employees (Enterprise)'
  ];

  const industries = [
    'Technology',
    'Financial Services',
    'Healthcare',
    'E-commerce',
    'Education',
    'Consulting',
    'Media & Entertainment',
    'Manufacturing',
    'Real Estate',
    'Non-profit',
    'Government',
    'Other'
  ];

  const fundingStages = [
    'Pre-seed',
    'Seed',
    'Series A',
    'Series B',
    'Series C+',
    'IPO',
    'Bootstrapped',
    'Not Applicable'
  ];

  const hiringNeeds = [
    'Software Developers',
    'Designers',
    'Data Scientists',
    'Marketing Experts',
    'Project Managers',
    'DevOps Engineers',
    'AI/ML Engineers',
    'Cybersecurity Experts',
    'Product Managers',
    'Sales Representatives'
  ];

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
      registrationType: 'employer'
    };

    try {
      const response = await fetch('/api/register/employer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData)
      });

      if (response.ok) {
        alert('Registration successful! Welcome to Topskyll.');
        // Redirect to company dashboard
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
            Join as an Employer
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
            Access the top 3% of global tech talent for your projects
          </p>
        </div>

        {renderStepIndicator()}

        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {currentStep === 1 && <><User className="h-5 w-5" /> Contact Information</>}
                {currentStep === 2 && <><Building className="h-5 w-5" /> Company Details</>}
                {currentStep === 3 && <><Briefcase className="h-5 w-5" /> Hiring Requirements</>}
                {currentStep === 4 && <><CheckCircle className="h-5 w-5" /> Verification & Final Details</>}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              
              {/* Step 1: Contact Information */}
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
                      Work Email Address *
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
                        placeholder="john.doe@company.com"
                        className="pl-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Please use your company email address
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          {...register('phone', { required: 'Phone number is required' })}
                          placeholder="+1 (555) 123-4567"
                          className="pl-10"
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Job Title *
                      </label>
                      <Input
                        {...register('jobTitle', { required: 'Job title is required' })}
                        placeholder="e.g., CTO, HR Manager, Founder"
                      />
                      {errors.jobTitle && (
                        <p className="text-red-500 text-sm mt-1">{errors.jobTitle.message}</p>
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

              {/* Step 2: Company Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        {...register('companyName', { required: 'Company name is required' })}
                        placeholder="Your Company Name"
                        className="pl-10"
                      />
                    </div>
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company Website *
                    </label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input
                        {...register('website', { required: 'Company website is required' })}
                        placeholder="https://yourcompany.com"
                        className="pl-10"
                      />
                    </div>
                    {errors.website && (
                      <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Industry *
                      </label>
                      <Select onValueChange={(value) => setValue('industry', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {industries.map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Company Size *
                      </label>
                      <Select onValueChange={(value) => setValue('companySize', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          {companySizes.map((size) => (
                            <SelectItem key={size} value={size}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Company Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          {...register('location', { required: 'Company location is required' })}
                          placeholder="City, Country"
                          className="pl-10"
                        />
                      </div>
                      {errors.location && (
                        <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Funding Stage
                      </label>
                      <Select onValueChange={(value) => setValue('fundingStage', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select funding stage" />
                        </SelectTrigger>
                        <SelectContent>
                          {fundingStages.map((stage) => (
                            <SelectItem key={stage} value={stage}>
                              {stage}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company Description *
                    </label>
                    <Textarea
                      {...register('description', { required: 'Company description is required' })}
                      placeholder="Tell us about your company, what you do, and your mission..."
                      rows={4}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Company Logo
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Upload your company logo (PNG, JPG, SVG)
                      </p>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg"
                        {...register('logo')}
                        className="hidden"
                        id="logo-upload"
                      />
                      <Button type="button" variant="outline" className="mt-2" onClick={() => document.getElementById('logo-upload').click()}>
                        Choose File
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Hiring Requirements */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                      What types of talent are you looking to hire? *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {hiringNeeds.map((need) => (
                        <div key={need} className="flex items-center space-x-2">
                          <Checkbox
                            {...register('hiringNeeds')}
                            value={need}
                            id={`need-${need}`}
                          />
                          <label htmlFor={`need-${need}`} className="text-sm text-slate-700 dark:text-slate-300">
                            {need}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Expected Budget Range (USD/month) *
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          type="number"
                          {...register('budgetMin', { required: 'Minimum budget is required' })}
                          placeholder="Min"
                        />
                        <Input
                          type="number"
                          {...register('budgetMax', { required: 'Maximum budget is required' })}
                          placeholder="Max"
                        />
                      </div>
                      {(errors.budgetMin || errors.budgetMax) && (
                        <p className="text-red-500 text-sm mt-1">Please specify your budget range</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                        How many hires per month?
                      </label>
                      <Select onValueChange={(value) => setValue('hiringVolume', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Expected hiring volume" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 hires</SelectItem>
                          <SelectItem value="3-5">3-5 hires</SelectItem>
                          <SelectItem value="6-10">6-10 hires</SelectItem>
                          <SelectItem value="10+">10+ hires</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Preferred Work Arrangement
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          {...register('workArrangement')}
                          value="remote"
                          id="remote"
                        />
                        <label htmlFor="remote" className="text-sm text-slate-700 dark:text-slate-300">
                          Remote Only
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          {...register('workArrangement')}
                          value="hybrid"
                          id="hybrid"
                        />
                        <label htmlFor="hybrid" className="text-sm text-slate-700 dark:text-slate-300">
                          Hybrid
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          {...register('workArrangement')}
                          value="onsite"
                          id="onsite"
                        />
                        <label htmlFor="onsite" className="text-sm text-slate-700 dark:text-slate-300">
                          On-site
                        </label>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Project Timeline Preference
                    </label>
                    <Select onValueChange={(value) => setValue('timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select typical project duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="short">Short-term (1-3 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (3-6 months)</SelectItem>
                        <SelectItem value="long">Long-term (6+ months)</SelectItem>
                        <SelectItem value="permanent">Permanent positions</SelectItem>
                        <SelectItem value="flexible">Flexible based on project</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Specific Requirements or Notes
                    </label>
                    <Textarea
                      {...register('requirements')}
                      placeholder="Any specific skills, experience levels, or requirements you're looking for..."
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Verification & Final Details */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                      Account Verification
                    </h3>
                    <p className="text-blue-800 dark:text-blue-200 text-sm">
                      To ensure the quality of our platform, we manually verify all employer accounts. 
                      This process typically takes 24-48 hours.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      LinkedIn Company Page
                    </label>
                    <Input
                      {...register('linkedinPage')}
                      placeholder="https://linkedin.com/company/yourcompany"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      How did you hear about Topskyll?
                    </label>
                    <Select onValueChange={(value) => setValue('referralSource', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="google">Google Search</SelectItem>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="referral">Referral from colleague</SelectItem>
                        <SelectItem value="blog">Blog/Article</SelectItem>
                        <SelectItem value="conference">Conference/Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Business Registration Document (Optional)
                    </label>
                    <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-600 dark:text-slate-400">
                        Upload business registration or incorporation document (PDF)
                      </p>
                      <input
                        type="file"
                        accept=".pdf"
                        {...register('businessDoc')}
                        className="hidden"
                        id="business-doc-upload"
                      />
                      <Button type="button" variant="outline" className="mt-2" onClick={() => document.getElementById('business-doc-upload').click()}>
                        Choose File
                      </Button>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      This helps speed up the verification process
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        {...register('termsAccepted', { required: 'You must accept the terms and conditions' })}
                        id="terms"
                      />
                      <label htmlFor="terms" className="text-sm text-slate-700 dark:text-slate-300">
                        I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    {errors.termsAccepted && (
                      <p className="text-red-500 text-sm">{errors.termsAccepted.message}</p>
                    )}

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        {...register('marketingConsent')}
                        id="marketing"
                      />
                      <label htmlFor="marketing" className="text-sm text-slate-700 dark:text-slate-300">
                        I would like to receive marketing updates and talent recommendations from Topskyll
                      </label>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
                    <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                      What happens next?
                    </h4>
                    <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                      <li>• Your account will be reviewed within 24-48 hours</li>
                      <li>• You'll receive an email confirmation once approved</li>
                      <li>• You can then start posting jobs and browsing talent</li>
                      <li>• Our team will reach out to help you get started</li>
                    </ul>
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
                    Submit Application
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