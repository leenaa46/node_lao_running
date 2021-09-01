    import info from "../controllers/info.controller.js";
    import express from "express";

    const router = express.Router();

    module.exports = app => {
      // Get all Package.
      router.get("/package", info.findAllPackage);

      // Get one Package.
      router.get("/package/:id", info.findOnePackage);

      // Get all Branche.
      router.get("/hal-branche", info.findAllBranche);

      // Get one Branche.
      router.get("/hal-branche/:id", info.findOneBranche);

      // Get all Nation.
      router.get("/national", info.findAllNation);

      // Get one Nation.
      router.get("/national/:id", info.findOneNation);

      app.use('/api/info', router);
    }