const {
  exit
} = require("process");
const {
  run_results
} = require("../models");
const db = require("../models");
const RunResult = db.run_results;
const Op = db.Sequelize.Op;

// Create and Save a new RunResult
exports.create = (req, res) => {
  // Validate request
  if (!req.body.package_id) {
    res.status(422).send({
      error: false,
      code: 422,
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a RunResult
  const run_result = {
    user_id: req.body.user_id,
    package_id: req.body.package_id,
    time: req.body.time,
    is_free_user: true
  };

  // Save RunResult in the database
  RunResult.create(run_result)
    .then(data => {
      res.status(200).send({
        error: false,
        code: 200,
        message: 'success',
        data: data
      })
    })
    .catch(err => {
      res.status(500).send({
        error: false,
        code: 500,
        message: err.message || "Some error occurred while creating the RunResult."
      });
    });
};

// Retrieve all RunResults from the database.
exports.findAll = (req, res) => {
  RunResult.findAll().then(data => {
    res.status(200).send({
      error: false,
      code: 200,
      message: 'success',
      data: data
    })
  }).catch(err => {
    res.status(500).send({
      error: false,
      code: 500,
      message: err.message || 'Something when wrong'
    })
  })
};

// Find a single RunResult with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  RunResult.findByPk(id).then(data => {
    res.status(200).send({
      error: false,
      code: 200,
      message: 'success',
      data: data
    })
  }).catch(err => {
    res.status(500).send({
      error: false,
      code: 500,
      message: err.message || 'Something when wrong'
    })
  })
};

// Update a RunResult by the id in the request
exports.update = (req, res) => {

};

// Delete a RunResult with the specified id in the request
exports.delete = (req, res) => {

};