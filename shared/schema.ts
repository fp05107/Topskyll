import { pgTable, text, serial, integer, boolean, timestamp, real, jsonb, decimal, unique } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Talent/User profiles
export const talents = pgTable("talents", {
  id: serial("id").primaryKey(),
  email: text("email").unique().notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  title: text("title").notNull(), // e.g., "Senior React Developer"
  bio: text("bio"),
  location: text("location"),
  timezone: text("timezone"),
  avatar: text("avatar"), // Profile picture URL
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  currency: text("currency").default("USD"),
  yearsOfExperience: integer("years_of_experience"),
  languages: jsonb("languages").$type<{lang: string, level: string}[]>().default([]),
  skills: jsonb("skills").$type<string[]>().default([]),
  expertise: jsonb("expertise").$type<string[]>().default([]), // Core specializations
  previousCompanies: jsonb("previous_companies").$type<{name: string, logo?: string, position: string, duration: string}[]>().default([]),
  education: jsonb("education").$type<{school: string, degree: string, year: string}[]>().default([]),
  certifications: jsonb("certifications").$type<{name: string, issuer: string, year: string}[]>().default([]),
  portfolio: jsonb("portfolio").$type<{title: string, description: string, url: string, image?: string}[]>().default([]),
  isVerified: boolean("is_verified").default(false),
  verificationLevel: text("verification_level").default("pending"), // pending, basic, expert, top3
  isAvailable: boolean("is_available").default(true),
  profileStrength: integer("profile_strength").default(0), // 0-100
  totalEarnings: decimal("total_earnings", { precision: 12, scale: 2 }).default("0"),
  jobsCompleted: integer("jobs_completed").default(0),
  averageRating: decimal("average_rating", { precision: 3, scale: 2 }).default("0"),
  responseTime: text("response_time"), // "Usually responds within 1 hour"
  joinedAt: timestamp("joined_at").defaultNow(),
  lastActive: timestamp("last_active").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Talent categories (Developers, Designers, etc.)
export const talentCategories = pgTable("talent_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  description: text("description"),
  icon: text("icon"),
  color: text("color"), // For UI theming
  skillsRequired: jsonb("skills_required").$type<string[]>().default([]),
  averageHourlyRate: decimal("average_hourly_rate", { precision: 10, scale: 2 }),
  totalTalents: integer("total_talents").default(0),
  isActive: boolean("is_active").default(true),
  order: integer("order").default(0), // For sorting
});

// Talent-Category relationship
export const talentCategoryMemberships = pgTable("talent_category_memberships", {
  id: serial("id").primaryKey(),
  talentId: integer("talent_id").references(() => talents.id).notNull(),
  categoryId: integer("category_id").references(() => talentCategories.id).notNull(),
  isPrimary: boolean("is_primary").default(false), // One primary category per talent
  verificationStatus: text("verification_status").default("pending"), // pending, verified, expert
  addedAt: timestamp("added_at").defaultNow(),
});

// Companies/Clients
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  logo: text("logo"),
  website: text("website"),
  description: text("description"),
  industry: text("industry"),
  size: text("size"), // startup, small, medium, large, enterprise
  location: text("location"),
  foundedYear: integer("founded_year"),
  isVerified: boolean("is_verified").default(false),
  totalHired: integer("total_hired").default(0),
  averageRating: decimal("average_rating", { precision: 3, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Job postings
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  categoryId: integer("category_id").references(() => talentCategories.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requirements: jsonb("requirements").$type<string[]>().default([]),
  skillsRequired: jsonb("skills_required").$type<string[]>().default([]),
  experienceLevel: text("experience_level").notNull(), // junior, mid, senior, expert
  jobType: text("job_type").notNull(), // hourly, part-time, full-time, project
  duration: text("duration"), // "3 months", "6+ months", "ongoing"
  budget: decimal("budget", { precision: 12, scale: 2 }),
  hourlyRateMin: decimal("hourly_rate_min", { precision: 10, scale: 2 }),
  hourlyRateMax: decimal("hourly_rate_max", { precision: 10, scale: 2 }),
  currency: text("currency").default("USD"),
  isRemote: boolean("is_remote").default(true),
  location: text("location"),
  timezone: text("timezone"),
  isUrgent: boolean("is_urgent").default(false),
  applicationDeadline: timestamp("application_deadline"),
  status: text("status").default("open"), // open, in-progress, completed, cancelled
  postedAt: timestamp("posted_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  isActive: boolean("is_active").default(true),
});

// Job applications/proposals
export const proposals = pgTable("proposals", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  talentId: integer("talent_id").references(() => talents.id).notNull(),
  coverLetter: text("cover_letter").notNull(),
  proposedRate: decimal("proposed_rate", { precision: 10, scale: 2 }),
  estimatedDuration: text("estimated_duration"),
  availability: text("availability"), // "Immediately", "Within 1 week", etc.
  attachments: jsonb("attachments").$type<{name: string, url: string, type: string}[]>().default([]),
  status: text("status").default("pending"), // pending, shortlisted, interview, hired, rejected
  submittedAt: timestamp("submitted_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Contracts/Hired work
export const contracts = pgTable("contracts", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").references(() => jobs.id).notNull(),
  talentId: integer("talent_id").references(() => talents.id).notNull(),
  companyId: integer("company_id").references(() => companies.id).notNull(),
  title: text("title").notNull(),
  description: text("description"),
  agreedRate: decimal("agreed_rate", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("USD"),
  totalBudget: decimal("total_budget", { precision: 12, scale: 2 }),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  status: text("status").default("active"), // active, paused, completed, cancelled
  totalPaid: decimal("total_paid", { precision: 12, scale: 2 }).default("0"),
  hoursWorked: decimal("hours_worked", { precision: 8, scale: 2 }).default("0"),
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Reviews and ratings
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  contractId: integer("contract_id").references(() => contracts.id).notNull(),
  reviewerId: integer("reviewer_id").notNull(), // Can be talent or company
  revieweeId: integer("reviewee_id").notNull(),
  reviewerType: text("reviewer_type").notNull(), // "talent" or "company"
  rating: integer("rating").notNull(), // 1-5 stars
  title: text("title"),
  comment: text("comment"),
  skills: jsonb("skills").$type<{skill: string, rating: number}[]>().default([]),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Screening tests and assessments
export const screeningTests = pgTable("screening_tests", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => talentCategories.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  testType: text("test_type").notNull(), // "technical", "language", "problem-solving"
  duration: integer("duration"), // in minutes
  passingScore: integer("passing_score"),
  questions: jsonb("questions").$type<any[]>().default([]),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Test results
export const testResults = pgTable("test_results", {
  id: serial("id").primaryKey(),
  talentId: integer("talent_id").references(() => talents.id).notNull(),
  testId: integer("test_id").references(() => screeningTests.id).notNull(),
  score: integer("score").notNull(),
  maxScore: integer("max_score").notNull(),
  percentage: decimal("percentage", { precision: 5, scale: 2 }).notNull(),
  timeSpent: integer("time_spent"), // in minutes
  passed: boolean("passed").default(false),
  answers: jsonb("answers").$type<any[]>().default([]),
  takenAt: timestamp("taken_at").defaultNow(),
});

// Zod schemas for validation
export const insertTalentSchema = createInsertSchema(talents).omit({
  id: true,
  joinedAt: true,
  lastActive: true,
});

export const insertTalentCategorySchema = createInsertSchema(talentCategories).omit({
  id: true,
});

export const insertCompanySchema = createInsertSchema(companies).omit({
  id: true,
  createdAt: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  postedAt: true,
  updatedAt: true,
});

export const insertProposalSchema = createInsertSchema(proposals).omit({
  id: true,
  submittedAt: true,
  updatedAt: true,
});

export const insertContractSchema = createInsertSchema(contracts).omit({
  id: true,
  createdAt: true,
});

export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

// TypeScript types
export type Talent = typeof talents.$inferSelect;
export type InsertTalent = z.infer<typeof insertTalentSchema>;
export type TalentCategory = typeof talentCategories.$inferSelect;
export type InsertTalentCategory = z.infer<typeof insertTalentCategorySchema>;
export type Company = typeof companies.$inferSelect;
export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = z.infer<typeof insertProposalSchema>;
export type Contract = typeof contracts.$inferSelect;
export type InsertContract = z.infer<typeof insertContractSchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type ScreeningTest = typeof screeningTests.$inferSelect;
export type TestResult = typeof testResults.$inferSelect;