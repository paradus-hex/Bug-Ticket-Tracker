import db from '../db.js';

class User {
  constructor(project_id, name, description) {
    this.project_id = project_id;
    this.name = name;
    this.description = description;

  }

  static getAll() {
    let sql = "SELECT * FROM projects;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM projects WHERE project_id = ${id};`;

    return db.execute(sql);
  }

  static createProject(project_id, name, description) {
    let sql = `INSERT INTO projects (project_id, name, description) VALUES ('${project_id}', '${name}', '${description}');`;

    return db.execute(sql);
  }
}

export default User;