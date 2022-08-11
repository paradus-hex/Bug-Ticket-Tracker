import bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import UserModel from '../models/UserModel.js';
import jwtGenerator from '../utils/jwtGenerator.js';

const userController = {
  getAll: async (req, res) => {
    try {
      const [users, _] = await UserModel.getAll();

      res.status(200).json({ count: users.length, users });
    } catch (err) {
      console.log('getAllUsers query error: ', err);
      res.status(500).json({ msg: 'Unable to get users from database' });
    }
  },
  addUser: async (req, res) => {
    let { name, email, password, user_authority } = req.body;
    let user_id = randomUUID().substring(0, 5);

    try {
      // //Look if user already exists
      const [user, _] = await UserModel.findByEmail(email);

      if (user.length !== 0) {
        return res.status(401).send('User already exists');
      }

      // password encryption before adding to DB
      const salt = await bcrypt.genSalt(1);
      // // Hashed password
      const hashedPassword = await bcrypt.hash(password, salt);

      // res.status(401).send(hashedPassword);

      //Add new user to DB
      let newUser = new UserModel(
        user_id,
        name,
        email,
        hashedPassword,
        user_authority
      );
      newUser = await newUser.saveUserToDB();

      //Generate Token
      const token = jwtGenerator(user_id);
      res.status(201).json({ message: 'User Created!', token });
    } catch (err) {
      console.log(
        `Failed to add ${name} ${user_id} to the database: `,
        '\n',
        err
      );
      res.status(400).json({ msg: 'Please review user and query' });
    }
  },

  getUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const [user, _] = await UserModel.findById(userId);
      res.status(200).json({ user });
    } catch (err) {
      console.log(`Failed to get user ${user_id}: `, '\n', err);
      res.status(400).json({ msg: 'Please review user request query' });
    }
  }
  // lookupUserByEmail: async (req, res) => {
  //   const { email } = req.body;
  //   console.log(`Looking for existing email: ${email}`);

  //   const client = await pool.connect();

  //   try {
  //     console.log("connected to postgres Pool");

  //     const { rows } = await client.query(
  //       "SELECT id FROM users WHERE email = $1",
  //       [email]
  //     );

  //     console.log(`query result: ${rows}`);

  //     res.json(rows);
  //   } catch (err) {
  //     console.log(`Failed to get user: `, "\n", err);
  //     res.status(400).json({ msg: "Please review user request query" });
  //   } finally {
  //     await client.release();
  //   }
  // },
  // updateUser: async (req, res) => {
  //   const { id } = req.params;
  //   const { first_name, last_name, phone, email, user_authority } = req.body;
  //   const client = await pool.connect();

  //   try {
  //     const updateUser = await client.query(
  //       "UPDATE users SET (first_name, last_name, phone, email, user_authority) = ($1, $2, $3, $4, $5) WHERE id = $6",
  //       [first_name, last_name, phone, email, user_authority, id]
  //     );

  //     res.json(`${first_name} ${last_name} profile: updated successfully`);
  //   } catch (err) {
  //     console.log(`Failed to update user ${id}: `, "\n", err);
  //     res.status(400).json({ msg: "Please review user update query" });
  //   } finally {
  //     await client.release();
  //   }
  // },
  // deleteUser: async (req, res) => {
  //   const { id } = req.params;
  //   const client = await pool.connect();

  //   try {
  //     const deleteUser = await client.query("DELETE FROM users WHERE id = $1", [
  //       id,
  //     ]);

  //     res.status(200).json({ msg: `User ${id} succesfully deleted` });
  //   } catch (err) {
  //     console.log(`Failed to delete user ${id}: `, "\n", err);
  //     res.status(500).json({ msg: `Project deletion of ${id} failed` });
  //   } finally {
  //     await client.release();
  //   }
  // },
};

export default userController;
