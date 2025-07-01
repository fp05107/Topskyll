import type { Express } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertJobApplicationSchema } from "@shared/schema";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

// Configure multer for file uploads
const upload = multer({
  dest: 'uploads/',
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || 
        file.mimetype.startsWith('image/') ||
        file.mimetype === 'application/msword' ||
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, and images are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/signup", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists with this email" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Signup error:", error);
      res.status(400).json({ message: "Invalid user data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
      }

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user" });
    }
  });

  app.put("/api/users/:id", upload.single('resume'), async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const updateData = req.body;

      // Add resume URL if file was uploaded
      if (req.file) {
        updateData.resumeUrl = `/uploads/${req.file.filename}`;
      }

      const updatedUser = await storage.updateUser(userId, updateData);
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Job Category routes
  app.get("/api/job-categories", async (req, res) => {
    try {
      const categories = await storage.getAllJobCategories();
      res.json(categories);
    } catch (error) {
      console.error("Get job categories error:", error);
      res.status(500).json({ message: "Failed to get job categories" });
    }
  });

  app.get("/api/job-categories/:slug", async (req, res) => {
    try {
      const category = await storage.getJobCategoryBySlug(req.params.slug);
      
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }

      res.json(category);
    } catch (error) {
      console.error("Get job category error:", error);
      res.status(500).json({ message: "Failed to get job category" });
    }
  });

  // Job routes
  app.get("/api/jobs", async (req, res) => {
    try {
      const filters = {
        categoryId: req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined,
        experienceLevel: req.query.experienceLevel as string,
        jobType: req.query.jobType as string,
        salaryMin: req.query.salaryMin ? parseInt(req.query.salaryMin as string) : undefined,
        salaryMax: req.query.salaryMax ? parseInt(req.query.salaryMax as string) : undefined,
        search: req.query.search as string,
      };

      const jobs = await storage.getAllJobs(filters);
      res.json(jobs);
    } catch (error) {
      console.error("Get jobs error:", error);
      res.status(500).json({ message: "Failed to get jobs" });
    }
  });

  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.getJob(jobId);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.json(job);
    } catch (error) {
      console.error("Get job error:", error);
      res.status(500).json({ message: "Failed to get job" });
    }
  });

  app.get("/api/categories/:categoryId/jobs", async (req, res) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const jobs = await storage.getJobsByCategory(categoryId);
      res.json(jobs);
    } catch (error) {
      console.error("Get jobs by category error:", error);
      res.status(500).json({ message: "Failed to get jobs by category" });
    }
  });

  // Job Application routes
  app.post("/api/jobs/:jobId/apply", upload.fields([
    { name: 'resume', maxCount: 1 },
    { name: 'coverLetter', maxCount: 1 }
  ]), async (req, res) => {
    try {
      const jobId = parseInt(req.params.jobId);
      const { userId, coverLetter } = req.body;

      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Check if user already applied for this job
      const existingApplication = await storage.getJobApplication(jobId, parseInt(userId));
      if (existingApplication) {
        return res.status(400).json({ message: "You have already applied for this job" });
      }

      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      let resumeUrl = '';
      
      if (files && files.resume && files.resume[0]) {
        resumeUrl = `/uploads/${files.resume[0].filename}`;
      }

      const applicationData = insertJobApplicationSchema.parse({
        jobId,
        userId: parseInt(userId),
        coverLetter,
        resumeUrl,
        status: 'pending'
      });

      const application = await storage.createJobApplication(applicationData);
      res.status(201).json(application);
    } catch (error) {
      console.error("Job application error:", error);
      res.status(400).json({ message: "Failed to submit job application" });
    }
  });

  app.get("/api/users/:userId/applications", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const applications = await storage.getJobApplicationsByUser(userId);
      res.json(applications);
    } catch (error) {
      console.error("Get user applications error:", error);
      res.status(500).json({ message: "Failed to get user applications" });
    }
  });

  // Serve uploaded files
  app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

  const httpServer = createServer(app);
  return httpServer;
}
