    import user from "../controllers/user.controller.js";
    import Request from '../validations/user.validation';
    import express from "express";
    import upload from '../utils/multer'

    const router = express.Router();

    module.exports = app => {
      // Register User
      router.post("/register", upload.single('payment_slip'), user.register);

      // Login User
      router.post("/login", user.login);

      app.use('/api/auth', router);
    }