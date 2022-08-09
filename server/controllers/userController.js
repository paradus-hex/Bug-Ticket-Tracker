import User from "../models/User.js";
// const bcrypt = require("bcryptjs");
// const jwtGenerator = require("../utils/jwtGenerator");

const userController =  {
  getAll: async (req, res) => {
    try {
      const [users, _] = await User.getAll();
  
      res.status(200).json({ count: users.length, users });
    } catch (err) {
      console.log("getProject query error: ", err);
      res.status(500).json({ msg: "Unable to get projects from database" });
    }
  },
  // addUser: async (req, res) => {
  //   const { firstName, lastName, phone, email, password, userAuth } = req.body;

  //   const client = await pool.connect();

  //   try {
  //     //Look if user already exists
  //     const user = await client.query("SELECT id FROM users WHERE email = $1", [
  //       email,
  //     ]);

  //     if (user.rows.length !== 0) {
  //       return res.status(401).send("User already exists");
  //     }

  //     //password encryption before adding to DB
  //     const salt = await bcrypt.genSaltSync(10);
  //     const hash = await bcrypt.hashSync(password, salt);

  //     //Add new user to DB
  //     const newUser = await client.query(
  //       "INSERT INTO users (first_name, last_name, phone, email, password_hash, user_authority) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
  //       [firstName, lastName, phone, email, hash, userAuth]
  //     );

  //     //Generate Token
  //     const token = jwtGenerator(newUser.rows[0].id);

  //     res.json({ token });
  //   } catch (err) {
  //     console.log(
  //       `Failed to add ${firstName} ${lastName} to the database: `,
  //       "\n",
  //       err
  //     );
  //     res.status(400).json({ msg: "Please review user add query" });
  //   } finally {
  //     await client.release();
  //   }
  // },
  // getUser: async (req, res) => {
  //   const { id } = req.params;
  //   const client = await pool.connect();

  //   try {
  //     const { rows } = await client.query(
  //       "SELECT id, first_name, last_name, phone, email, user_authority, password_hash FROM users WHERE id = $1",
  //       [id]
  //     );

  //     res.json(rows[0]);
  //   } catch (err) {
  //     console.log(`Failed to get user ${id}: `, "\n", err);
  //     res.status(400).json({ msg: "Please review user request query" });
  //   } finally {
  //     await client.release();
  //   }
  // },
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