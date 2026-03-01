const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");
const authRouter = express.Router();

authRouter.post('/register', authController.userRegisterController)
authRouter.post('/login', authController.userLoginController)
authRouter.get('/get-me',authMiddleware.authUser, authController.userGetMeController)
authRouter.post('/logout', authController.userLogOutController)

module.exports = authRouter;