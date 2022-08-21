import ProjectAssignments from "../models/ProjectAssignmentsModel.js";

const ProjectAssignmentsController = {
    assignDev: async (req, res) => {
        try {
            let { user_id } = req.body;
            let { projectId } = req.params;

            let [checkDev, _] = await ProjectAssignments.findById(projectId, user_id);

            if (checkDev.length > 0) {
                return res.status(400).json({
                    message: 'Dev already assigned to this project'
                });
            }

            let projectAssignments = new ProjectAssignments(projectId, user_id);
            projectAssignments = await projectAssignments.saveDevToDB();

            res.status(201).json({
                status: `Dev with ID: ${user_id} successfully assigned to project ${projectId}`
            });
        } catch (err) {
            console.log('assignDev query error: ', err);
            res.status(500).json({ msg: 'Unable to assign dev' });
        }
    },

    getAssignedDevs: async (req, res) => {
        try {
            let { projectId } = req.params;
            let [projectAssignments] = await ProjectAssignments.getAssignedDevs(projectId);

            res.status(200).json({ projectAssignments });
        } catch (err) {
            console.log('getAssignedDevs query error: ', err);
            res.status(500).json({ msg: 'Unable to get dev assignments' });
        }
    },

    removeDev: async (req, res) => {
        try {
            // let { user_id, project_id } = req.body;
            let { projectId } = req.params;
            let { user_id } = req.body;

            let checkDev = await ProjectAssignments.findById(projectId, user_id);

            if (checkDev.length === 0) {
                return res.status(400).json({
                    message: 'Dev not assigned to this prroject'
                });
            }

            const deleteDev = await ProjectAssignments.removeDev(projectId, user_id);

            res.status(200).json({
                status: `Dev with ID: ${user_id} removed from project ${projectId}`
            });
        } catch (err) {
            console.log('removeDev query error: ', err);
            res.status(500).json({ msg: 'Unable to remove dev' });
        }
    },

    removeAllDevs: async (req, res) => {
        try {
            let { projectId } = req.params;

            const deleteAllDev = await ProjectAssignments.removeAllDevs(projectId);

            res.status(200).json({ status: `All devs removed from project with ID: ${projectId}` });
        } catch (err) {
            console.log('removeAllDevs query error: ', err);
            res.status(500).json({ msg: 'Unable to remove all devs' });
        }
    }
};

export default ProjectAssignmentsController;