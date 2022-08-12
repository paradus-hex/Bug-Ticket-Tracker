import db from '../db.js';

class DevAssignment {
  constructor(ticket_id, user_id) {
    this.ticket_id = ticket_id;
    this.user_id = user_id;
  }

  assignDev() {
    let sql = `
    INSERT INTO ticket_assignments(
      ticket_id, 
      user_id
      )
    VALUES(
      '${this.ticket_id}',
      '${this.user_id}');`;

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
}

export default DevAssignment;
