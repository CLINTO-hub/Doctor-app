import Doctor from '../models/doctorSchema.js'

export const updateDoctor = async(req,res)=>{
    const id = req.params.id

try {

    const updateDoctor = await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true})
    console.log('body',req.body);

    res.status(200).json({sucess:true,message:'Sucessfully updated',data:updateDoctor})
    
} catch (error) {
    res.status(500).json({sucess:false,message:'Failed to update'})
    
}
}

export const deleteDoctor = async(req,res)=>{
    const id = req.params.id


try {

    const updateDoctor = await Doctor.findByIdandDelete(id)

    res.status(200).json({sucess:true,message:'Sucessfully deleted'})
    
} catch (error) {
    res.status(500).json({sucess:false,message:'Failed to delete'})
    
}
}
export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id

try {

    const doctor = await Doctor.findById(id);
    res.status(200).json({sucess:true,message:'Doctor Found',data:doctor})
    
} catch (error) {
    res.status(404).json({sucess:false,message:'No Doctor found'})
    
}
}
export const getAllDoctor = async (req, res) => {
    try {
      const { query } = req.query;
  
      if (query) {
        const doctors = await Doctor.find({
          isApproved: 'approved',
          name: { $regex: query, $options: 'i' } // Using regex to perform case-insensitive search
        });
  
        return res.status(200).json({ success: true, message: 'Doctors Found', data: doctors });
      }
  
      // If there's no query, return all approved doctors
      const doctors = await Doctor.find({ isApproved: 'approved' });
  
      res.status(200).json({ success: true, message: 'Doctors Found', data: doctors });
    } catch (error) {
      res.status(404).json({ success: false, message: 'Not found' });
    }
  };
  

export const getDoctorProfile = async (req,res)=>{
    const userId = req.userId

    try {

        const doctor = await Doctor.findById(userId)

        console.log('doctor',doctor);

        if(!doctor){
            return res.status(404).json({sucess:false,message:'Doctor not found'})
        }

        const {password,...rest} = doctor._doc
        //const appointments = await Booking.find({doctor:doctor._id})

        res.status(200).json({sucess:true,message:'Profile info is getting',data:{...rest}})
        
    } catch (error) {
        res.status(500).json({sucess:false,message:"Something went wrong,cannot get"})
    }
}