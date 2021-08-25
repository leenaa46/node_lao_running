    import user from "../controllers/user.controller.js";
    import Request from '../validations/user.validation';
    import express from "express";

    const router = express.Router();

    module.exports = app => {


      // Register User
      router.post("/register", user.register);

      // Login User
      router.post("/login", user.login);

      app.use('/api/auth', router);
    }