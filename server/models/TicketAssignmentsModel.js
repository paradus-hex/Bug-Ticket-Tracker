import db from '../db.js';

class TicketAssignments {
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

  static findById(ticket_id, user_id) {
    let sql = `SELECT * FROM ticket_assignments WHERE ticket_id = '${ticket_id}' AND user_id = '${user_id}'`;
    
    return db.execute(sql);
  }

  static getAssignedDevs(ticket_id) {
    let sql = `SELECT A.user_id, A.name, A.email FROM users a JOIN ticket_assignments B ON (A.user_id = B.user_id) WHERE ticket_id = '${ticket_id}'`;

    return db.execute(sql);
  }

  static removeDev(ticket_id, user_id) {
    let sql = `DELETE FROM ticket_assignments WHERE ticket_id = '${ticket_id}' AND user_id = '${user_id}'`;

    return db.execute(sql);
  }

  static removeAllDevs(ticket_id) {
    let sql = `DELETE FROM ticket_assignments WHERE ticket_id = '${ticket_id}'`;

    return db.execute(sql);
  }
}

export default TicketAssignments;