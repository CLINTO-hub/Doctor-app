import express from 'express'
import { createNotification, getNotificationbyId, markNotificationsAsSeen } from '../Controllers/notificationController.js'
import { authenticate } from '../auth/verifyToken.js'


const router = express.Router()


router.post('/createNotification',authenticate,createNotification)
router.get('/getNotifications/:doctorId',authenticate,getNotificationbyId)
router.put('/markAsSeen/:doctorId',authenticate,markNotificationsAsSeen)




export default router