import { 
  users, 
  jobs, 
  jobCategories, 
  jobApplications,
  type User, 
  type InsertUser,
  type Job,
  type InsertJob,
  type JobCategory,
  type InsertJobCategory,
  type JobApplication,
  type InsertJobApplication
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Job Categories
  getAllJobCategories(): Promise<JobCategory[]>;
  getJobCategory(id: number): Promise<JobCategory | undefined>;
  getJobCategoryBySlug(slug: string): Promise<JobCategory | undefined>;
  createJobCategory(category: InsertJobCategory): Promise<JobCategory>;

  // Jobs
  getAllJobs(filters?: {
    categoryId?: number;
    experienceLevel?: string;
    jobType?: string;
    salaryMin?: number;
    salaryMax?: number;
    search?: string;
  }): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  getJobsByCategory(categoryId: number): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
  updateJob(id: number, job: Partial<InsertJob>): Promise<Job | undefined>;

  // Job Applications
  getJobApplicationsByUser(userId: number): Promise<JobApplication[]>;
  getJobApplicationsByJob(jobId: number): Promise<JobApplication[]>;
  createJobApplication(application: InsertJobApplication): Promise<JobApplication>;
  getJobApplication(jobId: number, userId: number): Promise<JobApplication | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private jobs: Map<number, Job>;
  private jobCategories: Map<number, JobCategory>;
  private jobApplications: Map<number, JobApplication>;
  private currentUserId: number;
  private currentJobId: number;
  private currentCategoryId: number;
  private currentApplicationId: number;

  constructor() {
    this.users = new Map();
    this.jobs = new Map();
    this.jobCategories = new Map();
    this.jobApplications = new Map();
    this.currentUserId = 1;
    this.currentJobId = 1;
    this.currentCategoryId = 1;
    this.currentApplicationId = 1;

    // Seed initial data
    this.seedData();
  }

  private seedData() {
    // Seed job categories
    const categories: InsertJobCategory[] = [
      { name: "Cloud Computing", description: "AWS, Azure, GCP", icon: "fas fa-cloud", slug: "cloud-computing", color: "from-blue-500 to-cyan-500" },
      { name: "AI & Machine Learning", description: "Python, TensorFlow, PyTorch", icon: "fas fa-brain", slug: "ai-ml", color: "from-purple-500 to-pink-500" },
      { name: "Cybersecurity", description: "Ethical Hacking, Compliance", icon: "fas fa-shield-alt", slug: "cybersecurity", color: "from-red-500 to-orange-500" },
      { name: "Data Science & Analytics", description: "Analytics, Visualization, Big Data", icon: "fas fa-chart-line", slug: "data-science", color: "from-green-500 to-teal-500" },
      { name: "Software Development", description: "Python, Java, JavaScript, React", icon: "fas fa-code", slug: "software-development", color: "from-indigo-500 to-blue-500" },
      { name: "Frontend Development", description: "React, Vue, Angular, HTML/CSS", icon: "fab fa-react", slug: "frontend-development", color: "from-blue-400 to-indigo-500" },
      { name: "Backend Development", description: "Node.js, Django, Spring Boot", icon: "fas fa-server", slug: "backend-development", color: "from-gray-500 to-slate-600" },
      { name: "Full Stack Development", description: "MERN, MEAN, Django+React", icon: "fas fa-layer-group", slug: "fullstack-development", color: "from-purple-400 to-blue-500" },
      { name: "Mobile App Development", description: "React Native, Flutter, Swift", icon: "fas fa-mobile-alt", slug: "mobile-development", color: "from-green-400 to-blue-500" },
      { name: "Blockchain & Web3", description: "Smart Contracts, DeFi, NFTs", icon: "fab fa-bitcoin", slug: "blockchain-web3", color: "from-yellow-500 to-orange-500" },
      { name: "UI/UX Design", description: "Figma, Adobe XD, User Research", icon: "fas fa-palette", slug: "ui-ux-design", color: "from-pink-500 to-rose-500" },
      { name: "DevOps & CI/CD", description: "Docker, Kubernetes, Jenkins", icon: "fas fa-cogs", slug: "devops-cicd", color: "from-emerald-500 to-green-500" },
      { name: "Robotic Process Automation", description: "UiPath, Blue Prism, Automation", icon: "fas fa-robot", slug: "rpa", color: "from-violet-500 to-purple-500" },
      { name: "AR & VR Development", description: "Unity, Unreal Engine, WebXR", icon: "fas fa-vr-cardboard", slug: "ar-vr", color: "from-cyan-500 to-blue-500" },
      { name: "Database Administration", description: "MySQL, PostgreSQL, MongoDB", icon: "fas fa-database", slug: "database", color: "from-slate-500 to-gray-500" },
      { name: "Network & Systems Admin", description: "Linux, Windows Server, AWS", icon: "fas fa-network-wired", slug: "network-systems", color: "from-lime-500 to-green-500" },
      { name: "SAP & ERP Systems", description: "SAP, Oracle, Microsoft Dynamics", icon: "fas fa-chart-bar", slug: "sap-erp", color: "from-orange-500 to-red-500" },
      { name: "Project Management", description: "Agile, Scrum, PMP, Jira", icon: "fas fa-tasks", slug: "project-management", color: "from-teal-500 to-cyan-500" },
      { name: "Product Management", description: "Product Strategy, Roadmapping", icon: "fas fa-lightbulb", slug: "product-management", color: "from-amber-500 to-yellow-500" },
      { name: "Digital Marketing", description: "SEO, SEM, Social Media, Analytics", icon: "fas fa-bullhorn", slug: "digital-marketing", color: "from-rose-500 to-pink-500" },
      { name: "Sales & Business Dev", description: "B2B Sales, Lead Generation", icon: "fas fa-handshake", slug: "sales-marketing", color: "from-indigo-500 to-purple-500" },
      { name: "Finance & Accounting", description: "Digital Finance, Fintech, Bookkeeping", icon: "fas fa-calculator", slug: "finance-accounting", color: "from-emerald-500 to-teal-500" },
      { name: "IT Support & Help Desk", description: "Technical Support, Troubleshooting", icon: "fas fa-tools", slug: "it-support", color: "from-blue-500 to-indigo-500" },
      { name: "Quality Assurance", description: "Testing, Automation, QA", icon: "fas fa-check-circle", slug: "quality-assurance", color: "from-green-500 to-emerald-500" },
      { name: "Game Development", description: "Unity, Unreal, C#, Game Design", icon: "fas fa-gamepad", slug: "game-development", color: "from-purple-600 to-pink-500" },
      { name: "IoT & Embedded Systems", description: "Arduino, Raspberry Pi, Sensors", icon: "fas fa-microchip", slug: "iot-embedded", color: "from-orange-400 to-red-500" },
      { name: "Technical Writing", description: "Documentation, API Docs, Manuals", icon: "fas fa-pen", slug: "technical-writing", color: "from-blue-300 to-indigo-400" },
      { name: "Business Intelligence", description: "Tableau, Power BI, Data Warehousing", icon: "fas fa-chart-pie", slug: "business-intelligence", color: "from-green-400 to-teal-500" },
      { name: "Content Creation", description: "Video Editing, Graphic Design, Writing", icon: "fas fa-video", slug: "content-creation", color: "from-pink-400 to-rose-500" },
      { name: "Customer Success", description: "Customer Support, Success Management", icon: "fas fa-users", slug: "customer-success", color: "from-cyan-400 to-blue-500" }
    ];

    categories.forEach(category => this.createJobCategory(category));

    // Seed some sample jobs
    const sampleJobs: InsertJob[] = [
      {
        title: "Senior React Developer",
        company: "TechCorp Inc.",
        description: "Join our dynamic team to build cutting-edge web applications using React, Node.js, and modern technologies. Looking for 3+ years experience in full-stack development.",
        requirements: ["3+ years React experience", "Node.js proficiency", "TypeScript knowledge", "Agile methodology"],
        skills: ["React", "Node.js", "TypeScript", "JavaScript"],
        location: "Remote",
        jobType: "Full Time",
        experienceLevel: "Mid Level",
        salaryMin: 1500000,
        salaryMax: 2500000,
        categoryId: 5, // Software Development
        isRemote: true,
        isActive: true
      },
      {
        title: "Data Scientist - AI/ML",
        company: "DataFlow Systems",
        description: "Build machine learning models and AI solutions that impact millions of users. Work with large datasets and cutting-edge ML frameworks in our remote-first team.",
        requirements: ["MS/PhD in Data Science", "Python/R proficiency", "ML frameworks experience", "Statistics knowledge"],
        skills: ["Python", "TensorFlow", "AWS", "Machine Learning"],
        location: "Remote",
        jobType: "Full Time",
        experienceLevel: "Senior Level",
        salaryMin: 2000000,
        salaryMax: 3500000,
        categoryId: 2, // AI & ML
        isRemote: true,
        isActive: true
      },
      {
        title: "Cloud Architect - AWS",
        company: "CloudTech Solutions",
        description: "Design and implement scalable cloud infrastructure solutions. Lead cloud migration projects and mentor junior engineers in our growing remote team.",
        requirements: ["AWS certification", "5+ years cloud experience", "Infrastructure as Code", "Team leadership"],
        skills: ["AWS", "Kubernetes", "Docker", "Terraform"],
        location: "Remote",
        jobType: "Full Time",
        experienceLevel: "Senior Level",
        salaryMin: 2500000,
        salaryMax: 4000000,
        categoryId: 1, // Cloud Computing
        isRemote: true,
        isActive: true
      },
      {
        title: "UX Designer - Product",
        company: "UserFirst Design",
        description: "Create exceptional user experiences for our SaaS platform. Collaborate with product managers and engineers to deliver pixel-perfect designs that users love.",
        requirements: ["3+ years UX design", "Figma expertise", "User research skills", "Portfolio required"],
        skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
        location: "Remote",
        jobType: "Full Time",
        experienceLevel: "Mid Level",
        salaryMin: 1200000,
        salaryMax: 2200000,
        categoryId: 7, // UI/UX Design
        isRemote: true,
        isActive: true
      }
    ];

    sampleJobs.forEach(job => this.createJob(job));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { 
      ...insertUser, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updateData: Partial<InsertUser>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updateData };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Job Category methods
  async getAllJobCategories(): Promise<JobCategory[]> {
    return Array.from(this.jobCategories.values());
  }

  async getJobCategory(id: number): Promise<JobCategory | undefined> {
    return this.jobCategories.get(id);
  }

  async getJobCategoryBySlug(slug: string): Promise<JobCategory | undefined> {
    return Array.from(this.jobCategories.values()).find(category => category.slug === slug);
  }

  async createJobCategory(insertCategory: InsertJobCategory): Promise<JobCategory> {
    const id = this.currentCategoryId++;
    const category: JobCategory = { ...insertCategory, id };
    this.jobCategories.set(id, category);
    return category;
  }

  // Job methods
  async getAllJobs(filters?: {
    categoryId?: number;
    experienceLevel?: string;
    jobType?: string;
    salaryMin?: number;
    salaryMax?: number;
    search?: string;
  }): Promise<Job[]> {
    let jobs = Array.from(this.jobs.values()).filter(job => job.isActive);

    if (filters) {
      if (filters.categoryId) {
        jobs = jobs.filter(job => job.categoryId === filters.categoryId);
      }
      if (filters.experienceLevel) {
        jobs = jobs.filter(job => job.experienceLevel === filters.experienceLevel);
      }
      if (filters.jobType) {
        jobs = jobs.filter(job => job.jobType === filters.jobType);
      }
      if (filters.salaryMin) {
        jobs = jobs.filter(job => job.salaryMin && job.salaryMin >= filters.salaryMin!);
      }
      if (filters.salaryMax) {
        jobs = jobs.filter(job => job.salaryMax && job.salaryMax <= filters.salaryMax!);
      }
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        jobs = jobs.filter(job => 
          job.title.toLowerCase().includes(searchLower) ||
          job.company.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.skills?.some(skill => skill.toLowerCase().includes(searchLower))
        );
      }
    }

    return jobs.sort((a, b) => new Date(b.postedAt!).getTime() - new Date(a.postedAt!).getTime());
  }

  async getJob(id: number): Promise<Job | undefined> {
    return this.jobs.get(id);
  }

  async getJobsByCategory(categoryId: number): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(job => job.categoryId === categoryId && job.isActive);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentJobId++;
    const job: Job = { 
      ...insertJob, 
      id,
      postedAt: new Date()
    };
    this.jobs.set(id, job);
    return job;
  }

  async updateJob(id: number, updateData: Partial<InsertJob>): Promise<Job | undefined> {
    const job = this.jobs.get(id);
    if (!job) return undefined;
    
    const updatedJob = { ...job, ...updateData };
    this.jobs.set(id, updatedJob);
    return updatedJob;
  }

  // Job Application methods
  async getJobApplicationsByUser(userId: number): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values()).filter(app => app.userId === userId);
  }

  async getJobApplicationsByJob(jobId: number): Promise<JobApplication[]> {
    return Array.from(this.jobApplications.values()).filter(app => app.jobId === jobId);
  }

  async createJobApplication(insertApplication: InsertJobApplication): Promise<JobApplication> {
    const id = this.currentApplicationId++;
    const application: JobApplication = { 
      ...insertApplication, 
      id,
      appliedAt: new Date()
    };
    this.jobApplications.set(id, application);
    return application;
  }

  async getJobApplication(jobId: number, userId: number): Promise<JobApplication | undefined> {
    return Array.from(this.jobApplications.values()).find(app => 
      app.jobId === jobId && app.userId === userId
    );
  }
}

export const storage = new MemStorage();
