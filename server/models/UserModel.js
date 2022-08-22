import db from '../db.js';

class User {
  constructor(id, name, email, password, role) {
    this.id = id;
    this.hashedPassword = password;
    this.name = name;
    this.email = email;
    this.role = role;
  }
  saveUserToDB() {
    let sql = `
    INSERT INTO users(
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
      '${this.hashedPassword}',
      '${this.role}'
    )
    `;
    return db.execute(sql);
  }

  static getAll() {
    let sql = 'SELECT user_id, name, email, user_authority FROM users;';

    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM users WHERE user_id = '${id}';`;

    return db.execute(sql);
  }

  static findByEmail(email) {
    let sql = `SELECT * FROM users WHERE email = '${email}';`;

    return db.execute(sql);
  }

  static updateUserInformation(id, name, email, user_authority) {
    let sql = `UPDATE users SET name = '${name}', email = '${email}', user_authority = '${user_authority}' WHERE user_id = '${id}'`;

    return db.execute(sql);
  }

  static deleteUser(id) {
    let sql = `DELETE FROM users WHERE user_id = '${id}'`;
    return db.execute(sql);
  }
}

export default User;
