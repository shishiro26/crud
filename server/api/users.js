const express = require("express");
const router = express.Router();
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;
  name = name.trim();
  email = email.trim();
  password = password.trim();

  if (!name || !email || !password) {
    res.json({
      status: "FAILED",
      message: "Empty input fields not allowed",
    });
  } else if (!/^[a-zA-Z ]*$/.test(name)) {
    res.json({
      status: "FAILED",
      message: "Invalid name entered",
    });
  } else if (!/^[\w\.-]+@[\w-]+\.[\w]{2,4}$/.test(email)) {
    res.json({
      status: "FAILED",
      message: "Invalid Email entered",
    });
  } else if (password.lengcoth < 8) {
    res.json({
      status: "FAILED",
      message: "Password is too short",
    });
  } else {
    User.find({ email })
      .then((result) => {
        if (result.length) {
          res.json({
            status: "Failed",
            message: "User already exists with the provided email address",
          });
        } else {
          const saltRounds = 10;
          bcrypt
            .hash(password, saltRounds)
            .then((hashedPassword) => {
              const newUser = new User({
                name,
                email,
                password: hashedPassword,
              });
              newUser
                .save()
                .then((result) => {
                  res.json({
                    status: "Success",
                    message: result,
                  });
                })
                .catch((err) => {
                  res.json({
                    status: "Failed",
                    message: "Error while saving the user",
                  });
                });
            })
            .catch((err) => {
              console.log("The error in hashing the pass", err);
              res.json({
                status: "Failed",
                message: "Error while hashing the password",
              });
            });
        }
      })
      .catch((err) => {
        console.log("The error is here ", err);
        res.json({
          status: "Failed",
          message: "Error while checking the user",
        });
      });
  }
});

router.post("/login", (req, res) => {
  let { email, password } = req.body;
  email = email.trim();
  password = password.trim();

  if (!email || !password) {
    res.json({
      status: "FAILED",
      message: "Empty input fields not allowed",
    });
  } else {
    User.findOne({ email })
      .then((user) => {
        if (user) {
          const hashedPassword = user.password;
          bcrypt
            .compare(password, hashedPassword)
            .then((result) => {
              if (result) {
                res.json({
                  status: "Success",
                  message: "signin successful",
                  data: user,
                });
              } else {
                res.json({
                  status: "Failed",
                  message: "Invalid credentials",
                });
              }
            })
            .catch((err) => {
              res.json({
                status: "Failed",
                message: "Error while comparing the passwords",
              });
            });
        } else {
          res.json({
            status: "Failed",
            message: "Invalid credentials",
          });
        }
      })
      .catch((err) => {
        res.json({
          status: "Failed",
          message: "Error while checking the user",
        });
      });
  }
});

router.get("/all", (req, res) => {
  User.find()
    .then((result) => {
      res.json({
        status: "Success",
        message: result,
      });
    })
    .catch((err) => {
      res.json({
        status: "Failed",
        message: "Error while fetching all users",
      });
    });
});
module.exports = router;
