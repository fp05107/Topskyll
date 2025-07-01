import { Request, Response } from 'express';
import { storage } from '../storage';
import { JobModel, JobWithCurrency } from '../models/Job';
import { CurrencyCode, SUPPORTED_CURRENCIES } from '../config/database';

export class JobController {
  // Get all jobs with filtering and currency conversion
  static async getAllJobs(req: Request, res: Response) {
    try {
      const {
        search,
        categoryId,
        categorySlug,
        experienceLevel,
        jobType,
        salaryMin,
        salaryMax,
        currency = 'USD'
      } = req.query;

      // Validate currency
      const preferredCurrency = (currency as CurrencyCode) in SUPPORTED_CURRENCIES 
        ? (currency as CurrencyCode) 
        : 'USD';

      // Build filter object
      const filters: any = {};
      
      if (search) filters.search = search as string;
      if (categoryId) filters.categoryId = parseInt(categoryId as string);
      if (experienceLevel) filters.experienceLevel = experienceLevel as string;
      if (jobType) filters.jobType = jobType as string;
      
      // Handle salary range filtering
      if (salaryMin || salaryMax) {
        filters.salaryMin = salaryMin ? parseInt(salaryMin as string) : undefined;
        filters.salaryMax = salaryMax ? parseInt(salaryMax as string) : undefined;
      }

      // Get jobs from storage
      let jobs = await storage.getAllJobs(filters);

      // Handle category slug filtering
      if (categorySlug) {
        const category = await storage.getJobCategoryBySlug(categorySlug as string);
        if (category) {
          jobs = await storage.getJobsByCategory(category.id);
        }
      }

      // Enrich jobs with currency information
      const enrichedJobs = jobs.map(job => JobModel.enrichJobWithSalaryInfo(job));

      // Apply salary filtering if specified
      let filteredJobs = enrichedJobs;
      if (filters.salaryMin || filters.salaryMax) {
        filteredJobs = JobModel.filterJobsBySalaryRange(
          enrichedJobs,
          filters.salaryMin,
          filters.salaryMax,
          preferredCurrency
        );
      }

      // Convert to preferred currency
      const jobsWithCurrency = JobModel.getJobsWithPreferredCurrency(filteredJobs, preferredCurrency);

      // Add category information
      const jobsWithCategories = await Promise.all(
        jobsWithCurrency.map(async (job) => {
          if (job.categoryId) {
            const category = await storage.getJobCategory(job.categoryId);
            return { ...job, category };
          }
          return job;
        })
      );

      res.json(jobsWithCategories);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      res.status(500).json({ error: 'Failed to fetch jobs' });
    }
  }

  // Get single job by ID
  static async getJobById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { currency = 'USD' } = req.query;

      const preferredCurrency = (currency as CurrencyCode) in SUPPORTED_CURRENCIES 
        ? (currency as CurrencyCode) 
        : 'USD';

      const job = await storage.getJob(parseInt(id));
      
      if (!job) {
        return res.status(404).json({ error: 'Job not found' });
      }

      // Enrich with currency information
      const enrichedJob = JobModel.enrichJobWithSalaryInfo(job);
      const jobWithCurrency = JobModel.convertSalaryToCurrency(enrichedJob, preferredCurrency);

      // Add category information
      if (jobWithCurrency.categoryId) {
        const category = await storage.getJobCategory(jobWithCurrency.categoryId);
        (jobWithCurrency as any).category = category;
      }

      res.json(jobWithCurrency);
    } catch (error) {
      console.error('Error fetching job:', error);
      res.status(500).json({ error: 'Failed to fetch job' });
    }
  }

  // Get jobs by category
  static async getJobsByCategory(req: Request, res: Response) {
    try {
      const { categoryId } = req.params;
      const { currency = 'USD' } = req.query;

      const preferredCurrency = (currency as CurrencyCode) in SUPPORTED_CURRENCIES 
        ? (currency as CurrencyCode) 
        : 'USD';

      const jobs = await storage.getJobsByCategory(parseInt(categoryId));
      
      // Enrich jobs with currency information
      const enrichedJobs = jobs.map(job => JobModel.enrichJobWithSalaryInfo(job));
      const jobsWithCurrency = JobModel.getJobsWithPreferredCurrency(enrichedJobs, preferredCurrency);

      res.json(jobsWithCurrency);
    } catch (error) {
      console.error('Error fetching jobs by category:', error);
      res.status(500).json({ error: 'Failed to fetch jobs by category' });
    }
  }

  // Create new job
  static async createJob(req: Request, res: Response) {
    try {
      const jobData = req.body;
      
      // Validate currency
      if (jobData.salaryCurrency && !(jobData.salaryCurrency in SUPPORTED_CURRENCIES)) {
        return res.status(400).json({ error: 'Invalid currency code' });
      }

      // Set default currency if not provided
      if (!jobData.salaryCurrency) {
        jobData.salaryCurrency = 'USD';
      }

      const newJob = await storage.createJob(jobData);
      const enrichedJob = JobModel.enrichJobWithSalaryInfo(newJob);

      res.status(201).json(enrichedJob);
    } catch (error) {
      console.error('Error creating job:', error);
      res.status(500).json({ error: 'Failed to create job' });
    }
  }

  // Get supported currencies
  static async getSupportedCurrencies(req: Request, res: Response) {
    try {
      res.json(SUPPORTED_CURRENCIES);
    } catch (error) {
      console.error('Error fetching currencies:', error);
      res.status(500).json({ error: 'Failed to fetch currencies' });
    }
  }

  // Get salary ranges for a specific currency
  static async getSalaryRanges(req: Request, res: Response) {
    try {
      const { currency = 'USD' } = req.query;
      
      const currencyCode = (currency as CurrencyCode) in SUPPORTED_CURRENCIES 
        ? (currency as CurrencyCode) 
        : 'USD';

      const ranges = JobModel.getPopularSalaryRanges(currencyCode);
      res.json(ranges);
    } catch (error) {
      console.error('Error fetching salary ranges:', error);
      res.status(500).json({ error: 'Failed to fetch salary ranges' });
    }
  }

  // Get job statistics
  static async getJobStats(req: Request, res: Response) {
    try {
      const { currency = 'USD' } = req.query;
      
      const preferredCurrency = (currency as CurrencyCode) in SUPPORTED_CURRENCIES 
        ? (currency as CurrencyCode) 
        : 'USD';

      const allJobs = await storage.getAllJobs();
      const categories = await storage.getAllJobCategories();

      // Calculate statistics
      const stats = {
        totalJobs: allJobs.length,
        totalCategories: categories.length,
        activeJobs: allJobs.filter(job => job.isActive).length,
        jobsByExperience: {
          entry: allJobs.filter(job => job.experienceLevel === 'entry').length,
          mid: allJobs.filter(job => job.experienceLevel === 'mid').length,
          senior: allJobs.filter(job => job.experienceLevel === 'senior').length,
        },
        averageSalary: this.calculateAverageSalary(allJobs, preferredCurrency),
        currency: preferredCurrency,
        currencySymbol: SUPPORTED_CURRENCIES[preferredCurrency].symbol,
      };

      res.json(stats);
    } catch (error) {
      console.error('Error fetching job stats:', error);
      res.status(500).json({ error: 'Failed to fetch job stats' });
    }
  }

  private static calculateAverageSalary(jobs: any[], currency: CurrencyCode): number {
    const jobsWithSalary = jobs.filter(job => job.salaryMin && job.salaryMax);
    
    if (jobsWithSalary.length === 0) return 0;

    const total = jobsWithSalary.reduce((sum, job) => {
      const enrichedJob = JobModel.enrichJobWithSalaryInfo(job);
      const convertedJob = JobModel.convertSalaryToCurrency(enrichedJob, currency);
      const avgSalary = ((convertedJob.salaryMin || 0) + (convertedJob.salaryMax || 0)) / 2;
      return sum + avgSalary;
    }, 0);

    return Math.round(total / jobsWithSalary.length);
  }
}