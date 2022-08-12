import bcrypt from 'bcrypt';
import { Router } from 'express';
import UserModel from '../models/UserModel.js';
import jwtGenerator from '../utils/jwtGenerator.js';

const router = Router();

//Matches route /login
router.post('/', async (req, res) => {
  try {
    //1. destructure req.body
    const { email, password } = req.body;

    //2. check if user doesn't exist (throw error if not)
    const [user, _] = await UserModel.findByEmail(email);

    if (user.length === 0) {
      return res.status(401).send('Email or password is incorrect');
    }

    //3. check if incoming password is correct
    const validPassword = await bcrypt.compare(password, user[0].hashed_pass);
    if (!validPassword) {
      return res.status(401).send('Email or password is incorrect');
    }

    //4. give jwt token
    const token = jwtGenerator(user[0].user_id);

    res.json({
      token,
      auth: user[0].user_authority
    });
  } catch (err) {
    console.error(err.message);
  }
});

export default router;
