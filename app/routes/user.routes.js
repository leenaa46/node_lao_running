    import user from "../controllers/user.controller.js";
    import express from "express";

    const router = express.Router();

    module.exports = app => {
      // Login User
      router.post("/login", user.login);

      app.use('/api/auth', router);
    }