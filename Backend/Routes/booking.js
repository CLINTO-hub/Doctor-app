import  express  from "express";
import { authenticate, restrict } from "../auth/verifyToken.js";
import { cancelBooking, getCheckoutSession, getTotalBookings, getTotalCancelBookings, getTotalRevenue, getallBookingbyUserId, getallBookings } from "../Controllers/bookingController.js";
import { getAllBookings } from "../Controllers/adminController.js";

const router = express.Router()


router.post('/checkout-session/:doctorId',authenticate,getCheckoutSession)
router.get('/allBookings/:doctorId',getallBookings)
router.get('/analytics/total-bookings', authenticate, restrict(["admin"]), getTotalBookings);
router.get('/analytics/total-revenue',getTotalRevenue);
router.post('/cancelBooking/:bookingId',cancelBooking)
router.get('/getBookings/:userId',authenticate,getallBookingbyUserId)
router.get('/getTotalCancelBookings',authenticate,getTotalCancelBookings)

export default router;