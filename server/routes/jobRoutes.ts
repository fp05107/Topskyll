import { Router } from 'express';
import { JobController } from '../controllers/jobController';

const router = Router();

// Job routes
router.get('/jobs', JobController.getAllJobs);
router.get('/jobs/stats', JobController.getJobStats);
router.get('/jobs/:id', JobController.getJobById);
router.post('/jobs', JobController.createJob);

// Category-based job routes
router.get('/jobs/category/:categoryId', JobController.getJobsByCategory);

// Currency and salary routes
router.get('/currencies', JobController.getSupportedCurrencies);
router.get('/salary-ranges', JobController.getSalaryRanges);

export default router;