import { CurrencyCode, convertCurrency, getSalaryRange, SUPPORTED_CURRENCIES } from "../config/database";

export interface JobWithCurrency {
  id: number;
  title: string;
  company: string;
  companyLogo?: string;
  description: string;
  requirements?: string[];
  skills?: string[];
  location: string;
  jobType: string;
  experienceLevel: string;
  salaryMin?: number;
  salaryMax?: number;
  salaryCurrency: CurrencyCode;
  benefits?: string[];
  applicationUrl?: string;
  categoryId?: number;
  isActive: boolean;
  postedAt: Date;
}

export class JobModel {
  static convertSalaryToCurrency(job: JobWithCurrency, targetCurrency: CurrencyCode): JobWithCurrency {
    if (job.salaryCurrency === targetCurrency) {
      return job;
    }

    const convertedJob = { ...job };
    
    if (job.salaryMin) {
      convertedJob.salaryMin = Math.round(convertCurrency(job.salaryMin, job.salaryCurrency, targetCurrency));
    }
    
    if (job.salaryMax) {
      convertedJob.salaryMax = Math.round(convertCurrency(job.salaryMax, job.salaryCurrency, targetCurrency));
    }
    
    convertedJob.salaryCurrency = targetCurrency;
    
    return convertedJob;
  }

  static formatJobSalary(job: JobWithCurrency): string {
    return getSalaryRange(job.salaryMin || 0, job.salaryMax || 0, job.salaryCurrency);
  }

  static getJobsWithPreferredCurrency(jobs: JobWithCurrency[], preferredCurrency: CurrencyCode = 'USD'): JobWithCurrency[] {
    return jobs.map(job => this.convertSalaryToCurrency(job, preferredCurrency));
  }

  static filterJobsBySalaryRange(
    jobs: JobWithCurrency[], 
    minSalary?: number, 
    maxSalary?: number, 
    currency: CurrencyCode = 'USD'
  ): JobWithCurrency[] {
    if (!minSalary && !maxSalary) return jobs;

    return jobs.filter(job => {
      // Convert job salary to the filter currency for comparison
      const convertedJob = this.convertSalaryToCurrency(job, currency);
      
      const jobMin = convertedJob.salaryMin || 0;
      const jobMax = convertedJob.salaryMax || jobMin;
      
      if (minSalary && maxSalary) {
        // Job range should overlap with filter range
        return jobMax >= minSalary && jobMin <= maxSalary;
      } else if (minSalary) {
        return jobMax >= minSalary;
      } else if (maxSalary) {
        return jobMin <= maxSalary;
      }
      
      return true;
    });
  }

  static enrichJobWithSalaryInfo(job: any): JobWithCurrency {
    // Add currency information if not present
    if (!job.salaryCurrency) {
      // Default to USD for legacy jobs
      job.salaryCurrency = 'USD';
    }

    // Add formatted salary display
    job.formattedSalary = this.formatJobSalary(job);
    
    return job as JobWithCurrency;
  }

  static getPopularSalaryRanges(currency: CurrencyCode = 'USD') {
    const currencySymbol = SUPPORTED_CURRENCIES[currency].symbol;
    
    if (currency === 'INR') {
      return [
        { label: `${currencySymbol}3-5 LPA`, value: "300000-500000", min: 300000, max: 500000 },
        { label: `${currencySymbol}5-8 LPA`, value: "500000-800000", min: 500000, max: 800000 },
        { label: `${currencySymbol}8-12 LPA`, value: "800000-1200000", min: 800000, max: 1200000 },
        { label: `${currencySymbol}12-18 LPA`, value: "1200000-1800000", min: 1200000, max: 1800000 },
        { label: `${currencySymbol}18-25 LPA`, value: "1800000-2500000", min: 1800000, max: 2500000 },
        { label: `${currencySymbol}25+ LPA`, value: "2500000-", min: 2500000, max: undefined },
      ];
    } else if (currency === 'USD') {
      return [
        { label: `${currencySymbol}30K-50K`, value: "30000-50000", min: 30000, max: 50000 },
        { label: `${currencySymbol}50K-75K`, value: "50000-75000", min: 50000, max: 75000 },
        { label: `${currencySymbol}75K-100K`, value: "75000-100000", min: 75000, max: 100000 },
        { label: `${currencySymbol}100K-150K`, value: "100000-150000", min: 100000, max: 150000 },
        { label: `${currencySymbol}150K-200K`, value: "150000-200000", min: 150000, max: 200000 },
        { label: `${currencySymbol}200K+`, value: "200000-", min: 200000, max: undefined },
      ];
    } else {
      // Generic ranges for other currencies
      return [
        { label: `${currencySymbol}25K-40K`, value: "25000-40000", min: 25000, max: 40000 },
        { label: `${currencySymbol}40K-60K`, value: "40000-60000", min: 40000, max: 60000 },
        { label: `${currencySymbol}60K-80K`, value: "60000-80000", min: 60000, max: 80000 },
        { label: `${currencySymbol}80K-120K`, value: "80000-120000", min: 80000, max: 120000 },
        { label: `${currencySymbol}120K+`, value: "120000-", min: 120000, max: undefined },
      ];
    }
  }
}