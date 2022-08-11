import Ticket from "../models/Ticket.js";



const ticketController = {
  getAll: async (req, res) => {
    try {
      const [ticket, _] = await Ticket.getAll();

      res.status(200).json({ count: ticket.length, ticket });
    } catch {
      console.log("getTicket query error: ", err);
      res.status(500).json({ msg: "Unable to get tickets from database" });
    }
  },

  getTicket: async (req, res) => {
    try {
      const { ticketId } = req.params;
      const [ticket, _] = await Ticket.getTicket(ticketId);

      res.status(200).json(ticket);

    } catch (err) {
      console.log("getTicketById query error: ", err);
      res.status(500).json({ msg: "Unable to get ticket from database" });
    }
  },

  getProjectTickets: async (req, res) => {
    try {
      const { projectId } = req.params;
      const [ticket, _] = await Ticket.getProjectTickets(projectId);

      res.status(200).json({ ticket: ticket });

    } catch (err) {
      console.log("gerProjectId query error: ", err);
      res.status(500).json({ msg: "Unable to get ticket from database" });
    }
  },



  createTicket: async (req, res) => {

    try {
      let { ticket_id, title, description, status, author_id, created_at, project_id } = req.body;
      let ticket = new Ticket(ticket_id, title, description, status, author_id, created_at, project_id);

      ticket = await ticket.createTicket();
      [ticket] = await Ticket.getProjectTickets(project_id)

      res.status(201).json({ status: "Ticket Created!", ticket });
    } catch (err) {
      console.log("createTicket query error: ", err);
      res.status(500).json({ msg: "Unable to create ticket" });
    }
  },
  // is my account solved yet?



}




export default ticketController;