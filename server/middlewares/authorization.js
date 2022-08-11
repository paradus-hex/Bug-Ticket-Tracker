import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export default async (req, res, next) => {
  try {
    const jwtToken = req.header('token');

    if (!jwtToken) {
      return res.status(403).json('Not Authorized');
    }

    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);

    req.user = payload.user;

    next();
  } catch (err) {
    console.log(err);
    // console.error(err.message);
    return res.status(403).json('Not Authorized');
  }
};
