import db from '../db.js';

class User {
  constructor(id,name,email,password,role) {
    this.id = id;
    this.password= password;
    this.name = name;
    this.email = email;
  }
  static addUser(){
    let sql = `
    INSERT INTO posts(
      user_id,
      name,
      email,
      hashed_pass,
      user_authority
    )
    VALUES(
      '${this.id}',
      '${this.name}',
      '${this.email}',
      '${this.password}',
      '${this.role}'
    )
    `;
    return db.execute(sql);
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