    import info from "../controllers/info.controller.js";
    import express from "express";

    const router = express.Router();

    module.exports = app => {
      // Get all Package.
      router.get("/package", info.findAll);

      // Get one Package.
      router.get("/package/:id", info.findOne);

      app.use('/api/info', router);
    }