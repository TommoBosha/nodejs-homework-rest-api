const { UserModel } = require("../../database/user.model");
const crypto = require("crypto");
const { createHttpException } = require("../../services/create-http-exception.service");
const { checkHash } = require("../../services/hashing.service");
const { createJWT } = require("../../services/jwt.service");
const { userSchema } = require("../../schemas/user");

const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    const { error } = userSchema.validate({ email, password });
    if (error) {
        throw createHttpException(400, error.message);
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw createHttpException(404, "Email or password is wrong");
    }
    const match = await checkHash(password, user.passwordHash);
    if (!match) {
        res.status(401).json({ message: "Email or password is wrong" });
        return;
    }

    const sessionKey = crypto.randomUUID();
    await UserModel.findByIdAndUpdate(user.id, { sessionKey });

    const accessJWT = createJWT({
        userId: String(user._id),
        sessionKey,
    });

    res.json({
        token: accessJWT,
        user: { email: user.email, subscription: user.subscription },
    });
};

module.exports = {
    signIn,
};