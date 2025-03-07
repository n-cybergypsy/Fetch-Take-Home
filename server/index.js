const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db.config");

app.use(cors());
app.use(express.json());

//ROUTES//

//Add a favorite dog
app.post("/favorites", async (req, res) => {
  //await
  try {
   const {user_id, dog_id} = req.body;
   const newFavorite = await pool.query(
    `INSERT INTO favorites (dog_id, user_id)
     VALUES ($1, $2)
     ON CONFLICT (dog_id, user_id) DO NOTHING
     RETURNING *;`,
    [dog_id, user_id]
  );
   res.json(newFavorite);

  } catch (error) {
    console.error(error.message);
  }
})

//Get all favorite dogs
app.get("/favorites/:id", async (req, res) =>{
  try {
    const {id} = req.params;
    const allUserFavorites = await pool.query(
      `SELECT * FROM favorites 
      WHERE user_id = $1`,
      [id]);
    res.json(allUserFavorites.rows);
  } catch (error) {
    console.error(error.message);
  }
})

//Rmove a favorite dog
app.delete('/favorites', async (req, res) => {
  try {
    const {user_id, dog_id} = req.body;
    const deleteFavorite = await pool.query(
      `DELETE FROM favorites
      WHERE dog_id = $1 AND user_id = $2`,
      [dog_id, user_id])
    res.json("Dog was removed from favorites.")
  } catch (error) {
    console.error(error.message);
  }
})

//USER APIs
//create a new user
app.post("/user", async (req, res) => {
  //await
  try {
   const {user_name, user_email} = req.body;
   const newUser = await pool.query(
    `INSERT INTO users (name, email_address) 
   VALUES ($1, $2) 
   ON CONFLICT (email_address) DO NOTHING 
   RETURNING *;`, 
  [user_name, user_email])
   res.json(newUser);

  } catch (error) {
    console.error(error.message);
  }
})

//get user id
app.get("/user/:email", async (req, res) => {
  //await
  try {
    const {email} = req.params;
    const userId = await pool.query(
      `SELECT user_id FROM users
      WHERE email_address = $1`,
      [email]);
    res.json(userId.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
})

//get all users
app.get("/users", async (req, res) =>{
  try {
    const allUsers = await pool.query(`SELECT * FROM users`);
    res.json(allUsers.rows);
  } catch (error) {
    console.error(error.message);
  }
})

//remove user
app.delete("/user/:id", async (req, res) => {
  //await
  try {
    const {id} = req.params;
    await pool.query(
      `DELETE FROM favorites
      WHERE user_id = $1`,
      [id]) //remove all favorites
    await pool.query(
      `DELETE FROM users
      WHERE user_id = $1`,
      [id])
    res.json("User was removed.")
  } catch (error) {
    console.error(error.message);
  }
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});