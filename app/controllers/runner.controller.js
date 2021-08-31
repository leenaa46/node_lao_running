import db from "../../models";
import Response from '../helpers/response.helper';
import Status from '../helpers/status.helper';
import Message from '../helpers/message.helper';
import Image from '../helpers/upload.helper'

/**
 * Update User Profile.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.updateProfile = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {

    const userProfile = await db.UserProfile.findOne({
      where: {
        user_id: req.user.user_id
      },
    })

    if (!userProfile)
      return Response.error(res, Message.fail._notFound, null, Status.code.NotFound)

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
    return Response.error(res, Message.serverError._serverError, error)
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
exports.getProfile = async (req, res) => {
  try {
    const userProfile = await db.UserProfile.findOne({
      where: {
        user_id: req.user.user_id
      },
    })
    if (!userProfile)
      return Response.error(res, Message.fail._notFound, null, Status.code.NotFound)

    return Response.success(res, Message.success._success, userProfile);

  } catch (error) {
    return Response.error(res, Message.serverError._serverError, error)
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
exports.isUnique = async (req, res) => {
  try {
    const phone = req.body.phone ? req.body.phone : null

    if (phone < 8)
      return Response.error(res, Message.fail._validation, {
        phone: Message.validation('min', 'phone', 8)
      }, Status.code.Validation)

    const user = await db.User.findOne({
      where: {
        phone: phone
      }
    })

    if (!user)
      return Response.success(res, Message.success._success, true);

    return Response.success(res, Message.success._success, false);


  } catch (error) {
    return Response.error(res, Message.serverError._serverError, error)
  }
}