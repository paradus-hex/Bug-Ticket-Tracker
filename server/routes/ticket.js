import { Router } from 'express';
import ticketController from './../controllers/ticketController.js';

const router = Router();

router.route('/').get(ticketController.getAll);

router
  .route('/:ticketId')
  .get(ticketController.getTicket)

  .delete(ticketController.deleteTicket);

router.route('/:projectId/:ticketId').put(ticketController.updateTicket);
router
  .route('/:projectId')
  .get(ticketController.getProjectTickets)
  .post(ticketController.createTicket);

export default router;
