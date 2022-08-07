const router = require("express").Router();
const availableUsersController = require("../../controllers/availableUsersController");

router
  // Matches route with "/api/v1/availableUsers/:projectId"
  .route("/:projectId")
  .get(availableUsersController.getAvailableUsers);

module.exports = router;
