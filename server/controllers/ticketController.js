import Ticket from '../models/Ticket.js';

const ticketController = {
  getAll: async (req, res) => {
    try {
      const [ticket, _] = await Ticket.getAll();

      // res.status(200).json({ count: ticket.length, ticket });
      res.status(200).json(ticket);
    } catch {
      console.log('getTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to get tickets from database' });
    }
  },

  getTicket: async (req, res) => {
    try {
      const { ticketId } = req.params;
      const [ticket, _] = await Ticket.getTicket(ticketId);

      res.status(200).json(ticket);
    } catch (err) {
      console.log('getTicketById query error: ', err);
      res.status(500).json({ msg: 'Unable to get ticket from database' });
    }
  },

  getProjectTickets: async (req, res) => {
    try {
      const { projectId } = req.params;
      const [ticket, _] = await Ticket.getProjectTickets(projectId);

      res.status(200).json({ ticket: ticket });
    } catch (err) {
      console.log('gerProjectId query error: ', err);
      res.status(500).json({ msg: 'Unable to get ticket from database' });
    }
  },

  createTicket: async (req, res) => {
    try {
      const { projectId } = req.params;
      let { ticket_id, title, description, status, author_id, created_at } =
        req.body;
      let ticket = new Ticket(
        ticket_id,
        title,
        description,
        status,
        author_id,
        created_at,
        projectId
      );

      ticket = await ticket.createTicket();

      res.status(201).json({ status: 'Ticket Created!' });
    } catch (err) {
      console.log('createTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to create ticket' });
    }
  },

  updateTicket: async (req, res) => {
    try {
      //* OLD
      // let { ticket_id, title, description, status, author_id, created_at, project_id } = req.body;
      // let ticket = new Ticket(ticket_id, title, description, status, author_id, created_at, project_id);
      //* OLD

      let { ticketId } = req.params;
      let { title, description, status, created_at } = req.body;
      console.log(req.body);
      let ticket = await Ticket.updateTicket(
        ticketId,
        title,
        description,
        status,
        // author_id,
        created_at
        // project_id
      );

      // ticket = await ticket.updateTicket();
      // [ticket] = await Ticket.getTicket(ticketId);

      res.status(201).json({
        status: 'Ticket updated!',
        msg: `Ticket named ${title} updated successfully`
      });
    } catch (err) {
      console.log('createTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to create ticket' });
    }
  },

  deleteTicket: async (req, res) => {
    try {
      let { projectId } = req.params;
      let { ticket_id } = req.body;

      let ticket = await Ticket.deleteTicket(ticket_id);

      res.status(201).json({
        status: 'Ticket deleted!',
        msg: `Ticket named ${ticket_id} deleted successfully`
      });
    } catch (err) {
      console.log('deleteTicket query error: ', err);
      res.status(500).json({ msg: 'Unable to delete ticket' });
    }
  }
};

export default ticketController;
