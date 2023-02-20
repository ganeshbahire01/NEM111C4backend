const authmiddelware = (req, res, next) => {
  const { name, email, gender, password, age, city } = req.body;
  if (
    email != "string" ||
    name != "string" ||
    gender != "string" ||
    password != "string" ||
    age != "string"
  ) {
    res.send("From not valid");
  } else {
    next();
  }
};

module.exports = {
  authmiddelware,
};
