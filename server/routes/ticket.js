import { Router } from 'express';
import ticketController from './../controllers/ticketController.js';

const router = Router();


router
    .route('/')
    .get(ticketController.getAll);

router
    .route("/:projectId")
    .get(ticketController.getTicket)
    .put(ticketController.updateTicket)
    .delete(ticketController.deleteTicket);


router
    .route('/:projectId')
    .get(ticketController.getProjectTickets)
    .post(ticketController.createTicket);



export default router;
