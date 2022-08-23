import AvailableUsers from '../models/AvailableUsers.js';

const availableUsersController = {
  getAvailableUsers: async (req, res) => {
    try {
      let { projectId } = req.params;

      let [availableUsers] = await AvailableUsers.getAvailableUsers(projectId);

      res.status(200).json({ availableUsers });
    } catch (err) {
      console.log('getAvailableUsers query error: ', err);
      res.status(500).json({ msg: 'Unable to get available users' });
    }
  }
};

export default availableUsersController;
