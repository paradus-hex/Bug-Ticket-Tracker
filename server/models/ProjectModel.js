import db from '../db.js';

class Project {
  constructor(project_id, name, description) {
    this.project_id = project_id;
    this.name = name;
    this.description = description;
  }

  saveProjectToDB() {
    let sql = `
    INSERT INTO projects(
      project_id,
      name,
      description
      )
    VALUES(
      '${this.project_id}',
      '${this.name}',
      '${this.description}');`;

    return db.execute(sql);
  }

  static getAll() {
    let sql = 'SELECT * FROM projects';

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM projects WHERE project_id = '${id}'`;

    return db.execute(sql);
  }

  static updateProject(id, name, description) {
    let sql = `UPDATE projects SET name = '${name}', description = '${description}' WHERE project_id = '${id}'`;

    return db.execute(sql);
  }

  static deleteProject(id) {
    let sql = `DELETE FROM projects WHERE project_id = '${id}'`;

    return db.execute(sql);
  }
}

export default Project;
