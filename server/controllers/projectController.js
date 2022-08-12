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
      project = await project.saveProjectToDB();

      res.status(201).json({ status: 'Project Created!' });
    } catch (err) {
      console.log('createProject query error: ', err);
      res.status(500).json({ msg: 'Unable to create project' });
    }
  },

  updateProject: async (req, res) => {
    try {
      let { id } = req.params;
      let { name, description } = req.body;
      
      const [project, _] = await Project.findById(id);

      if (!project.length === 0) {

        let [project, _] = await Project.updateProject(id, name, description);
      }

      else {
        return res.status(404).json({ status: `Project with ID: ${id} does not exist!` });
      }

      res.status(200).json({ status: `Project with ID: ${id} update!` });
    } catch (err) {
      console.log('updateProject query error: ', err);
      res.status(500).json({ msg: 'Unable to update project' });
    }
  }
  
};

export default projectController;
