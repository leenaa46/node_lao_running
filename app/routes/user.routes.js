  module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const Request = require('../validations/user.validation')

    var router = require("express").Router();

    // Register User
    router.post("/register", Request.register, user.register);

    // Login User
    router.post("/login", Request.login, user.login);

    app.use('/api/auth', router);
  }