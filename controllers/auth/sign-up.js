const { UserModel } = require("../../database/user.model");
const crypto = require('crypto');
const { createHash } = require("../../services/hashing.service");
const { createHttpException } = require("../../services/create-http-exception.service");
const { createJWT } = require("../../services/jwt.service");
const { userSchema } = require("../../schemas/user");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require('uuid');
const sendEmail = require("../../services/sendEmail.service");

const signUp = async (req, res, next) => {
    const { email, password } = req.body;

    const { error } = userSchema.validate({ email, password });
    if (error) {
        throw createHttpException(400, error.message);
    }

    const passwordHash = await createHash(password);
    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const newUser = await UserModel.create({
        email,
        passwordHash,
        avatarURL,
        verificationToken,
    }).catch((e) => {
        throw createHttpException(409, "This email is already taken");
    });
    const verifyEmail = {
        to: email,
        subject: "Veryfy email",
        html: `<a target="_blanc" href="http://localhost:3000/users/verify/${verificationToken}">Click verify email`,
    };

    await sendEmail(verifyEmail);
    const sessionKey = crypto.randomUUID();
    await UserModel.findByIdAndUpdate(newUser.id, { sessionKey });

    const accessJWT = createJWT({ userId: String(newUser._id), sessionKey });

    res.status(201).json({
        user: { email: newUser.email, subscription: newUser.subscription },
    });
};

module.exports = {
    signUp,
};
