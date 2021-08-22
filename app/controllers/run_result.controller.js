const db = require("../models");
const RunResult = db.run_results;
const Response = require('../helpers/response.helper')
const Status = require('../helpers/status.helper')
const Message = require('../helpers/message.helper')


// Create and Save a new RunResult
exports.create = async (req, res) => {
  if (!req.body.package_id) {
    return Response.error(res, Message.fail._validator, {}, Status.Validation)
  }

  try {
    const run_result = {
      user_id: req.body.user_id,
      package_id: req.body.package_id,
      time: req.body.time,
      is_free_user: true
    };

    const runResult = await RunResult.create(run_result)

    return Response.success(res, Message.success._addData, runResult)
  } catch (err) {
    return Response.error(res, Message.serverError._serverError, err, Status.ServerError)
  }
};

exports.findAll = async (req, res) => {
  try {
    const runResult = await RunResult.findAll()
    return Response.success(res, Message.success._getData, runResult)
  } catch (error) {
    return Response.error(res, Message.serverError._serverError, err, Status.ServerError)
  }
};

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id

    const runResult = await RunResult.findByPk(id)
    return Response.success(res, Message.success._addData, runResult)

  } catch (error) {
    return Response.error(res, Message.serverError._serverError, error, Status.ServerError)
  }

};

// Update a RunResult by the id in the request
exports.update = (req, res) => {

};

// Delete a RunResult with the specified id in the request
exports.delete = (req, res) => {

};