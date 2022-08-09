import db from '../db.js';

class User {
  constructor(name, description) {
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
}

export default User;