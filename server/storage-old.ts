import {
  Talent, InsertTalent,
  TalentCategory, InsertTalentCategory,
  Company, InsertCompany,
  Job, InsertJob,
  Proposal, InsertProposal,
  Contract, InsertContract,
  Review, InsertReview
} from "../shared/schema";

export interface IStorage {
  // Talents
  getAllTalents(filters?: {
    category?: string;
    experienceLevel?: string;
    hourlyRateMin?: number;
    hourlyRateMax?: number;
    location?: string;
    skills?: string[];
    isAvailable?: boolean;
    verificationLevel?: string;
    search?: string;
  }): Promise<Talent[]>;
  getTalent(id: number): Promise<Talent | undefined>;
  getTalentByEmail(email: string): Promise<Talent | undefined>;
  createTalent(talent: InsertTalent): Promise<Talent>;
  updateTalent(id: number, talent: Partial<InsertTalent>): Promise<Talent | undefined>;

  // Talent Categories
  getAllTalentCategories(): Promise<TalentCategory[]>;
  getTalentCategory(id: number): Promise<TalentCategory | undefined>;
  getTalentCategoryBySlug(slug: string): Promise<TalentCategory | undefined>;
  createTalentCategory(category: InsertTalentCategory): Promise<TalentCategory>;

  // Companies
  getAllCompanies(): Promise<Company[]>;
  getCompany(id: number): Promise<Company | undefined>;
  getCompanyByEmail(email: string): Promise<Company | undefined>;
  createCompany(company: InsertCompany): Promise<Company>;
  updateCompany(id: number, company: Partial<InsertCompany>): Promise<Company | undefined>;

  // Jobs
  getAllJobs(filters?: {
    companyId?: number;
    categoryId?: number;
    experienceLevel?: string;
    jobType?: string;
    budgetMin?: number;
    budgetMax?: number;
    isRemote?: boolean;
    search?: string;
  }): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<InsertJob>): Promise<Job | undefined>;

  // Proposals
  getProposalsByJob(jobId: number): Promise<Proposal[]>;
  getProposalsByTalent(talentId: number): Promise<Proposal[]>;
  getProposal(id: number): Promise<Proposal | undefined>;
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  updateProposal(id: number, proposal: Partial<InsertProposal>): Promise<Proposal | undefined>;

  // Contracts
  getContractsByCompany(companyId: number): Promise<Contract[]>;
  getContractsByTalent(talentId: number): Promise<Contract[]>;
  getContract(id: number): Promise<Contract | undefined>;
  createContract(contract: InsertContract): Promise<Contract>;
  updateContract(id: number, contract: Partial<InsertContract>): Promise<Contract | undefined>;

  // Reviews
  getReviewsByTalent(talentId: number): Promise<Review[]>;
  getReviewsByCompany(companyId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
}

export class MemStorage implements IStorage {
  private talents: Map<number, Talent>;
  private talentCategories: Map<number, TalentCategory>;  
  private companies: Map<number, Company>;
  private jobs: Map<number, Job>;
  private proposals: Map<number, Proposal>;
  private contracts: Map<number, Contract>;
  private reviews: Map<number, Review>;
  private currentTalentId: number;
  private currentCategoryId: number;
  private currentCompanyId: number;
  private currentJobId: number;
  private currentProposalId: number;
  private currentContractId: number;
  private currentReviewId: number;

  constructor() {
    this.talents = new Map();
    this.talentCategories = new Map();
    this.companies = new Map();
    this.jobs = new Map();
    this.proposals = new Map();
    this.contracts = new Map();
    this.reviews = new Map();
    this.currentTalentId = 1;
    this.currentCategoryId = 1;
    this.currentCompanyId = 1;
    this.currentJobId = 1;
    this.currentProposalId = 1;
    this.currentContractId = 1;
    this.currentReviewId = 1;
    this.seedData();
  }

  private seedData() {
    // Load data from JSON files
    try {
      const fs = require('fs');
      const path = require('path');
      
      // Load categories
      const categoriesPath = path.join(__dirname, 'data', 'categories.json');
      const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
      categoriesData.forEach((cat: any) => {
        const category: TalentCategory = {
          ...cat,
          color: this.getCategoryColor(cat.id),
          skillsRequired: cat.topSkills || [],
          averageHourlyRate: cat.averageRate?.toString() || "50.00",
          isActive: true,
          order: cat.id
        };
        this.talentCategories.set(cat.id, category);
      });

      // Load talents
      const talentsPath = path.join(__dirname, 'data', 'talents.json');
      const talentsData = JSON.parse(fs.readFileSync(talentsPath, 'utf8'));
      talentsData.forEach((talent: any) => {
        const talentWithDates: Talent = {
          ...talent,
          id: talent.id,
          email: `${talent.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          hourlyRateUsd: talent.hourlyRate,
          isAvailable: talent.availability === "Available Now",
          createdAt: new Date(talent.toptalMemberSince || '2022-01-01'),
          lastActive: new Date(),
          portfolio: [],
          education: [],
          certifications: [],
          timeZone: talent.timezone,
          profileViews: Math.floor(Math.random() * 1000) + 100,
          totalEarnings: talent.hourlyRate * talent.completedProjects * 40, // Estimate
          completionRate: talent.clientRetentionRate
        };
        this.talents.set(talent.id, talentWithDates);
      });
    } catch (error) {
      console.error('Failed to load data from JSON files:', error);
      // Fallback to basic seed data
      this.seedBasicData();
    }
  }

  private getCategoryColor(id: number): string {
    const colors = [
      "#3B82F6", "#8B5CF6", "#059669", "#DC2626", "#F59E0B", "#EC4899", "#10B981", "#F97316"
    ];
    return colors[(id - 1) % colors.length];
  }

  private seedBasicData() {
    // Fallback basic data
    const basicCategories: TalentCategory[] = [
      {
        id: 4,
        name: "Project Managers",
        slug: "project-managers",
        description: "Digital and technical project managers, scrum masters with expertise in PM tools.",
        icon: "Users",
        color: "#DC2626",
        skillsRequired: ["Agile", "Scrum", "Jira", "Project Planning", "Team Leadership"],
        averageHourlyRate: "70.00",
        totalTalents: 5632,
        isActive: true,
        order: 4
      },
      {
        id: 5,
        name: "Product Managers",
        slug: "product-managers",
        description: "Digital product managers and scrum product owners across multiple industries.",
        icon: "Package",
        color: "#F59E0B",
        skillsRequired: ["Product Strategy", "User Research", "Analytics", "Roadmap Planning"],
        averageHourlyRate: "85.00",
        totalTalents: 4127,
        isActive: true,
        order: 5
      },
      {
        id: 6,
        name: "Marketing Experts",
        slug: "marketing",
        description: "Experts in digital marketing, growth marketing, content creation, and brand strategy.",
        icon: "Megaphone",
        color: "#EC4899",
        skillsRequired: ["Digital Marketing", "SEO", "Content Marketing", "Social Media", "Analytics"],
        averageHourlyRate: "60.00",
        totalTalents: 6891,
        isActive: true,
        order: 6
      }
    ];

    categories.forEach(category => {
      this.talentCategories.set(category.id, category);
      this.currentCategoryId = Math.max(this.currentCategoryId, category.id + 1);
    });

    // Seed Companies
    const companies: Company[] = [
      {
        id: 1,
        name: "TechCorp",
        email: "hiring@techcorp.com",
        logo: "https://via.placeholder.com/100x100?text=TC",
        website: "https://techcorp.com",
        description: "Leading technology company building the future of software",
        industry: "Technology",
        size: "large",
        location: "San Francisco, CA",
        foundedYear: 2015,
        isVerified: true,
        totalHired: 45,
        averageRating: "4.8",
        createdAt: new Date(),
        isActive: true
      },
      {
        id: 2,
        name: "Design Studio Pro",
        email: "projects@designstudio.com",
        logo: "https://via.placeholder.com/100x100?text=DS",
        website: "https://designstudio.com",
        description: "Award-winning design agency specializing in digital experiences",
        industry: "Design",
        size: "medium",
        location: "New York, NY",
        foundedYear: 2018,
        isVerified: true,
        totalHired: 23,
        averageRating: "4.9",
        createdAt: new Date(),
        isActive: true
      }
    ];

    companies.forEach(company => {
      this.companies.set(company.id, company);
      this.currentCompanyId = Math.max(this.currentCompanyId, company.id + 1);
    });

    // Seed Talents
    const talents: Talent[] = [
      {
        id: 1,
        email: "sarah.chen@email.com",
        firstName: "Sarah",
        lastName: "Chen",
        title: "Senior Full-Stack Developer",
        bio: "Experienced full-stack developer with 8+ years in React, Node.js, and cloud architecture. Previously at Meta and Google.",
        location: "San Francisco, CA",
        timezone: "PST",
        avatar: "https://via.placeholder.com/150x150?text=SC",
        hourlyRate: "95.00",
        currency: "USD",
        yearsOfExperience: 8,
        languages: [
          { lang: "English", level: "Native" },
          { lang: "Mandarin", level: "Fluent" }
        ],
        skills: ["React", "Node.js", "TypeScript", "AWS", "GraphQL", "PostgreSQL"],
        expertise: ["Frontend Development", "Backend Development", "Cloud Architecture"],
        previousCompanies: [
          { name: "Meta", logo: "https://via.placeholder.com/50x50?text=M", position: "Senior Software Engineer", duration: "2021-2023" },
          { name: "Google", logo: "https://via.placeholder.com/50x50?text=G", position: "Software Engineer", duration: "2019-2021" }
        ],
        education: [
          { school: "Stanford University", degree: "MS Computer Science", year: "2019" }
        ],
        certifications: [
          { name: "AWS Solutions Architect", issuer: "Amazon", year: "2022" }
        ],
        portfolio: [
          { title: "E-commerce Platform", description: "Full-stack e-commerce solution", url: "https://github.com/sarah/ecommerce", image: "https://via.placeholder.com/300x200" }
        ],
        isVerified: true,
        verificationLevel: "top3",
        isAvailable: true,
        profileStrength: 95,
        totalEarnings: "125000.00",
        jobsCompleted: 12,
        averageRating: "4.9",
        responseTime: "Usually responds within 1 hour",
        joinedAt: new Date("2023-01-15"),
        lastActive: new Date(),
        isActive: true
      },
      {
        id: 2,
        email: "john.smith@email.com",
        firstName: "John",
        lastName: "Smith",
        title: "Senior UX/UI Designer",
        bio: "Award-winning designer with 10+ years creating beautiful, user-centered digital experiences. Former Apple designer.",
        location: "New York, NY",
        timezone: "EST",
        avatar: "https://via.placeholder.com/150x150?text=JS",
        hourlyRate: "85.00",
        currency: "USD",
        yearsOfExperience: 10,
        languages: [
          { lang: "English", level: "Native" },
          { lang: "Spanish", level: "Conversational" }
        ],
        skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research", "Design Systems"],
        expertise: ["UI/UX Design", "Design Systems", "Mobile Design"],
        previousCompanies: [
          { name: "Apple", logo: "https://via.placeholder.com/50x50?text=A", position: "Senior Designer", duration: "2020-2023" },
          { name: "Airbnb", logo: "https://via.placeholder.com/50x50?text=AB", position: "Product Designer", duration: "2018-2020" }
        ],
        education: [
          { school: "RISD", degree: "BFA Graphic Design", year: "2014" }
        ],
        certifications: [],
        portfolio: [
          { title: "Mobile Banking App", description: "Complete UX/UI redesign", url: "https://dribbble.com/john", image: "https://via.placeholder.com/300x200" }
        ],
        isVerified: true,
        verificationLevel: "expert",
        isAvailable: true,
        profileStrength: 92,
        totalEarnings: "89000.00",
        jobsCompleted: 18,
        averageRating: "4.8",
        responseTime: "Usually responds within 2 hours",
        joinedAt: new Date("2023-03-20"),
        lastActive: new Date(),
        isActive: true
      }
    ];

    talents.forEach(talent => {
      this.talents.set(talent.id, talent);
      this.currentTalentId = Math.max(this.currentTalentId, talent.id + 1);
    });

    // Seed Jobs
    const jobs: Job[] = [
      {
        id: 1,
        companyId: 1,
        categoryId: 1,
        title: "Senior React Developer for SaaS Platform",
        description: "We're looking for an experienced React developer to help build our next-generation SaaS platform. You'll work with modern technologies including React 18, TypeScript, and GraphQL.",
        requirements: ["5+ years React experience", "TypeScript proficiency", "GraphQL knowledge"],
        skillsRequired: ["React", "TypeScript", "GraphQL", "Node.js"],
        experienceLevel: "senior",
        jobType: "full-time",
        duration: "6+ months",
        budget: "25000.00",
        hourlyRateMin: "80.00",
        hourlyRateMax: "120.00",
        currency: "USD",
        isRemote: true,
        location: "Remote",
        timezone: "EST",
        isUrgent: false,
        applicationDeadline: new Date("2025-08-01"),
        status: "open",
        postedAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      },
      {
        id: 2,
        companyId: 2,
        categoryId: 2,
        title: "UX Designer for Mobile App Redesign",
        description: "Join our team to redesign a popular mobile app used by millions. We need someone with strong UX skills and mobile design experience.",
        requirements: ["3+ years mobile design", "User research experience", "Figma expertise"],
        skillsRequired: ["Figma", "Mobile Design", "User Research", "Prototyping"],
        experienceLevel: "mid",
        jobType: "part-time",
        duration: "3 months",
        budget: "15000.00",
        hourlyRateMin: "60.00",
        hourlyRateMax: "90.00",
        currency: "USD",
        isRemote: true,
        location: "Remote",
        timezone: "EST",
        isUrgent: true,
        applicationDeadline: new Date("2025-07-15"),
        status: "open",
        postedAt: new Date(),
        updatedAt: new Date(),
        isActive: true
      }
    ];

    jobs.forEach(job => {
      this.jobs.set(job.id, job);
      this.currentJobId = Math.max(this.currentJobId, job.id + 1);
    });
  }

  // Talent methods
  async getAllTalents(filters?: any): Promise<Talent[]> {
    let talents = Array.from(this.talents.values()).filter(t => t.isActive);
    
    if (filters) {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        talents = talents.filter(t => 
          t.firstName.toLowerCase().includes(searchLower) ||
          t.lastName.toLowerCase().includes(searchLower) ||
          t.title.toLowerCase().includes(searchLower) ||
          (t.skills && t.skills.some(skill => skill.toLowerCase().includes(searchLower)))
        );
      }
      
      if (filters.hourlyRateMin) {
        talents = talents.filter(t => t.hourlyRate && parseFloat(t.hourlyRate) >= filters.hourlyRateMin);
      }
      
      if (filters.hourlyRateMax) {
        talents = talents.filter(t => t.hourlyRate && parseFloat(t.hourlyRate) <= filters.hourlyRateMax);
      }
      
      if (filters.location) {
        talents = talents.filter(t => t.location?.toLowerCase().includes(filters.location.toLowerCase()));
      }
      
      if (filters.verificationLevel) {
        talents = talents.filter(t => t.verificationLevel === filters.verificationLevel);
      }
      
      if (filters.isAvailable !== undefined) {
        talents = talents.filter(t => t.isAvailable === filters.isAvailable);
      }
    }
    
    return talents.sort((a, b) => parseFloat(b.averageRating || "0") - parseFloat(a.averageRating || "0"));
  }

  async getTalent(id: number): Promise<Talent | undefined> {
    return this.talents.get(id);
  }

  async getTalentByEmail(email: string): Promise<Talent | undefined> {
    return Array.from(this.talents.values()).find(t => t.email === email);
  }

  async createTalent(insertTalent: InsertTalent): Promise<Talent> {
    const id = this.currentTalentId++;
    const talent: Talent = { 
      ...insertTalent, 
      id,
      joinedAt: new Date(),
      lastActive: new Date()
    };
    this.talents.set(id, talent);
    return talent;
  }

  async updateTalent(id: number, updateData: Partial<InsertTalent>): Promise<Talent | undefined> {
    const talent = this.talents.get(id);
    if (!talent) return undefined;
    
    const updatedTalent = { ...talent, ...updateData };
    this.talents.set(id, updatedTalent);
    return updatedTalent;
  }

  // Talent Category methods
  async getAllTalentCategories(): Promise<TalentCategory[]> {
    return Array.from(this.talentCategories.values())
      .filter(c => c.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  async getTalentCategory(id: number): Promise<TalentCategory | undefined> {
    return this.talentCategories.get(id);
  }

  async getTalentCategoryBySlug(slug: string): Promise<TalentCategory | undefined> {
    return Array.from(this.talentCategories.values()).find(c => c.slug === slug);
  }

  async createTalentCategory(insertCategory: InsertTalentCategory): Promise<TalentCategory> {
    const id = this.currentCategoryId++;
    const category: TalentCategory = { ...insertCategory, id };
    this.talentCategories.set(id, category);
    return category;
  }

  // Company methods
  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values()).filter(c => c.isActive);
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getCompanyByEmail(email: string): Promise<Company | undefined> {
    return Array.from(this.companies.values()).find(c => c.email === email);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = { 
      ...insertCompany, 
      id,
      createdAt: new Date()
    };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: number, updateData: Partial<InsertCompany>): Promise<Company | undefined> {
    const company = this.companies.get(id);
    if (!company) return undefined;
    
    const updatedCompany = { ...company, ...updateData };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }

  // Job methods
  async getAllJobs(filters?: any): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values()).filter(j => j.isActive);
    
    if (filters) {
      if (filters.companyId) {
        jobs = jobs.filter(j => j.companyId === filters.companyId);
      }
      
      if (filters.categoryId) {
        jobs = jobs.filter(j => j.categoryId === filters.categoryId);
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        jobs = jobs.filter(j => 
          j.title.toLowerCase().includes(searchLower) ||
          j.description.toLowerCase().includes(searchLower) ||
          j.skillsRequired.some(skill => skill.toLowerCase().includes(searchLower))
        );
      }
    }
    
    return jobs.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { 
      ...insertJob, 
      id,
      postedAt: new Date(),
      updatedAt: new Date()
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, updateData: Partial<InsertJob>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updateData, updatedAt: new Date() };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  // Proposal methods
  async getProposalsByJob(jobId: number): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter(p => p.jobId === jobId);
  }

  async getProposalsByTalent(talentId: number): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter(p => p.talentId === talentId);
  }

  async getProposal(id: number): Promise<Proposal | undefined> {
    return this.proposals.get(id);
  }

  async createProposal(insertProposal: InsertProposal): Promise<Proposal> {
    const id = this.currentProposalId++;
    const proposal: Proposal = { 
      ...insertProposal, 
      id,
      submittedAt: new Date(),
      updatedAt: new Date()
    };
    this.proposals.set(id, proposal);
    return proposal;
  }

  async updateProposal(id: number, updateData: Partial<InsertProposal>): Promise<Proposal | undefined> {
    const proposal = this.proposals.get(id);
    if (!proposal) return undefined;
    
    const updatedProposal = { ...proposal, ...updateData, updatedAt: new Date() };
    this.proposals.set(id, updatedProposal);
    return updatedProposal;
  }

  // Contract methods
  async getContractsByCompany(companyId: number): Promise<Contract[]> {
    return Array.from(this.contracts.values()).filter(c => c.companyId === companyId);
  }

  async getContractsByTalent(talentId: number): Promise<Contract[]> {
    return Array.from(this.contracts.values()).filter(c => c.talentId === talentId);
  }

  async getContract(id: number): Promise<Contract | undefined> {
    return this.contracts.get(id);
  }

  async createContract(insertContract: InsertContract): Promise<Contract> {
    const id = this.currentContractId++;
    const contract: Contract = { 
      ...insertContract, 
      id,
      createdAt: new Date()
    };
    this.contracts.set(id, contract);
    return contract;
  }

  async updateContract(id: number, updateData: Partial<InsertContract>): Promise<Contract | undefined> {
    const contract = this.contracts.get(id);
    if (!contract) return undefined;
    
    const updatedContract = { ...contract, ...updateData };
    this.contracts.set(id, updatedContract);
    return updatedContract;
  }

  // Review methods
  async getReviewsByTalent(talentId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(r => r.revieweeId === talentId && r.reviewerType === "company");
  }

  async getReviewsByCompany(companyId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(r => r.revieweeId === companyId && r.reviewerType === "talent");
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();