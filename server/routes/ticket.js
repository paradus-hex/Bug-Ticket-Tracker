import { Router } from 'express';
import ticketController from './../controllers/ticketController.js';

const router = Router()


router
    .route('/')
    .get(ticketController.getAll);

router
    .route("/:projectId/:ticketId")
    .get(ticketController.getTicket);


router
    .route('/:projectId')
    .get(ticketController.getProjectTickets)
    .post(ticketController.createTicket);



export default router;
