import { Router } from "express";
// import devAssignmentsController from "../../controllers/devAssignmentsController";

const router = Router();

// Matches route with "/api/v1/assigneddev/"
router.route("/").delete(devAssignmentsController.removeDev);

// Matches route with "/api/v1/assigneddev/:ticketId"
router
  .route("/:ticketId")
  .post(devAssignmentsController.assignDev)
  .get(devAssignmentsController.getAssignedDevs)
  .delete(devAssignmentsController.removeAllDevs);

module.exports = router;
