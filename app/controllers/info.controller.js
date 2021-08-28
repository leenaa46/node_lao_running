import db from "../../models";
import Response from '../helpers/response.helper';
import Message from '../helpers/message.helper';

/**
 * Get all Package.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.findAll = async (req, res) => {
  try {
    const packages = await db.Package.findAll()

    return Response.success(res, Message.success._success, packages);

  } catch (error) {
    return Response.error(res, Message.serverError._serverError, error)
  }
}

/**
 * Get one Package.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const packages = await db.Package.findByPk(id)

    return Response.success(res, Message.success._success, packages);

  } catch (error) {
    return Response.error(res, Message.serverError._serverError, error)
  }
}