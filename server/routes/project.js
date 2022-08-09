import { Router } from "express";
import projectController from "../controllers/projectController.js";
// import authorization from "../../middleware/authorization";

const router = Router();


// Matches route with "/api/v1/projects/"
router
  .route("/")
  .get(
    // authorization,
    projectController.getAll
  )
  // .post(authorization, projectController.createProject);

router
  .route("/:id")
      .get(projectController.findById)
  // .get(authorization, projectController.getProject)
//   .put(authorization, projectController.updateProject)
//   .delete(authorization, projectController.deleteProject);

export default router;

