const express = require("express");
const { signUp } = require("../../controllers/auth/sign-up");
const { signIn } = require("../../controllers/auth/sing-in");
const { getCurrent } = require("../../controllers/auth/current");
const { logout } = require("../../controllers/auth/logout");
const { controllerWrapper } = require("../../services/controller-wrapper.service");
const { userAuthMiddleware } = require("../../middlewares/user-auth.middlewares");
const { updateAvatar } = require("../../controllers/auth/updateavatar");
const { upload } = require("../../middlewares/upload");
const { verifyEmail } = require("../../controllers/auth/verifyEmail");
const { resendVerifyEmail } = require("../../controllers/auth/resendVerifyEmail");

const router = express.Router();

router.post("/register", controllerWrapper(signUp));

router.get(
    "/verify/:verificationToken",
    controllerWrapper(verifyEmail)
);

router.post("/verify", controllerWrapper(resendVerifyEmail));

router.post("/login", controllerWrapper(signIn));

router.get(
    "/current",
    userAuthMiddleware,
    controllerWrapper(getCurrent)
);

router.post(
    "/logout",
    userAuthMiddleware,
    controllerWrapper(logout)
);

router.patch(
    "/avatars",
    userAuthMiddleware,
    upload.single("avatar"),
    controllerWrapper(updateAvatar)
);


module.exports = router;