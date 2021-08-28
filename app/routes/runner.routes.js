    import runner from "../controllers/runner.controller.js";
    import express from "express";
    import upload from '../utils/multer'
    import auth from "../middleware/auth.middleware";
    import role from "../middleware/role.middleware";

    const router = express.Router();

    module.exports = app => {
      // Register User
      router.post("/profile", auth, role.hasRole('User'), upload.single('profile_image'), runner.updateProfile);

      // Register User
      router.get("/profile", auth, role.hasRole('User'), upload.single('profile_image'), runner.getProfile);

      app.use('/api/runner', router);
    }