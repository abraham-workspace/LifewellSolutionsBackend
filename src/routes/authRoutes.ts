import { loginUser, logoutUser, registerUser } from "@app/controllers/authController"
import express from "express"


const auth = express.Router()

auth.post('/register', registerUser)
auth.post('/login', loginUser)
auth.post('/logout', logoutUser)

export default auth