import { randomUUID } from 'crypto';
import Project from '../models/ProjectModel.js';

const projectController = {
  getAll: async (req, res) => {
    try {
      const [project, _] = await Project.getAll();

      res.status(200).json({ count: project.length, project });
    } catch (err) {
      console.log('getProject query error: ', err);
      res.status(500).json({ msg: 'Unable to get projects from database' });
    }
  },

  findById: async (req, res) => {
    try {
      const { id } = req.params;
      const [project, _] = await Project.findById(id);

      res.status(200).json({ project: project });
    } catch (err) {
      console.log('getProject query error: ', err);
      res.status(500).json({ msg: 'Unable to get projects from database' });
    }
  },

  createProject: async (req, res) => {
    let project_id = randomUUID().substring(0, 3);

    try {
      let { name, description } = req.body;

      let project = new Project(project_id, name, description);
      project = await project.createProject();

      res.status(201).json({ status: 'Project Created!', project });
    } catch (err) {
      console.log('createProject query error: ', err);
      res.status(500).json({ msg: 'Unable to create project' });
    }
  }
};

export default projectController;
