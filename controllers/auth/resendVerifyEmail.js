const { UserModel } = require("../../database/user.model");
const { emailSchema } = require("../../schemas/user");
const { createHttpException } = require("../../services/create-http-exception.service");
const sendEmail = require("../../services/sendEmail.service");



const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const { error } = emailSchema.validate({ email });
    if (error) {
        console.log(error)
        throw createHttpException(400, error.message);
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createHttpException(400, "User not found");
    }
    if (user.verify) {
        throw createHttpException(400, "Verification has already been passed");
    }
    const verifyEmail = {
        to: email,
        subject: "Veryfy email",
        html: `<a target="_blanc" href="http://localhost:3000/users/verify/${user.verificationToken}">Click verify email`,
    };

    await sendEmail(verifyEmail);
    res.json({ message: "Verification email sent" });
};

module.exports = {
    resendVerifyEmail,
};