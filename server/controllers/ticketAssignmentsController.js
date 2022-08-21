import TicketAssignments from '../models/TicketAssignmentsModel.js';

const TicketAssignmentsController = {
  assignDev: async (req, res) => {
    try {
      let { user_id } = req.body;
      let { ticketId } = req.params;

      let [checkDev, _] = await TicketAssignments.findById(ticketId, user_id);

      if (checkDev.length > 0) {
        return res.status(400).json({
          message: 'Dev already assigned to this ticket'
        });
      }

      let ticketAssignments = new TicketAssignments(ticketId, user_id);
      ticketAssignments = await ticketAssignments.saveDevToDB();

      res.status(201).json({
        status: `Dev with ID: ${user_id} assigned to ticket ${ticketId}`
      });
    } catch (err) {
      console.log('assignDev query error: ', err);
      res.status(500).json({ msg: 'Unable to assign dev' });
    }
  },

  getAssignedDevs: async (req, res) => {
    try {
      let { ticketId } = req.params;

      let [ticketAssignments] = await TicketAssignments.getAssignedDevs(
        ticketId
      );

      res.status(200).json({ ticketAssignments });
    } catch (err) {
      console.log('getAssignedDevs query error: ', err);
      res.status(500).json({ msg: 'Unable to get dev assignments' });
    }
  },

  removeDev: async (req, res) => {
    try {
      // let { user_id, ticketId } = req.body;
      let { ticketId } = req.params;
      let { user_id } = req.body;

      let checkDev = await TicketAssignments.findById(ticket_id, user_id);

      if (checkDev.length === 0) {
        return res.status(400).json({
          message: 'Dev not assigned to this ticket'
        });
      }

      const deleteDev = await TicketAssignments.removeDev(ticket_id, user_id);

      res.status(200).json({
        status: `Dev with ID: ${user_id} removed from ticket ${ticketId}`
      });
    } catch (err) {
      console.log('removeDev query error: ', err);
      res.status(500).json({ msg: 'Unable to remove dev' });
    }
  },

  removeAllDevs: async (req, res) => {
    try {
      let { ticketId } = req.params;

      const deleteAllDev = await TicketAssignments.removeAllDevs(ticketId);

      res

        .status(200)

        .json({ status: `All devs removed from ticket ${ticketId}` });
    } catch (err) {
      console.log('removeAllDevs query error: ', err);
      res.status(500).json({ msg: 'Unable to remove all devs' });
    }
  }
};

export default TicketAssignmentsController;
