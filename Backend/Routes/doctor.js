import express from 'express'

import { updateDoctor,getAllDoctor,getSingleDoctor,deleteDoctor, getDoctorProfile } from '../Controllers/doctorController.js'
import { authenticate,restrict } from '../auth/verifyToken.js';


const router = express.Router()

router.get('/',getAllDoctor);
router.get('/:id',authenticate,getSingleDoctor);
router.put('/:id',authenticate,restrict(["doctor"]),updateDoctor)
router.delete('/:id',authenticate,restrict(["doctor"]),deleteDoctor)
router.get('/profile/me',authenticate,restrict(['doctor']),getDoctorProfile)


 export default router



