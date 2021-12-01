    import user from "../controllers/user.controller.js";
    import express from "express";
    import auth from "../middleware/auth.middleware";
    import role from "../middleware/role.middleware";

    const router = express.Router();

    module.exports = app => {
      // Login User
      router.post("/login", user.login);

      // Get User by token
      router.post("/me", auth, user.me);

      // Create Admin
      router.post("/admin", auth, role.hasRole('Admin'), user.createAdmin);

      // Get all Admin
      router.get("/admin", auth, role.hasRole('Admin'), user.getAllAdmin);

      app.use('/api/auth', router);
    }
