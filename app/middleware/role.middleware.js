import Response from '../helpers/response.helper'
import Message from '../helpers/message.helper'
import Status from '../helpers/status.helper'
import db from '../../models/'
import createError from 'http-errors'

exports.hasRole = role => {
  return async (req, res, next) => {
    let hasRole = false
    try {
      const user = await db.User.findByPk(req.user.user_id)
      if (!user) next(createError(Status.code.NotFound, Message.fail._notFound('user')))
      const userRoles = await user.getRoles()
      userRoles.some(async userRole => {
        if (userRole.name == role) {
          hasRole = true
          return hasRole
        }
      });
    } catch (error) {
      next(error)
    }

    if (!hasRole)
      next(createError(Status.code.AuthError, {
        required_role: role
      }))

    return next()
  };
}