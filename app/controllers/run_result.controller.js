import db from "../../models";
import Response from '../helpers/response.helper'
import Status from '../helpers/status.helper'
import Message from '../helpers/message.helper'

/**
 * Create run result
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper 
 */
exports.create = async (req, res) => {


  try {
    const run_result = {
      user_id: req.body.user_id,
      package_id: req.body.package_id,
      time: req.body.time,
      is_free_user: true
    };

    const runResult = await db.RunResult.create(run_result)

    return Response.success(res, Message.success._addData, runResult)
  } catch (err) {
    return Response.error(res, Message.serverError._serverError, err, Status.ServerError)
  }
};

/**
 * Get all run result
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.findAll = async (req, res) => {
  try {
    const runResult = await db.RunResult.findAll()
    return Response.success(res, Message.success._getData, runResult)
  } catch (error) {
    return Response.error(res, Message.serverError._serverError, error, Status.code.ServerError)
  }
};

/**
 * Get one run result
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id

    const runResult = await db.RunResult.findByPk(id)
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