import express from "express";

import { AdminLogin, Adminregister, Block, BlockDoctor, getAllBookings, getAllDoctors, updateDoc } from "../Controllers/adminController.js";


const router = express.Router()

router.post('/Login',AdminLogin)
router.post('/register',Adminregister)
router.put('/blockUser/:id',Block)
router.get('/users',getAllDoctors)
router.put('/updateDoc/:id',updateDoc)
router.put('/blockDoctor/:id',BlockDoctor)
router.get('/bookings',getAllBookings)


export default router


