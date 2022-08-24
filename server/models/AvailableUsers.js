import db from '../db.js';

class availableUsers {
  constructor(project_id, user_id) {
    this.project_id = project_id;
    this.user_id = user_id;
  }

  static getAvailableUsers(project_id) {
    let sql = `SELECT user_id, name FROM users as U WHERE NOT EXISTS (SELECT user_id FROM project_assignments as UP WHERE UP.user_id = U.user_id AND UP.project_id = '${project_id}')`;

    return db.execute(sql);
  }
}

export default availableUsers;
