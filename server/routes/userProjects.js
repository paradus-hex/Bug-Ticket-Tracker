// const router = require("express").Router();
// const userProjectController = require("../../controllers/userProjectController");
// const authorization = require("../../middleware/authorization");

import { Router } from "express";
import * as userProjectController from "../../controllers/userProjectController";
import authorization from "../../middleware/authorization";


const router = Router();



// Matches route with "/api/v1/userProjects/"
router.route("/");

// Matches route with "/api/v1/userProjects/:projectId"
router
  .route("/:projectId")
  .post(authorization, assignUser)
  .get(authorization, getProjectUsers)
  .delete(authorization, removeAllUsers);

// Matches route with "/api/v1/userProjects/:projectId/:userId"
router
  .route("/:projectId/:userId")
  .delete(authorization, removeUser);

export default router;
