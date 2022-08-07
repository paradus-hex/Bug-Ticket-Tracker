const express = require('express');
const ticketController = require('./../controllers/ticketControllers');

const router = express.Router();

router.param('id', ticketController.checkID);

// router
//   .route('/')
//   .get(ticketController.getAllTickets)
//   .post(ticketController.checkBody, ticketController.createTicket);

// router
//   .route('/:id')
//   .get(ticketController.getTicket)
//   .patch(ticketController.updateTicket)
//   .delete(ticketController.deleteTicket);

// module.exports = router;


// Matches route with "/api/tickets/"
router.route("/").get(authorization, ticketController.getUserTickets);

router
  .route("/:projectId")
  .post(authorization, ticketController.createTicket)
  .get(ticketController.getProjectTickets);

router
  .route("/:projectId/:ticketId")
  .get(ticketController.getTicket)
  .put(authorization, ticketController.updateTicket)
  .delete(authorization, ticketController.deleteTicket);

module.exports = router;
