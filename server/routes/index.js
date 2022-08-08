import { Router } from "express";
import authRoutes from "./auth.js";
import availableUsersRoutes from "./availableUsers.js";
import devAssignmentsRoutes from "./devAssignments.js";
import loginRoutes from "./login.js";
import projectRoutes from "./project.js";
import ticketRoutes from "./ticket.js";
import userRoutes from "./user.js";
import userProjectRoutes from "./userProjects.js";

const RootRouter = Router();

// 3) ROUTES
// router.use('/api/v1/tickets', ticketRouter);
// router.use('/api/v1/users', userRouter);


RootRouter.use("/projects", projectRoutes);
RootRouter.use("/users", userRoutes);
RootRouter.use("/userprojects", userProjectRoutes);
RootRouter.use("/tickets", ticketRoutes);
RootRouter.use("/devassignments", devAssignmentsRoutes);
RootRouter.use("/login", loginRoutes);
RootRouter.use("/availableUsers", availableUsersRoutes);
RootRouter.use("/auth", authRoutes);

export default RootRouter