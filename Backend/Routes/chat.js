import  express  from "express";

import { getDoctorMessages, getDoctorPatientMessages, getMessages, getUserMessages, sendMessage } from "../Controllers/chatController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { getTotalCancelBookings } from "../Controllers/bookingController.js";


const router = express.Router()


router.post('/sendMessage',sendMessage)
router.get('/messages/:receiverId',getMessages)
router.get('/usermessages/:senderId',getUserMessages)
router.get('/messages/:doctorId', authenticate, restrict(["doctor"]), getDoctorMessages);
router.get('/messages/:doctorId/:patientId', getDoctorPatientMessages);


export default router;