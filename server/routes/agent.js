import express from 'express';
import * as agentController from '../controllers/agentController.js';

const router = express.Router();

router.get('/latest', agentController.getLatestReport);
router.get('/reports', agentController.getReportHistory);
router.get('/snapshot', agentController.getSystemSnapshot);
router.post('/daily-update', agentController.generateDailyReport);

export default router;
