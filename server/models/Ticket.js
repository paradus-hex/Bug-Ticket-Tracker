import db from '../db.js';

class Ticket {
  constructor(
    ticket_id,
    title,
    description,
    status,
    author_id,
    created_at,
    project_id
  ) {
    (this.ticket_id = ticket_id),
      (this.title = title),
      (this.description = description),
      (this.status = status),
      (this.author_id = author_id),
      (this.created_at = created_at),
      (this.project_id = project_id);
  }

  static getAll() {
    let sql = 'SELECT * FROM tickets;';

    return db.execute(sql);
  }

  static getTicket(id) {
    let sql = `SELECT * FROM tickets JOIN users ON tickets.author_id = users.user_id WHERE tickets.ticket_id = '${id}'`;
    return db.execute(sql);
  }

  static getProjectTickets(projectId) {
    // let sql = `SELECT * FROM tickets WHERE project_id = ${projectId};`
    let sql = `SELECT * FROM tickets JOIN users ON tickets.author_id = users.user_id WHERE project_id = '${projectId}'`;
    return db.execute(sql);
  }

  createTicket() {
    let sql = `INSERT INTO tickets (ticket_id, title, description, status, author_id, created_at, project_id) VALUES ('${this.ticket_id}', '${this.title}', '${this.description}', '${this.status}', '${this.author_id}', '${this.created_at}', '${this.project_id}')`;

    return db.execute(sql);
  }

  static updateTicket(
    ticketId,
    title,
    description,
    status,
    // author_id,
    created_at
    // project_id
  ) {
    // let sql = `UPDATE tickets SET title = '${title}', description = '${description}', status = '${status}', author_id = '${author_id}', created_at = '${created_at}', project_id = '${project_id}' WHERE ticket_id = '${ticketId}'`;
    let sql = `UPDATE tickets SET title = '${title}', description = '${description}', status = '${status}', created_at = '${created_at}' WHERE ticket_id = '${ticketId}'`;

    return db.execute(sql);
  }
  static deleteTicket(ticketId) {
    let sql = `DELETE FROM tickets WHERE ticket_id = '${ticketId}'`;

    return db.execute(sql);
  }
}

export default Ticket;
