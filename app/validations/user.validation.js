import Response from '../helpers/response.helper'
import Status from '../helpers/status.helper'
import Message from '../helpers/message.helper'
import db from "../../models"
import createError from 'http-errors'
import {
  Joi, validate
} from 'express-validation'
import validator from '../utils/validator'

const User = db.users;
const Package = db.packages;

exports.register = async (req, res, next) => {
  let errors = {}
  const name = req.body.name ? req.body.name : null
  const email = req.body.email ? req.body.email : null
  const password = req.body.password ? req.body.password : null
  const package_id = req.body.package_id ? req.body.package_id : null
  const phone = req.body.phone ? req.body.phone : null

  const passwordMin = 8

  if (!name) errors.name = Message.validation('required', 'name')
  if (!password) errors.password = Message.validation('required', 'password')
  if (password.length < passwordMin) Message.validation('min', 'password', passwordMin)
  if (!email) errors.email = Message.validation('required', 'email')
  if (await User.findOne({
    where: {
      email: email
    }
  })) errors.email = Message.validation('exists', 'email')

  if (!phone) errors.phone = Message.validation('required', 'phone')
  if (await User.findOne({
    where: {
      phone: phone
    }
  })) errors.phone = Message.validation('exists', 'phone')

  if (!package_id) errors.package_id = Message.validation('required', 'package_id')
  if (!await Package.findOne({
    where: {
      id: package_id
    }
  })) errors.package_id = [Message.validation('not_exists', 'package_id')]


  if (!Object.keys(errors).length)
    return next();

  next(createError(Status.code.Validation, errors))
};

exports.login = async (req, res, next) => {
  let errors = {}
  const email = req.body.email ? req.body.email : null
  const password = req.body.password ? req.body.password : null

  if (!password) errors.password = Message.validation('required', 'password')
  if (!email) errors.email = Message.validation('required', 'email')

  if (!Object.keys(errors).length)
    return next();

  next(createError(Status.code.Validation, errors))
};

exports.JoiRegist = {
  body: Joi.object({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
  })

}

exports.secondStep = validator.validateDefault(
  {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
    }),
  }
)

exports.firstStep = validator.validateDefault(
  {
    body: Joi.object({
      name: Joi.string()
        .required(),
      surname: Joi.string()
        .required(),
      national_id: Joi.number().required(),
      dob: Joi.date()
        .required(),
      gender: Joi.string()
        .required(),
    }),
  }
)

exports.resetPassword = validator.validateDefault(
  {
    body: Joi.object({
      new_password: Joi.string()
        .min(8)
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
    }),
  }
)

exports.updateRange = validator.validateDefault(
  {
    body: Joi.object({
      range: Joi.string().valid('15', '42', '100', '200')
        .required()
    }),
  }
)

exports.lastStep = validator.validateDefault(
  {
    body: Joi.object({
      name: Joi.string()
        .required(),
      surname: Joi.string()
        .required(),
      national_id: Joi.number().required(),
      dob: Joi.date()
        .required(),
      gender: Joi.string()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(8)
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
      id_token: Joi.string()
        .required(),
    }),
  }
)

exports.resetPasswordUser = validator.validateDefault(
  {
    body: Joi.object({
      password: Joi.string()
        .min(8)
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
      id_token: Joi.string()
        .required(),
    }),
  }
)