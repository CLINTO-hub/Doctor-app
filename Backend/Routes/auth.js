import express  from 'express'
import { register,login,isBlocked } from '../Controllers/authController.js'

const router = express.Router()

router.post('/register',register)
router.post('/login',isBlocked,login)

export default router
