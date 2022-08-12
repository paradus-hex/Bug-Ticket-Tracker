
import DevAssignment from '../models/devAssignmentsModel.js';

const devAssignmentController = {
  assignDev: async (req, res) => {
    try {
      let { user_id } = req.body;
      let { ticketId } = req.params;

      let devAssignment = new DevAssignment(ticketId, user_id);
      devAssignment = await devAssignment.saveDevToDB();

      res.status(201).json({ status: 'Dev Assigned!', info: devAssignment });
    } catch (err) {
      console.log('assignDev query error: ', err);
      res.status(500).json({ msg: 'Unable to assign dev' });
    }
  }
  
};

export default devAssignmentController;
