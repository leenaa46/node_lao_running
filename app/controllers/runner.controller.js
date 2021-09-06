import db from "../../models";
import Response from '../helpers/response.helper';
import Status from '../helpers/status.helper';
import Message from '../helpers/message.helper';
import Image from '../helpers/upload.helper'
import Onepay from '../helpers/bcel.helper'
import QRCode from 'qrcode'
import createError from 'http-errors'

/**
 * Update User Profile.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.updateProfile = async (req, res, next) => {
  const transaction = await db.sequelize.transaction();
  try {

    const userProfile = await db.UserProfile.findOne({
      where: {
        user_id: req.user.user_id
      },
    })

    if (!userProfile)
      next(createError(Status.code.NotFound, Message.fail._notFound))

    const {
      name,
      surname,
      gender,
      dob,
      national_id,
      hal_branche_id,
    } = req.body

    let profile_image = userProfile.profile_image ? userProfile.profile_image : null
    let profile_image_id = userProfile.profile_image_id ? userProfile.profile_image_id : null

    if (req.file) {
      if (profile_image && profile_image_id) {
        await Image.destroy(profile_image_id)
      }
      const cloudImage = await Image.upload(req.file)
      profile_image_id = cloudImage.public_id
      profile_image = cloudImage.secure_url
    }

    const updateData = await userProfile.update({
      name,
      surname,
      gender,
      dob,
      hal_branche_id,
      national_id,
      profile_image_id,
      profile_image_id,
      profile_image: profile_image
    }, {
      transaction: transaction,
    })


    await transaction.commit()
    return Response.success(res, Message.success._success, updateData);

  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

/**
 * Get User Profile.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.getProfile = async (req, res, next) => {
  try {
    const userProfile = await db.UserProfile.findOne({
      where: {
        user_id: req.user.user_id
      },
    })
    if (!userProfile)
      next(createError(Status.code.NotFound, Message.fail._notFound))

    return Response.success(res, Message.success._success, userProfile);

  } catch (error) {
    next(error)
  }
}

/**
 * Check Phone Number unique.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.isUnique = async (req, res, next) => {
  try {
    const phone = req.query.phone ? req.query.phone : null

    if (phone < 8)
      next(createError(Status.code.Validation, {
        phone: Message.validation('min', 'phone', 8)
      }))

    const user = await db.User.findOne({
      where: {
        phone: phone
      }
    })

    if (!user)
      return Response.success(res, Message.success._success, true);

    return Response.success(res, Message.success._success, false);


  } catch (error) {
    next(error)
  }
}

/**
 * Get Bcel Qr.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.getBcelQr = async (req, res, next) => {
  try {
    const data = {
      uuid: '9999992',
      transactionid: '1111112',
      invoiceid: '2222224',
      terminalid: '3333334',
      amount: '2',
      description: 'loacadcadcSK',
    }
    console.log(Onepay);
    const qr = await QRCode.toDataURL(Onepay.getCode(data))

    return Response.success(res, Message.success._success, qr);


  } catch (error) {
    next(error)
  }
}