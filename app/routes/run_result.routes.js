  import run_result from "../controllers/run_result.controller.js";
  import auth from "../middleware/auth.middleware";
  import express from "express";
  const router = express.Router();

  module.exports = app => {

    // Create a new run_result
    router.post("/", auth, run_result.create);

    // Retrieve all run_results
    router.get("/", auth, run_result.findAll);

    // Retrieve a single run_result with id
    router.get("/:id", auth, run_result.findOne);

    // Update a run_result with id
    router.put("/:id", auth, run_result.update);

    // Delete a run_result with id
    router.delete("/:id", auth, run_result.delete);

    app.use('/api/run-results', router);
  };