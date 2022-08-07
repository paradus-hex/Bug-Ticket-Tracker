// const router = require("express").Router();
// const userProjectController = require("../../controllers/userProjectController");
// const authorization = require("../../middleware/authorization");

import { Router } from "express";
import { userProjectController } from "../../controllers/userProjectController";
import { authorization } from "../../middleware/authorization";

const router = Router();

// Matches route with "/api/v1/userProjects/"
router.route("/");

// Matches route with "/api/v1/userProjects/:projectId"
router
  .route("/:projectId")
  .post(authorization, userProjectController.assignUser)
  .get(authorization, userProjectController.getProjectUsers)
  .delete(authorization, userProjectController.removeAllUsers);

// Matches route with "/api/v1/userProjects/:projectId/:userId"
router
  .route("/:projectId/:userId")
  .delete(authorization, userProjectController.removeUser);

module.exports = router;
