import { Router } from 'express';
import projectAssignmentsController from '../controllers/projectAssignmentsController.js';
// import authorization from "../../middleware/authorization";

const router = Router();


router.route("/:projectId/removeall").delete(projectAssignmentsController.removeAllDevs);


router
    .route("/:projectId")
    .post(projectAssignmentsController.assignDev)
    .get(projectAssignmentsController.getAssignedDevs)
    .delete(projectAssignmentsController.removeDev);

// // Matches route with "/api/v1/userProjects/:projectId/:userId"
// router
//   .route("/:projectId/:userId")
//   .delete(authorization, userProjectController.removeUser);

export default router;
