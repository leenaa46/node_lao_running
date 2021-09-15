    import user from "../controllers/user.controller.js";
    import express from "express";
    import auth from "../middleware/auth.middleware";

    const router = express.Router();

    module.exports = app => {
      // Login User
      router.post("/login", user.login);

      // Get User by token
      router.post("/me", auth, user.me);

      app.use('/api/auth', router);
    }
