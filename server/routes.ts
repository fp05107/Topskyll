import { Express, Request, Response } from "express";
import { Server } from "http";
import { createServer } from "http";
import { storage } from "./storage";
import { insertTalentSchema, insertCompanySchema, insertJobSchema, insertProposalSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Talent Categories
  app.get("/api/talent-categories", async (req: Request, res: Response) => {
    try {
      const categories = await storage.getAllTalentCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch talent categories" });
    }
  });

  app.get("/api/talent-categories/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const category = await storage.getTalentCategoryBySlug(slug);
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
      const filters = {
        category: req.query.category as string,
        experienceLevel: req.query.experienceLevel as string,
        hourlyRateMin: req.query.hourlyRateMin ? parseInt(req.query.hourlyRateMin as string) : undefined,
        hourlyRateMax: req.query.hourlyRateMax ? parseInt(req.query.hourlyRateMax as string) : undefined,
        location: req.query.location as string,
        skills: req.query.skills ? (req.query.skills as string).split(',') : undefined,
        isAvailable: req.query.isAvailable ? req.query.isAvailable === 'true' : undefined,
        verificationLevel: req.query.verificationLevel as string,
        search: req.query.search as string,
      };

      const talents = await storage.getAllTalents(filters);
      res.json(talents);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch talents" });
    }
  });

  app.get("/api/talents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const talent = await storage.getTalent(id);
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
      const validatedData = insertTalentSchema.parse(req.body);
      const talent = await storage.createTalent(validatedData);
      res.status(201).json(talent);
    } catch (error) {
      res.status(400).json({ error: "Invalid talent data" });
    }
  });

  // Companies
  app.get("/api/companies", async (req: Request, res: Response) => {
    try {
      const companies = await storage.getAllCompanies();
      res.json(companies);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  });

  app.get("/api/companies/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const company = await storage.getCompany(id);
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
      const validatedData = insertCompanySchema.parse(req.body);
      const company = await storage.createCompany(validatedData);
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json({ error: "Invalid company data" });
    }
  });

  // Jobs
  app.get("/api/jobs", async (req: Request, res: Response) => {
    try {
      const filters = {
        companyId: req.query.companyId ? parseInt(req.query.companyId as string) : undefined,
        categoryId: req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined,
        experienceLevel: req.query.experienceLevel as string,
        jobType: req.query.jobType as string,
        budgetMin: req.query.budgetMin ? parseInt(req.query.budgetMin as string) : undefined,
        budgetMax: req.query.budgetMax ? parseInt(req.query.budgetMax as string) : undefined,
        isRemote: req.query.isRemote ? req.query.isRemote === 'true' : undefined,
        search: req.query.search as string,
      };

      const jobs = await storage.getAllJobs(filters);
      
      // Enrich jobs with company and category data
      const enrichedJobs = await Promise.all(jobs.map(async (job) => {
        const company = await storage.getCompany(job.companyId);
        const category = await storage.getTalentCategory(job.categoryId);
        return {
          ...job,
          company,
          category
        };
      }));

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

  // Helper function to get top skills
  function getTopSkills(talents: any[]): { skill: string; count: number }[] {
    const skillCounts: { [key: string]: number } = {};
    
    talents.forEach(talent => {
      talent.skills.forEach((skill: string) => {
        skillCounts[skill] = (skillCounts[skill] || 0) + 1;
      });
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