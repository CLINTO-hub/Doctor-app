import express from 'express'

import { authenticate } from '../auth/verifyToken.js'
import { CurrentBalance, refundToWallet } from '../Controllers/walletController.js'


const router = express.Router()
router.post('/refund',authenticate,refundToWallet)
router.get('/walletBalance/:userId',authenticate,CurrentBalance)





export default router