module.exports = app => {
  const run_results = require("../controllers/run_result.controller.js");

  var router = require("express").Router();

  // Create a new run_result
  router.post("/", run_results.create);

  // Retrieve all run_results
  router.get("/", run_results.findAll);

  // Retrieve a single run_result with id
  router.get("/:id", run_results.findOne);

  // Update a run_result with id
  router.put("/:id", run_results.update);

  // Delete a run_result with id
  router.delete("/:id", run_results.delete);


  app.use('/api/run-results', router);
};