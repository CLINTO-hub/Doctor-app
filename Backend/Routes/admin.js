import express from "express";

import { AdminLogin, Adminregister } from "../Controllers/adminController.js";

const router = express.Router()

router.post('/Admin/Login',AdminLogin)
router.post('/Admin/register',Adminregister)

export default router


