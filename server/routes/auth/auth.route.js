const { register, login, verifyEmail } = require("../../controllers/auth/auth.controller");
const authMiddleware = require("../../middlewares/authMiddleware");

const authRouter = require("express").Router()

authRouter.post("/register", register)
authRouter.post("/login", login)
// authRouter.delete('/logout', authMiddleware,logOut)
authRouter.post('/verify-email', verifyEmail)

module.exports = authRouter