const db = require("../models");
const RunResult = db.run_results;
const Response = require('../helpers/response.helper')
const Status = require('../helpers/status.helper')
const Message = require('../helpers/message.helper')


// Create and Save a new RunResult
exports.create = (req, res) => {
  // Validate request
  if (!req.body.package_id) {
    return Response.error(res, Message.fail._validator, {}, Status.Validation)
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
      return Response.success(res, Message.success._addData, data)

    })
    .catch(err => {
      return Response.error(res, Message.serverError._serverError, err, Status.ServerError)
    });
};

// Retrieve all RunResults from the database.
exports.findAll = (req, res) => {
  RunResult.findAll().then(data => {
    return Response.success(res, Message.success._getData, data)

  }).catch(err => {
    return Response.error(res, Message.serverError._serverError, err, Status.ServerError)
  })
};

// Find a single RunResult with an id
exports.findOne = (req, res) => {
  const id = req.params.id

  RunResult.findByPk(id).then(data => {
    return Response.success(res, Message.success._addData, data)

  }).catch(err => {
    return Response.error(res, Message.serverError._serverError, err, Status.ServerError)

  })
};

// Update a RunResult by the id in the request
exports.update = (req, res) => {

};

// Delete a RunResult with the specified id in the request
exports.delete = (req, res) => {

};