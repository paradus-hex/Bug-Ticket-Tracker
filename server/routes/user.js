import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = Router();

// Matches route with "/api/v1/users/"
router.route('/').get(userController.getAll).post(userController.addUser);

// Matches route with "/api/v1/users/:id"
router.route('/:userId').get(userController.getUser);
// .put(authorization, userController.updateUser)
// .delete(authorization, userController.deleteUser);

export default router;
