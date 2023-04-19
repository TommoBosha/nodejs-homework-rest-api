const { UserModel } = require("../database/user.model");
const { createHttpException } = require("../services/create-http-exception.service");
const { veryfyJWT } = require("../services/jwt.service");

const userAuthMiddleware = async (req, res, next) => {
    const unauthorizedMessage = "Not authorized";

    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            throw createHttpException(401, unauthorizedMessage);
        }

        const [bearer, token] = authorizationHeader.split(" ");
        if (bearer !== "Bearer" || !token) {
            throw createHttpException(401, unauthorizedMessage);
        }

        try {
            const tokenPayload = veryfyJWT(token);
            if (!tokenPayload.userId || !tokenPayload.sessionKey) {
                throw createHttpException(401, unauthorizedMessage);
            }

            const user = await UserModel.findById(tokenPayload.userId);

            if (!user) {
                throw createHttpException(401, unauthorizedMessage);
            }

            if (tokenPayload.sessionKey !== user.sessionKey) {
                throw createHttpException(401, unauthorizedMessage);
            }

            req.user = user;
            next();
        } catch (error) {
            throw createHttpException(401, unauthorizedMessage);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = {
    userAuthMiddleware,
};