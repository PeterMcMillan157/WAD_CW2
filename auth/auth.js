const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

//method to handle login
exports.login = function (req, res,next) {
  let username = req.body.username;
  let password = req.body.password;

  userModel.lookupUser(username, function (err, user) {
    if (err) {
      console.log("error looking up user", err);
      return res.status(401).send();
    }
    if (!user) {
      console.log("user ", username, " was not found");
      return res.render("user/staffLogin")
   }
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        //use the payload to store information about the user such as username.
        let payload = { username: username };
        //create the access token 
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 300}); 
        res.cookie("jwt", accessToken);
        next();
      } else {
        return res.render("user/staffLogin"); 
      }
    });
  });
};



//method to verify users
exports.verify = function (req, res, next) {
  let accessToken = req.cookies.jwt;
  if (!accessToken) {
    return res.status(403).send();
  }
  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    next();
  } catch (e) {
    //if an error occured return request unauthorized error
    res.status(401).send();
  }
};


