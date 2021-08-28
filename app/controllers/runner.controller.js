import db from "../../models";
import Response from '../helpers/response.helper';
import Status from '../helpers/status.helper';
import Message from '../helpers/message.helper';
import Image from '../helpers/upload.helper'

exports.updateProfile = async (req, res) => {
  const transaction = await db.sequelize.transaction();
  try {

    const userProfile = await db.UserProfile.findOne({
      where: {
        user_id: req.user.user_id
      }
    })

    if (!userProfile)
      return Response.error(res, Message.fail._notFound, null, Status.code.NotFound)

    const name = req.body.name ? req.body.name : null
    const surname = req.body.surname ? req.body.surname : null
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
      name: name,
      surname: surname,
      profile_image_id,
      profile_image_id,
      profile_image: profile_image
    }, {
      transaction: transaction
    })

    await transaction.commit()
    return Response.success(res, Message.success._success, updateData);

  } catch (error) {
    await transaction.rollback()
    console.log(error);
    return Response.error(res, Message.serverError._serverError, error)
  }
}

exports.getProfile = async (req, res) => {
  try {
    const userProfile = await db.UserProfile.findOne({
      where: {
        user_id: req.user.user_id
      }
    })

    if (!userProfile)
      return Response.error(res, Message.fail._notFound, null, Status.code.NotFound)

    return Response.success(res, Message.success._success, userProfile);

  } catch (error) {
    console.log(error);
    return Response.error(res, Message.serverError._serverError, error)
  }
}