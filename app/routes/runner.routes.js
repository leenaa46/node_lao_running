import runner from "../controllers/runner.controller.js";
import user from "../controllers/user.controller.js";
import express from "express";
import upload from '../utils/multer'
import auth from "../middleware/auth.middleware";
import role from "../middleware/role.middleware";

const router = express.Router();

module.exports = app => {
      // Register User
      router.post("/register", upload.single('profile_image'), user.register);

      // Register User
      router.get("/is-unique", runner.isUnique);

      // Update User Profile
      router.post("/profile", auth, role.hasRole('User'), upload.single('profile_image'), runner.updateProfile);

      // Get User Profile
      router.get("/profile", auth, role.hasRole('User'), runner.getProfile);

      // Get Bcel Qr
      router.get("/payment/:packageId", auth, role.hasRole('User'), runner.getBcelQr);

      // Pay Bcel Qr
      router.post("/payment/:packageId", auth, role.hasRole('User'), runner.payBcelQr);

      // Update User Profile
      router.post("/reward-location", auth, role.hasRole('User'), runner.updateUserLocation);

      // Get All User Profile
      router.get("/all", auth, role.hasRole('Admin'), runner.getAllRunner);

      app.use('/api/runner', router);
}