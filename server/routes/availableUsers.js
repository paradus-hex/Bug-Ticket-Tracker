import { Router } from "express";
// import availableUsersController from "../../controllers/availableUsersController";

const router = Router();

router
  // Matches route with "/api/v1/availableUsers/:projectId"
  .route("/:projectId")
  .get(availableUsersController.getAvailableUsers);

module.exports = router;
