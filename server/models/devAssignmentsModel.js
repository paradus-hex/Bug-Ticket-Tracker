import db from '../db.js';

class DevAssignment {
  constructor(ticket_id, user_id) {
    this.ticket_id = ticket_id;
    this.user_id = user_id;
  }

  saveDevToDB() {
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


  static getAssignedDevs(ticket_id) {
    let sql = `SELECT user_id, name, email FROM users JOIN ticket_assignments ON (ticket_assignment.user_id = users.user_id) WHERE ticket_id = '${ticket_id}'`;

    return db.execute(sql);
  }

  // static findById(id) {
  //   let sql = `SELECT * FROM ticket_assignments WHERE project_id = '${id}'`;

  //   return db.execute(sql);
  // }

  // static updateProject(id, name, description) {
  //   let sql = `UPDATE projects SET name = '${name}', description = '${description}' WHERE project_id = '${id}'`;

  //   return db.execute(sql);
  // }
}

export default DevAssignment;