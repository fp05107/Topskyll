import { Express, Request, Response } from "express";
import { Server } from "http";
import { createServer } from "http";
// Using simple storage for compatibility
// import { storage } from "./storage";
import { TALENT_DATA, CATEGORY_DATA } from "./storage-simple";

// Load job-related JSON data
import { readFileSync } from 'fs';
import { join } from 'path';

const JOB_CATEGORY_DATA = JSON.parse(readFileSync(join(process.cwd(), 'server/data/job-categories.json'), 'utf-8'));
const JOBS_DATA = JSON.parse(readFileSync(join(process.cwd(), 'server/data/jobs.json'), 'utf-8'));
// Remove schema imports to avoid TypeScript issues during migration
// import { insertTalentSchema, insertCompanySchema, insertJobSchema, insertProposalSchema } from "../shared/schema";

// Simple storage replacements for migration
const getTalentCategoryBySlug = (slug: string) => {
  return CATEGORY_DATA.find(cat => cat.slug === slug);
};

const getTalentById = (id: number) => {
  return TALENT_DATA.find(t => t.id === id);
};

const getAllTalents = (filters?: any) => {
  let results = TALENT_DATA;
  
  if (filters?.category) {
    results = results.filter(t => t.categories.includes(filters.category));
  }
  
  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    results = results.filter(t => 
      t.name.toLowerCase().includes(searchTerm) ||
      t.title.toLowerCase().includes(searchTerm) ||
      t.skills.some(skill => skill.toLowerCase().includes(searchTerm))
    );
  }
  
  return results;
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Talent Categories
  app.get("/api/talent-categories", async (req: Request, res: Response) => {
    try {
      // Return enhanced Toptal-style categories with rich data
      res.json(CATEGORY_DATA);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch talent categories" });
    }
  });

  app.get("/api/talent-categories/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = getTalentCategoryBySlug(slug);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  // Talents
  app.get("/api/talents", async (req: Request, res: Response) => {
    try {
      // Return enhanced Toptal-style talent data
      let talents = [...TALENT_DATA];
      
      // Apply simple filtering
      if (req.query.category) {
        const category = req.query.category as string;
        talents = talents.filter(talent => 
          talent.categories.some(cat => cat.toLowerCase().includes(category.toLowerCase()))
        );
      }
      
      if (req.query.search) {
        const search = (req.query.search as string).toLowerCase();
        talents = talents.filter(talent => 
          talent.name.toLowerCase().includes(search) ||
          talent.title.toLowerCase().includes(search) ||
          talent.skills.some(skill => skill.toLowerCase().includes(search))
        );
      }
      
      res.json(talents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch talents" });
    }
  });

  app.get("/api/talents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const talent = TALENT_DATA.find(t => t.id === id);
      if (!talent) {
        return res.status(404).json({ error: "Talent not found" });
      }
      res.json(talent);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch talent" });
    }
  });

  app.post("/api/talents", async (req: Request, res: Response) => {
    try {
      // Temporarily disabled during migration
      res.status(501).json({ error: "Create talent endpoint not yet implemented" });
    } catch (error) {
      res.status(400).json({ error: "Invalid talent data" });
    }
  });

  // Companies
  app.get("/api/companies", async (req: Request, res: Response) => {
    try {
      // Return simple company data for migration
      const companies = [
        { id: 1, name: "TechCorp", description: "Leading tech company", isVerified: true },
        { id: 2, name: "StartupHQ", description: "Innovative startup", isVerified: false }
      ];
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      // Simple company lookup for migration
      const companies = [
        { id: 1, name: "TechCorp", description: "Leading tech company", isVerified: true },
        { id: 2, name: "StartupHQ", description: "Innovative startup", isVerified: false }
      ];
      const company = companies.find(c => c.id === id);
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch company" });
    }
  });

  app.post("/api/companies", async (req: Request, res: Response) => {
    try {
      // Temporarily disabled during migration
      res.status(501).json({ error: "Create company endpoint not yet implemented" });
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ error: "Invalid company data" });
    }
  });

  // Job Categories - Hierarchical system
  app.get("/api/job-categories", async (req: Request, res: Response) => {
    try {
      res.json(JOB_CATEGORY_DATA);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job categories" });
    }
  });

  app.get("/api/job-categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const category = JOB_CATEGORY_DATA.find(cat => cat.id === id);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch category" });
    }
  });

  app.get("/api/job-categories/:categoryId/subcategories", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const category = JOB_CATEGORY_DATA.find(cat => cat.id === categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      res.json(category.subcategories || []);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subcategories" });
    }
  });

  app.get("/api/job-categories/:categoryId/subcategories/:subcategoryId/specializations", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const subcategoryId = parseInt(req.params.subcategoryId);
      
      const category = JOB_CATEGORY_DATA.find(cat => cat.id === categoryId);
      if (!category) {
        return res.status(404).json({ error: "Category not found" });
      }
      
      const subcategory = category.subcategories?.find(sub => sub.id === subcategoryId);
      if (!subcategory) {
        return res.status(404).json({ error: "Subcategory not found" });
      }
      
      res.json(subcategory.specializations || []);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch specializations" });
    }
  });

  // Jobs with hierarchical filtering
  app.get("/api/jobs", async (req: Request, res: Response) => {
    try {
      let jobs = [...JOBS_DATA];
      
      // Apply hierarchical filters
      if (req.query.categoryId) {
        const categoryId = parseInt(req.query.categoryId as string);
        jobs = jobs.filter(job => job.categoryId === categoryId);
      }
      
      if (req.query.subcategoryId) {
        const subcategoryId = parseInt(req.query.subcategoryId as string);
        jobs = jobs.filter(job => job.subcategoryId === subcategoryId);
      }
      
      if (req.query.specializationId) {
        const specializationId = parseInt(req.query.specializationId as string);
        jobs = jobs.filter(job => job.specializationId === specializationId);
      }
      
      // Apply other filters
      if (req.query.experienceLevel) {
        const experienceLevel = req.query.experienceLevel as string;
        jobs = jobs.filter(job => job.experienceLevel === experienceLevel);
      }
      
      if (req.query.jobType) {
        const jobType = req.query.jobType as string;
        jobs = jobs.filter(job => job.jobType === jobType);
      }
      
      if (req.query.isRemote) {
        const isRemote = req.query.isRemote === 'true';
        jobs = jobs.filter(job => job.isRemote === isRemote);
      }
      
      if (req.query.search) {
        const search = (req.query.search as string).toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(search) ||
          job.company.toLowerCase().includes(search) ||
          job.description.toLowerCase().includes(search) ||
          job.skills.some(skill => skill.toLowerCase().includes(search))
        );
      }
      
      // Salary filtering
      if (req.query.salaryMin) {
        const salaryMin = parseInt(req.query.salaryMin as string);
        jobs = jobs.filter(job => job.salaryMin && job.salaryMin >= salaryMin);
      }
      
      if (req.query.salaryMax) {
        const salaryMax = parseInt(req.query.salaryMax as string);
        jobs = jobs.filter(job => job.salaryMax && job.salaryMax <= salaryMax);
      }
      
      // Add category hierarchy information to each job
      const enrichedJobs = jobs.map(job => {
        const category = JOB_CATEGORY_DATA.find(cat => cat.id === job.categoryId);
        const subcategory = category?.subcategories?.find(sub => sub.id === job.subcategoryId);
        const specialization = subcategory?.specializations?.find(spec => spec.id === job.specializationId);
        
        return {
          ...job,
          categoryName: category?.name,
          subcategoryName: subcategory?.name,
          specializationName: specialization?.name,
          categorySlug: category?.slug,
          subcategorySlug: subcategory?.slug,
          specializationSlug: specialization?.slug
        };
      });
      
      res.json(enrichedJobs);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const job = await storage.getJob(id);
      if (!job) {
        return res.status(404).json({ error: "Job not found" });
      }

      // Enrich with company and category data
      const company = await storage.getCompany(job.companyId);
      const category = await storage.getTalentCategory(job.categoryId);
      
      res.json({
        ...job,
        company,
        category
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch job" });
    }
  });

  app.post("/api/jobs", async (req: Request, res: Response) => {
    try {
      const validatedData = insertJobSchema.parse(req.body);
      const job = await storage.createJob(validatedData);
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid job data" });
    }
  });

  // Proposals
  app.get("/api/jobs/:jobId/proposals", async (req: Request, res: Response) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const proposals = await storage.getProposalsByJob(jobId);
      
      // Enrich with talent data
      const enrichedProposals = await Promise.all(proposals.map(async (proposal) => {
        const talent = await storage.getTalent(proposal.talentId);
        return {
          ...proposal,
          talent
        };
      }));

      res.json(enrichedProposals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch proposals" });
    }
  });

  app.get("/api/talents/:talentId/proposals", async (req: Request, res: Response) => {
    try {
      const talentId = parseInt(req.params.talentId);
      const proposals = await storage.getProposalsByTalent(talentId);
      
      // Enrich with job and company data
      const enrichedProposals = await Promise.all(proposals.map(async (proposal) => {
        const job = await storage.getJob(proposal.jobId);
        const company = job ? await storage.getCompany(job.companyId) : null;
        return {
          ...proposal,
          job,
          company
        };
      }));

      res.json(enrichedProposals);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch proposals" });
    }
  });

  app.post("/api/proposals", async (req: Request, res: Response) => {
    try {
      const validatedData = insertProposalSchema.parse(req.body);
      const proposal = await storage.createProposal(validatedData);
      res.status(201).json(proposal);
    } catch (error) {
      res.status(400).json({ error: "Invalid proposal data" });
    }
  });

  // Search endpoint
  app.get("/api/search", async (req: Request, res: Response) => {
    try {
      const query = req.query.q as string;
      const type = req.query.type as string; // 'talents' | 'jobs' | 'companies' | 'all'

      if (!query) {
        return res.status(400).json({ error: "Search query required" });
      }

      const results: any = {};

      if (type === 'talents' || type === 'all') {
        results.talents = await storage.getAllTalents({ search: query });
      }

      if (type === 'jobs' || type === 'all') {
        results.jobs = await storage.getAllJobs({ search: query });
      }

      if (type === 'companies' || type === 'all') {
        const companies = await storage.getAllCompanies();
        results.companies = companies.filter(c => 
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.description?.toLowerCase().includes(query.toLowerCase())
        );
      }

      res.json(results);
    } catch (error) {
      res.status(500).json({ error: "Search failed" });
    }
  });

  // Stats endpoint
  app.get("/api/stats", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllTalentCategories();
      const talents = await storage.getAllTalents();
      const jobs = await storage.getAllJobs();
      const companies = await storage.getAllCompanies();

      const stats = {
        totalTalents: talents.length,
        totalJobs: jobs.length,
        totalCompanies: companies.length,
        topCategories: categories.slice(0, 6),
        averageHourlyRate: talents.reduce((sum, t) => sum + (parseFloat(t.hourlyRate || "0")), 0) / talents.length,
        topSkills: getTopSkills(talents),
        verifiedTalents: talents.filter(t => t.isVerified).length,
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Registration endpoints
  app.post("/api/register/jobseeker", async (req: Request, res: Response) => {
    try {
      const data = req.body;
      
      // Create talent profile
      const talentData = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        title: data.title,
        bio: data.bio,
        location: data.location,
        timezone: data.timezone,
        hourlyRate: data.hourlyRateMin + '-' + data.hourlyRateMax,
        experienceLevel: data.experienceLevel,
        isAvailable: data.isAvailable || true,
        languages: data.languages ? data.languages.split(',').map((l: string) => l.trim()) : [],
        skills: data.skills || []
      };

      const talent = await storage.createTalent(talentData);
      
      res.status(201).json({ 
        success: true, 
        message: "Registration successful",
        talentId: talent.id 
      });
    } catch (error) {
      console.error('Job seeker registration error:', error);
      res.status(400).json({ error: "Registration failed" });
    }
  });

  app.post("/api/register/employer", async (req: Request, res: Response) => {
    try {
      const data = req.body;
      
      // Create company profile
      const companyData = {
        name: data.companyName,
        email: data.email,
        location: data.location,
        website: data.website,
        description: data.description,
        industry: data.industry,
        companySize: data.companySize,
        fundingStage: data.fundingStage,
        isVerified: false // Requires manual verification
      };

      const company = await storage.createCompany(companyData);
      
      res.status(201).json({ 
        success: true, 
        message: "Registration submitted for review",
        companyId: company.id 
      });
    } catch (error) {
      console.error('Employer registration error:', error);
      res.status(400).json({ error: "Registration failed" });
    }
  });

  // Helper function to get top skills
  function getTopSkills(talents: any[]): { skill: string; count: number }[] {
    const skillCounts: { [key: string]: number } = {};
    
    talents.forEach(talent => {
      if (talent.skills) {
        talent.skills.forEach((skill: string) => {
          skillCounts[skill] = (skillCounts[skill] || 0) + 1;
        });
      }
    });

    return Object.entries(skillCounts)
      .map(([skill, count]) => ({ skill, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);
  }

  // Create and return the HTTP server
  const server = createServer(app);
  return server;
}