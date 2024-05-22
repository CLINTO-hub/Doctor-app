import User from '../models/userSchema.js'
import Doctor from '../models/doctorSchema.js'
import Booking from '../models/bookingSchema.js'
import Stripe from 'stripe'






export const getCheckoutSession = async(req,res)=>{
 
    try {

        let {timeSlot} = req.body

        console.log(req.body);

      console.log('time',timeSlot);


      if (!timeSlot || !timeSlot.day || !timeSlot.startingTime || !timeSlot.endingTime) {
        return res.status(400).json({ success: false, message: 'Invalid timeSlot data' });
      }
  

        const doctor = await Doctor.findById(req.params.doctorId)
        console.log('doctor',doctor);
        const user = await User.findById(req.userId)
        console.log('user',user.photo);

        
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

        

       

        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url:`${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email:user.email,
            client_reference_id: req.params.doctorId,
            line_items:[
                {
                    price_data:{
                        currency:'bdt',
                        unit_amount:doctor.ticketPrice*100,
                        product_data:{
                            name:doctor.name,
                            description:doctor.bio || 'No description available',
                            images:[doctor.photo]
                        }
                    },
                    quantity:1
                }
            ]
        })


       

        const booking = new Booking({
            doctor : doctor._id,
            doctorName: doctor.name,
            user:user._id,
            userPhoto:user.photo,
            doctorPhoto:doctor.photo,
            userName: user.name,
            specialization:doctor.specialization,
            ticketPrice:doctor.ticketPrice,
            session:session.id,
            timeSlots:[timeSlot]

        })

        console.log('booking',booking);

        await booking.save()

      

        const appointment = {
            userName: user.name,
            isPaid: true,
            ticketPrice: doctor.ticketPrice,
            createdAt: new Date()
          };


          console.log('hello');
          const slotIndex = doctor.timeSlots.findIndex(slot => 
            
            slot.day === timeSlot.day && 
            slot.startingTime === timeSlot.startingTime && 
            slot.endingTime === timeSlot.endingTime
          ); 
          if (slotIndex !== -1) {
           
            doctor.timeSlots[slotIndex].isBooked = true;
          }
      
          doctor.appointments.push(appointment);
          await doctor.save();

        res
           .status(200)
           .json({success:true, message:'Successfully paid',session})
        
    } catch (error) {

        console.log(error.message);
        res
          .status(500)
          .json({success:false,message:'Error creating checkout session'})
        
    }


}

export const getallBookings = async(req,res)=>{

    try {
        const {doctorId} = req.params
        const data = await Booking.find({doctor:doctorId})
        res.status(200).json({success:true,message:'Bookings found',data})
        
    } catch (error) {
       
       res .status(500)
          .json({success:false,message:'Error getallBookings'})
        

        
    }
  

}


export const getallBookingbyUserId = async(req,res)=>{

    try {
        const {userId} = req.params
        const data = await Booking.find({user:userId})
        res.status(200).json({success:true,message:'Bookings found',data})
        
    } catch (error) {
       
       res .status(500)
          .json({success:false,message:'Error getallBookings'})
        

        
    }
  

}


export const getTotalBookings = async (req, res) => {
  try {
      const totalBookings = await Booking.countDocuments();
      res.status(200).json({ success: true, message: 'Total number of patients retrieved', data: totalBookings });
  } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve total number of patients' });
  }
};


export const getTotalRevenue = async (req, res) => {
    try {
        const result = await Booking.aggregate([
            {
                $group: {
                    _id: null, 
                    totalRevenue: { $sum: { $toDouble: "$ticketPrice" } }
                }
            }
        ]);
  
        const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  
        console.log(totalRevenue);
  
        res.status(200).json({ success: true, message: 'Total revenue retrieved', data: totalRevenue });
    } catch (error) {
        console.error('Error retrieving total revenue:', error);
        res.status(500).json({ success: false, message: 'Failed to retrieve total revenue' });
    }
  };


  export const cancelBooking = async (req, res) => {
    try {
      const id = req.params.bookingId;
      console.log('id', id);
  
      const booking = await Booking.findById(id);
      console.log(booking);
  
      if (!booking) {
        return res.status(404).json({ success: false, message: 'Booking not found' });
      }
  
      if (booking.status === 'Scheduled') {
        
        const doctorId = booking.doctor;  
        const timeSlot = booking.timeSlots;
        console.log('time',timeSlot[0].day);  
  
        
        const doctor = await Doctor.findById(doctorId);
        if (doctor) {
          const slotIndex = doctor.timeSlots.findIndex(slot => 
            slot.day === timeSlot[0].day &&
            slot.startingTime === timeSlot[0].startingTime &&
            slot.endingTime === timeSlot[0].endingTime
          );
  
          if (slotIndex > -1) {
            doctor.timeSlots[slotIndex].isBooked = false;
            await doctor.save();
  
           
            const updatedBooking = await Booking.findByIdAndUpdate(id, { $set: { status: 'Canceled' } }, { new: true });
            return res.status(200).json({ success: true, message: 'Successfully updated', data: updatedBooking });
          } else {
            return res.status(404).json({ success: false, message: 'Time slot not found' });
          }
        } else {
          return res.status(404).json({ success: false, message: 'Doctor not found' });
        }
      } else {
        return res.status(400).json({ success: false, message: 'Booking is not in Scheduled status' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: 'Failed to cancel' });
    }
  };
  

  export const getTotalCancelBookings = async (req, res) => {
    try {
        const totalBookings = await Booking.countDocuments({ status: 'Canceled' });
        res.status(200).json({ success: true, message: 'Total number of canceled bookings retrieved', data: totalBookings });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve total number of canceled bookings', error: error.message });
    }
};
