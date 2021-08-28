    import runner from "../controllers/runner.controller.js";
    import user from "../controllers/user.controller.js";
    import express from "express";
    import upload from '../utils/multer'
    import auth from "../middleware/auth.middleware";
    import role from "../middleware/role.middleware";

    const router = express.Router();

    module.exports = app => {
      // Register User
      router.post("/register", upload.single('payment_slip'), user.register);

      // Register User
      router.post("/is-unique", upload.single('payment_slip'), runner.isUnique);

      // Update User Profile
      router.post("/profile", auth, role.hasRole('User'), upload.single('profile_image'), runner.updateProfile);

      // Get User Profile
      router.get("/profile", auth, role.hasRole('User'), upload.single('profile_image'), runner.getProfile);

      app.use('/api/runner', router);
    }