import Project from "../models/Project.js";

const projectController = {
  getAll: async (req, res) => {

    try {
      const [project, _] = await Project.getAll();
  
      res.status(200).json({ count: project.length, project });
      
    } catch (err) {
      console.log("getProject query error: ", err);
      res.status(500).json({ msg: "Unable to get projects from database" });
    }
  },

  findById: async (req, res) => {

    try {
      const { id } = req.params;
      const [project, _] = await Project.findById(id);

      res.status(200).json({ project: project });

    } catch (err) {
      console.log("getProject query error: ", err);
      res.status(500).json({ msg: "Unable to get projects from database" });
    }
  },

  createProject: async (req, res) => {
      
      try {
        const {project_id, name, description } = req.body;
  
        const project = await Project.createProject(project_id, name, description);
  
        res.status(200).json({ project });
  
      } catch (err) {
        console.log("createProject query error: ", err);
        res.status(500).json({ msg: "Unable to create project" });
      }
    },

}

export default projectController;