const jwt = require("jsonwebtoken");
require("dotenv").config();
const Auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.send("Login Failed!");
      }
      if (decoded) {
        req.body.id = decoded.Id;
        // console.log(deco);
        next();
      }
    });
  } else {
    res.send("Please login");
  }
};

module.exports = {
  Auth,
};
