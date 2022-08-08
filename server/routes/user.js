import { Router } from 'express';
// import userController from '../../controllers/userControllers';

const router = Router();

// router
//   .route('/')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router
//   .route('/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser)
//   .delete(userController.deleteUser);

// module.exports = router;




// Matches route with "/api/v1/users/"
router.route("/").get(userController.getAll).post(userController.addUser);

// Matches route with "/api/v1/users/:id"
router
  .route("/:id")
  .get(userController.getUser)
  .put(authorization, userController.updateUser)
  .delete(authorization, userController.deleteUser);

module.exports = router;
