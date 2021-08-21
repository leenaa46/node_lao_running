  module.exports = app => {
    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    // Register User
    router.post("/register", user.register);

    // Login User
    router.post("/login", user.login);

    app.use('/api/auth', router);
  }