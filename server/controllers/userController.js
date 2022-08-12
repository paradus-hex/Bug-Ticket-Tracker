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
      //Look if user already exists
      const [user, _] = await UserModel.findByEmail(email);

      if (user.length !== 0) {
        return res.status(401).send('User already exists');
      }

      // password encryption before adding to DB
      const salt = await bcrypt.genSalt(1);
      // // Hashed password
      const hashedPassword = await bcrypt.hash(password, salt);

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
  },

  updateUser: async (req, res) => {
    const { userId } = req.params;
    const { name, email, user_authority } = req.body;

    try {
      const updatedUser = await UserModel.updateUserInformation(
        userId,
        name,
        email,
        user_authority
      );
      res.status(201).json({ message: 'User updated!' });
    } catch (err) {
      console.log(`Failed to update user ${userId}: `, '\n', err);
      res.status(400).json({ msg: 'Please review user update query' });
    }
  },
  deleteUser: async (req, res) => {
    const { userId } = req.params;

    try {
      const deleteUser = await UserModel.deleteUser(userId);
      res.status(200).json({ msg: `User ${userId} successfully deleted` });
    } catch (err) {
      console.log(`Failed to delete user ${userId}: `, '\n', err);
      res.status(500).json({ msg: `Project deletion of ${userId} failed` });
    }
  }
};

export default userController;
