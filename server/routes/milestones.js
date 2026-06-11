import express from 'express';
import * as milestoneController from '../controllers/milestoneController.js';

const router = express.Router();

router.get('/project/:projectId', milestoneController.getMilestones);
router.post('/', milestoneController.createMilestone);
router.put('/:id', milestoneController.updateMilestone);
router.delete('/:id', milestoneController.deleteMilestone);

export default router;
