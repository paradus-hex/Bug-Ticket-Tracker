import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  };

  return jwt.sign(
    payload,
    process.env.JWT_SECRET
    // { expiresIn: "1hr" }
  );
}

export default jwtGenerator;
