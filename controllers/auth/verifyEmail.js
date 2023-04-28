const { UserModel } = require("../../database/user.model");
const { createHttpException } = require("../../services/create-http-exception.service");

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await UserModel.findOne({ verificationToken });
    if (!user) {
        throw createHttpException(404, "User not found");
    }
    await UserModel.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: "",
    });

    res.json({ message: "Verification successful" });
};

module.exports = {
    verifyEmail,
};