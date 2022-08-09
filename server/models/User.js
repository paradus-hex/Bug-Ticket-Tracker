import db from '../db.js';

class User {
  constructor(name, email,) {
    this.name = name;
    this.email = email;
  }

  static getAll() {
    let sql = "SELECT * FROM users;";

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM posts WHERE id = ${id};`;

    return db.execute(sql);
  }
}

export default User;