const express = require('express');
const ticketController = require('./../controllers/ticketControllers');

const router = express.Router();

router.param('id', ticketController.checkID);

router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(ticketController.checkBody, ticketController.createTicket);

router
  .route('/:id')
  .get(ticketController.getTicket)
  .patch(ticketController.updateTicket)
  .delete(ticketController.deleteTicket);

module.exports = router;