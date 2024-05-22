import express from 'express'
import { updateUser,deleteUser,getAllUser,getSingleUser, getUserProfiler, getMyAppointments, getTotalPatients } from "../Controllers/userController.js";


import { authenticate,restrict } from '../auth/verifyToken.js';

const router = express.Router()

router.get('/:id',getSingleUser)
router.get('/',authenticate,restrict(["admin"]),getAllUser)
router.put('/:id',authenticate,restrict(["patient"]),updateUser)
router.delete('/:id',authenticate,restrict(["patient"]),deleteUser)
router.get('/profile/me',authenticate,restrict(["patient"]),getUserProfiler)
router.get('/appointments/my-appointments',authenticate,getMyAppointments)
router.get('/analytics/total-patients', authenticate, restrict(["admin"]), getTotalPatients);



export default router;