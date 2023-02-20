const express = require("express");
const cors = require("cors");
const { connection } = require("./db");
const { userRoutes } = require("./Routes/User.route");
const { Auth } = require("./middelware/authmiddelware");
const { postRoutes } = require("./Routes/Post.route");
const app = express();
// const {auth}
require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/user", userRoutes);
app.use(Auth);
app.use("/post", postRoutes);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
  console.log("server running");
});
