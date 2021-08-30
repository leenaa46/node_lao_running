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
    const per_page = Number.parseInt(req.query.per_page)
    let page = Number.parseInt(req.query.page)

    if (per_page) {
      let packageData = {}
      page = page && page > 0 ? page : 1

      const packages = await db.Package.findAndCountAll({
        limit: per_page,
        offset: (page - 1) * per_page,
        subQuery: false
      })

      packageData.data = packages.rows
      packageData.pagination = {
        total: packages.count,
        per_page: per_page,
        total_pages: Math.ceil(packages.count / per_page),
        current_page: page
      }

      return Response.success(res, Message.success._success, packageData);
    }

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