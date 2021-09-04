import db from "../../models";
import Response from '../helpers/response.helper';
import Status from '../helpers/status.helper';
import Message from '../helpers/message.helper';
import Image from '../helpers/upload.helper'
import Onepay from '../helpers/bcel.helper'
import UniqueId from '../helpers/uniqueId.helper'
import QRCode from 'qrcode'

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
    const phone = req.query.phone ? req.query.phone : null

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

/**
 * Get Bcel Qr.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.getBcelQr = async (req, res) => {
  const transaction = await db.sequelize.transaction()
  try {
    const runnerPackage = await db.Package.findByPk(req.params.packageId)
    if (!runnerPackage) return Response.error(res, Message.fail._notFound, {}, Status.code.NotFound)

    let userPackage = await db.UserPackage.findOne({
      where: {
        user_id: req.user.user_id
      },
    })

    /**
     * @overide  userPackage
     */
    if (!userPackage) {
      userPackage = await runnerPackage.createUserPackage({
        total: runnerPackage.price,
        user_id: req.user.user_id,
        transaction_id: await UniqueId.generateRandomTransactionId(),
        invoice_id: await UniqueId.generateRandomInvoiceId(),
        terminal_id: await UniqueId.generateRandomTerminalId(),
      }, {
        transaction: transaction
      })
    }

    if (userPackage.status == 'pending') {
      const data = {
        transactionid: userPackage.transaction_id,
        invoiceid: userPackage.invoice_id,
        terminalid: userPackage.terminal_id,
        amount: userPackage.total,
      }

      const qr = await QRCode.toDataURL(Onepay.getCode(data))

      const paymentData = {
        id: userPackage.id,
        package_id: userPackage.package_id,
        total: userPackage.total,
        status: userPackage.status,
        transaction_id: userPackage.transaction_id,
        invoice_id: userPackage.invoice_id,
        terminal_id: userPackage.terminal_id,
        payment_qr: qr
      }

      await transaction.commit()
      return Response.success(res, Message.success._success, paymentData);
    }
    await transaction.commit()
    return Response.error(res, Message.fail._userAreadyPaid, userPackage, Status.code.BadRequest)
  } catch (error) {
    await transaction.rollback()
    console.log(error);
    return Response.error(res, Message.serverError._serverError, error)
  }
}

/**
 * Pay Bcel Qr.
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @returns \app\helpers\response.helper
 */
exports.payBcelQr = async (req, res) => {
  const transaction = await db.sequelize.transaction()
  try {
    const payment = await db.UserPackage.findOne({
      where: {
        user_id: req.user.user_id
      }
    })
    if (!payment) return Response.error(res, Message.fail._notFound, {}, 404)
    if (payment.status == 'success') return Response.error(res, Message.fail._userAreadyPaid, payment, Status.code.BadRequest)

    const paid = await payment.update({
      status: 'success'
    })

    await transaction.commit()

    return Response.success(res, Message.success._success, paid);

  } catch (error) {
    await transaction.rollback()
    console.log(error);
    return Response.error(res, Message.serverError._serverError, error)
  }
}