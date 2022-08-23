import { Router } from 'express';
import ticketAssignmentsController from '../controllers/ticketAssignmentsController.js';

const router = Router();

// // Matches route with "/api/v1/assigneddev/"
router
  .route('/:ticketId/removeall')
  .delete(ticketAssignmentsController.removeAllDevs);

// // Matches route with "/api/v1/assigneddev/:ticketId"
router
  .route('/:ticketId')
  .post(ticketAssignmentsController.assignDev)
  .get(ticketAssignmentsController.getAssignedDevs)
  .delete(ticketAssignmentsController.removeDev);

export default router;
