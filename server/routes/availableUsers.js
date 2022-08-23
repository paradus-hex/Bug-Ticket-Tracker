import { Router } from 'express';
import availableUsersController from '../controllers/availableUsersController.js';

const router = Router();

router
  // Matches route with "/api/v1/availableUsers/:projectId"
  .route('/:projectId')
  .get(availableUsersController.getAvailableUsers);

export default router;
