import { Router } from 'express';
import projectController from '../controllers/projectController.js';
import ticketController from '../controllers/ticketController.js';
import authorization from '../middlewares/authorization.js';

const router = Router();

// Matches route with "/api/v1/projects/"
router
  .route('/')
  .get(projectController.getAll)
  .post(authorization, projectController.createProject);

// http://localhost:8000/api/v1/projects/:projectId
// http://localhost:8000/api/v1/projects/:projectId
router
  .route('/:projectId')
  .get(projectController.projectById)
  .put(authorization, projectController.updateProject)
  .post(ticketController.createTicket)
  .delete(authorization, projectController.deleteProject);

export default router;
