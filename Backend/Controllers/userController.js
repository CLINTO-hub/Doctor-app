import User from "../models/userSchema.js"
import bookingSchema from "../models/bookingSchema.js"
import Booking from '../models/bookingSchema.js'
import Doctor from '../models/doctorSchema.js'


export const updateUser = async(req,res)=>{
    const id = req.params.id

    try {
        const updatedUser = await User.findByIdAndUpdate(id,{$set:req.body},{new:true})
        res.status(200).json({success:true,message:'Successfully updated',data:updatedUser})
    } catch (error) {
        res.status(500).json({success:false,message:'Failed to update the data'});
        
    }
}

export const deleteUser = async(req,res)=>{
    const id = req.params.id


try {

    const updateUser = await User.findByIdandDelete(id,)

    res.status(200).json({success:true,message:'Sucessfully deleted'})
    
} catch (error) {
    res.status(500).json({success:false,message:'Failed to delete'})
    
}
}
export const getSingleUser = async(req,res)=>{
    const id = req.params.id

    


try {

    const user = await User.findById(id);

    
    

    res.status(200).json({success:true,message:'User Found',data:user})
    
} catch (error) {
    res.status(404).json({success:false,message:'No user found'})
    
}
}
export const getAllUser = async(req,res)=>{
try {


    
    const users = await User.find({})

    res.status(200).json({success:true,message:'User Found',data:users})
    
} catch (error) {
    
    res.status(404).json({success:false,message:'Not found',})
    
}
}


export const getUserProfiler = async(req,res)=>{
    const userId = req.userId

    try {

        const user = await User.findById(userId)

        if(!user){
            return res.status(404).json({success:false,message:'User not found'})
        }

        const {password,...rest} = user._doc

        res.status(200).json({success:true,message:'Profile info is getting',data:{...rest}})
        
    } catch (error) {
        res.status(500).json({success:false,message:"Something went wrong,cannot get"})
    }

};

export const getMyAppointments = async(req,res)=>{

    try {

        const bookings = await Booking.find({user:req.userId})

        const doctorIds = bookings.map(el=>el.doctor.toString())

        const doctors = await Doctor.find({_id:{$in:doctorIds}}).select('-password')
        res.status(200).json({success:true, message:'Appointment are getting',data:doctors})

        console.log('hello');

        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success:false,message:"Something went wrong,cannot get"})
        
    }
    
}

export const getTotalPatients = async (req, res) => {
    try {
        const totalPatients = await User.countDocuments();
        res.status(200).json({ success: true, message: 'Total number of patients retrieved', data: totalPatients });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve total number of patients' });
    }
};
