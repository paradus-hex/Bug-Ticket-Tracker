import { Router } from 'express';
import projectController from '../controllers/projectController.js';
// import authorization from "../../middleware/authorization";

const router = Router();

// Matches route with "/api/v1/projects/"
router
  .route('/')
  .get(
    // authorization,
    projectController.getAll
  )
  .post(projectController.createProject);
// .post(authorization, projectController.createProject);

router.route('/:id').get(projectController.findById);
router.route('/:id').put(projectController.updateProject);
// .get(authorization, projectController.getProject);
// .put(authorization, projectController.updateProject);
// .delete(authorization, projectController.deleteProject);

export default router;
