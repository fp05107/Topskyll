import type { 
  Talent, 
  InsertTalent, 
  TalentCategory, 
  InsertTalentCategory, 
  Company, 
  InsertCompany, 
  Job, 
  InsertJob, 
  Proposal, 
  InsertProposal, 
  Contract, 
  InsertContract, 
  Review, 
  InsertReview 
} from "../shared/schema";

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
      import('fs').then(({ readFileSync }) => {
        import('path').then(({ join }) => {
          this.loadDataFromFiles(readFileSync, join);
        });
      });
    } catch (error) {
      console.error('Failed to load data from JSON files:', error);
      this.seedBasicData();
    }
  }

  private loadDataFromFiles(readFileSync: any, join: any) {
    try {
      
      // Load categories
      const categoriesPath = path.join(__dirname, 'data', 'categories.json');
      const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf8'));
      categoriesData.forEach((cat: any) => {
        const category: TalentCategory = {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          description: cat.description,
          icon: cat.icon,
          color: this.getCategoryColor(cat.id),
          skillsRequired: cat.topSkills || [],
          averageHourlyRate: cat.averageRate?.toString() || "50.00",
          totalTalents: cat.totalTalents || 0,
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
          id: talent.id,
          email: `${talent.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
          firstName: talent.name.split(' ')[0],
          lastName: talent.name.split(' ').slice(1).join(' '),
          title: talent.title,
          bio: talent.description,
          location: talent.location,
          timezone: talent.timezone,
          avatar: talent.avatar,
          hourlyRate: talent.hourlyRate?.toString() || "50",
          currency: talent.currency || "USD",
          skills: talent.skills || [],
          experience: talent.experience,
          languages: talent.languages?.map((lang: string) => ({ lang, level: "Professional" })) || [],
          portfolio: [],
          education: [],
          certifications: [],
          isAvailable: talent.availability === "Available Now",
          verificationLevel: talent.verificationLevel || "Verified",
          rating: talent.rating || 4.5,
          totalReviews: talent.totalReviews || 0,
          completedProjects: talent.completedProjects || 0,
          totalEarnings: talent.hourlyRate * (talent.completedProjects || 0) * 40,
          responseTime: talent.responseTime || "Within 24 hours",
          lastActive: new Date(),
          profileViews: Math.floor(Math.random() * 1000) + 100,
          searchRank: Math.floor(Math.random() * 100) + 1,
          completionRate: talent.clientRetentionRate || 95,
          repeatClientRate: talent.clientRetentionRate || 90,
          onTimeRate: 98,
          isActive: true,
          createdAt: new Date(talent.toptalMemberSince || '2022-01-01'),
          updatedAt: new Date()
        };
        this.talents.set(talent.id, talentWithDates);
        if (talent.id >= this.currentTalentId) {
          this.currentTalentId = talent.id + 1;
        }
      });
    } catch (error) {
      console.error('Failed to load data from JSON files:', error);
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
    // Fallback basic data when JSON files are not available
    const basicCategory: TalentCategory = {
      id: 1,
      name: "Software Developers",
      slug: "software-developers",
      description: "Expert software developers",
      icon: "Code",
      color: "#3B82F6",
      skillsRequired: ["JavaScript", "React", "Node.js"],
      averageHourlyRate: "50.00",
      totalTalents: 100,
      isActive: true,
      order: 1
    };
    this.talentCategories.set(1, basicCategory);
  }

  // Talent methods
  async getAllTalents(filters?: any): Promise<Talent[]> {
    let talents = Array.from(this.talents.values());
    
    if (filters?.category) {
      talents = talents.filter(talent => 
        talent.skills.some(skill => skill.toLowerCase().includes(filters.category.toLowerCase()))
      );
    }
    
    if (filters?.experienceLevel) {
      talents = talents.filter(talent => 
        talent.experience?.toLowerCase().includes(filters.experienceLevel.toLowerCase())
      );
    }
    
    if (filters?.hourlyRateMin) {
      talents = talents.filter(talent => 
        parseFloat(talent.hourlyRate || "0") >= filters.hourlyRateMin
      );
    }
    
    if (filters?.hourlyRateMax) {
      talents = talents.filter(talent => 
        parseFloat(talent.hourlyRate || "0") <= filters.hourlyRateMax
      );
    }
    
    if (filters?.location) {
      talents = talents.filter(talent => 
        talent.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters?.skills) {
      talents = talents.filter(talent => 
        filters.skills.some((skill: string) => 
          talent.skills.some(talentSkill => 
            talentSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }
    
    if (filters?.isAvailable !== undefined) {
      talents = talents.filter(talent => talent.isAvailable === filters.isAvailable);
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      talents = talents.filter(talent => 
        talent.firstName.toLowerCase().includes(searchTerm) ||
        talent.lastName.toLowerCase().includes(searchTerm) ||
        talent.title.toLowerCase().includes(searchTerm) ||
        talent.bio?.toLowerCase().includes(searchTerm) ||
        talent.skills.some(skill => skill.toLowerCase().includes(searchTerm))
      );
    }
    
    return talents;
  }

  async getTalent(id: number): Promise<Talent | undefined> {
    return this.talents.get(id);
  }

  async getTalentByEmail(email: string): Promise<Talent | undefined> {
    return Array.from(this.talents.values()).find(talent => talent.email === email);
  }

  async createTalent(insertTalent: InsertTalent): Promise<Talent> {
    const id = this.currentTalentId++;
    const talent: Talent = { 
      ...insertTalent,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true,
      languages: insertTalent.languages || [],
      portfolio: insertTalent.portfolio || [],
      education: insertTalent.education || [],
      certifications: insertTalent.certifications || [],
      totalEarnings: 0,
      completedProjects: 0,
      profileViews: 0,
      searchRank: 50,
      completionRate: 100,
      repeatClientRate: 0,
      onTimeRate: 100,
      lastActive: new Date()
    };
    this.talents.set(id, talent);
    return talent;
  }

  async updateTalent(id: number, updateData: Partial<InsertTalent>): Promise<Talent | undefined> {
    const talent = this.talents.get(id);
    if (!talent) return undefined;
    
    const updatedTalent = { ...talent, ...updateData, updatedAt: new Date() };
    this.talents.set(id, updatedTalent);
    return updatedTalent;
  }

  // Talent Category methods
  async getAllTalentCategories(): Promise<TalentCategory[]> {
    return Array.from(this.talentCategories.values()).sort((a, b) => a.order - b.order);
  }

  async getTalentCategory(id: number): Promise<TalentCategory | undefined> {
    return this.talentCategories.get(id);
  }

  async getTalentCategoryBySlug(slug: string): Promise<TalentCategory | undefined> {
    return Array.from(this.talentCategories.values()).find(category => category.slug === slug);
  }

  async createTalentCategory(insertCategory: InsertTalentCategory): Promise<TalentCategory> {
    const id = this.currentCategoryId++;
    const category: TalentCategory = { ...insertCategory, id };
    this.talentCategories.set(id, category);
    return category;
  }

  // Company methods
  async getAllCompanies(): Promise<Company[]> {
    return Array.from(this.companies.values());
  }

  async getCompany(id: number): Promise<Company | undefined> {
    return this.companies.get(id);
  }

  async getCompanyByEmail(email: string): Promise<Company | undefined> {
    return Array.from(this.companies.values()).find(company => company.email === email);
  }

  async createCompany(insertCompany: InsertCompany): Promise<Company> {
    const id = this.currentCompanyId++;
    const company: Company = { 
      ...insertCompany,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };
    this.companies.set(id, company);
    return company;
  }

  async updateCompany(id: number, updateData: Partial<InsertCompany>): Promise<Company | undefined> {
    const company = this.companies.get(id);
    if (!company) return undefined;
    
    const updatedCompany = { ...company, ...updateData, updatedAt: new Date() };
    this.companies.set(id, updatedCompany);
    return updatedCompany;
  }

  // Job methods
  async getAllJobs(filters?: any): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values());
    
    if (filters?.companyId) {
      jobs = jobs.filter(job => job.companyId === filters.companyId);
    }
    
    if (filters?.categoryId) {
      jobs = jobs.filter(job => job.categoryId === filters.categoryId);
    }
    
    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      jobs = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return jobs;
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { 
      ...insertJob,
      id,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
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
    return Array.from(this.proposals.values()).filter(proposal => proposal.jobId === jobId);
  }

  async getProposalsByTalent(talentId: number): Promise<Proposal[]> {
    return Array.from(this.proposals.values()).filter(proposal => proposal.talentId === talentId);
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
    return Array.from(this.contracts.values()).filter(contract => contract.companyId === companyId);
  }

  async getContractsByTalent(talentId: number): Promise<Contract[]> {
    return Array.from(this.contracts.values()).filter(contract => contract.talentId === talentId);
  }

  async getContract(id: number): Promise<Contract | undefined> {
    return this.contracts.get(id);
  }

  async createContract(insertContract: InsertContract): Promise<Contract> {
    const id = this.currentContractId++;
    const contract: Contract = { 
      ...insertContract,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.contracts.set(id, contract);
    return contract;
  }

  async updateContract(id: number, updateData: Partial<InsertContract>): Promise<Contract | undefined> {
    const contract = this.contracts.get(id);
    if (!contract) return undefined;
    
    const updatedContract = { ...contract, ...updateData, updatedAt: new Date() };
    this.contracts.set(id, updatedContract);
    return updatedContract;
  }

  // Review methods
  async getReviewsByTalent(talentId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.talentId === talentId);
  }

  async getReviewsByCompany(companyId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.companyId === companyId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview,
      id,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();