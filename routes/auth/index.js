const express = require("express");
const { signUp } = require("../../controllers/auth/sign-up");
const { signIn } = require("../../controllers/auth/sing-in");
const { getCurrent } = require("../../controllers/auth/current");
const { logout } = require("../../controllers/auth/logout");
const { controllerWrapper } = require("../../services/controller-wrapper.service");
const { userAuthMiddleware } = require("../../middlewares/user-auth.middlewares");

const router = express.Router();

router.post("/register", controllerWrapper(signUp));

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


module.exports = router;