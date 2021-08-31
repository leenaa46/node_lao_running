import Response from '../helpers/response.helper'
import Message from '../helpers/message.helper'
import Status from '../helpers/status.helper'
import db from '../../models/'

exports.hasRole = role => {
  return async (req, res, next) => {
    let hasRole = false
    try {
      const user = await db.User.findByPk(req.user.user_id)
      const userRoles = await user.getRoles()
      userRoles.some(async userRole => {
        if (userRole.name == role) {
          hasRole = true
          return hasRole
        }
      });
    } catch (error) {
      return Response.error(res, Message.serverError._serverError, error, Status.code.ServerError)
    }

    if (!hasRole)
      return Response.error(res, Message.fail._badRole, {
        required_role: role
      }, Status.code.AuthError)

    return next()
  };
}