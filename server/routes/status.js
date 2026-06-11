import express from 'express';
import * as statusController from '../controllers/statusController.js';

const router = express.Router();

router.get('/project/:projectId', statusController.getStatusUpdates);
router.get('/recent', statusController.getRecentUpdates);
router.post('/', statusController.createStatusUpdate);

export default router;
