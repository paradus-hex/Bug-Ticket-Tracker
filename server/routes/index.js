const projectRoutes = require("./project");
const userRoutes = require("./user");
const userProjectRoutes = require("./userProjects");
const ticketRoutes = require("./ticket");
const devAssignmentsRoutes = require("./devAssignments");
const loginRoutes = require("./login");
const availableUsersRoutes = require("./availableUsers");
const authRoutes = require("./auth");
const RootRouter = require("express").Router();

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