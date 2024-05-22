import Admin from '../models/adminSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import User from '../models/userSchema.js';
import Doctor from '../models/doctorSchema.js'
import Booking from '../models/bookingSchema.js'



dotenv.config();

const generateToken = (user)=>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECERT_KEY,{
        expiresIn:'15d',
    })
}


export const Adminregister = async(req,res)=>{
    const {email,password,role} = req.body

   

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        let admin = new Admin({
            email,
            password:hashPassword,
            role

        })
        await admin.save()

        console.log('admin',admin);

        res.status(200).json({success:true, message:'Admin sucessfully created'})
    } catch (error) {
        res.status(500).json({success:false, message:'Admin Internal server error Try again'})

    }
}







export const AdminLogin = async(req,res)=>{

    const {email} = req.body
   

    try {

        let user = null

        const admin = await Admin.findOne({email})

        console.log('admin',admin);
        

        if(admin){
            user = admin
        }

        if(!user){
            return res.status(404).json({message:'Admin not found'})
        }

        const isPasswordMatch =  await bcrypt.compare(req.body.password,user.password)

        if(!isPasswordMatch){
            return res.status(400).json({status:false,message:"Invalid credentials"});
        }

        if(isPasswordMatch === true){

            const token = generateToken(user)

            const{role,...rest} = user._doc

            res
            .status(200)
            .json({status: true, message:"Successfully login",token,role,data:{...rest}});
        }

        }

        
    
    catch (error) {

        console.log(error);
        res
           .status(500)
        
           .json({status:false,message:'Failed to login'});
        
    }
}


export const Block = async(req,res)=>{

    try{
    const id = req.params.id  
    const user = await User.findById(id)
    console.log("user",user);
    
    if(user.is_Blocked === false){
        const updatedUser = await User.findByIdAndUpdate(id,{$set:{is_Blocked:true}})
        res.status(200).json({success:true,message:'Successfully updated',data:updatedUser})

    }
     if(user.is_Blocked === true){    

        const updatedUser = await User.findByIdAndUpdate(id,{$set:{is_Blocked:false}})
        res.status(200).json({success:true,message:'Successfully updated',data:updatedUser})
    }

}
catch(err){
    res 
       .status(500)
       .json({success:false, message:'Falied to update'})
}
}

export const getAllDoctors = async (req,res)=>{
    try {

        const doctors = await Doctor.find({})
        return  res.status(200).json({success:true, message:'Doctors Found',data:doctors})
        
    } catch (error) {
        res.status(404).json({ success: false, message: 'Not found' });  
    }
}

export const updateDoc = async (req, res) => {
    try {
        const id = req.params.id;
        const doctor = await Doctor.findById(id);

        if (doctor.isApproved === 'pending') {
            const updatedDoctor = await Doctor.findByIdAndUpdate(id, { $set: { isApproved: 'approved' } });
            if (updatedDoctor) {
                res.status(200).json({ success: true, message: 'Successfully updated' });
            } else {
                res.status(404).json({ success: false, message: 'Doctor not found' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Doctor is not pending approval' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to approve' });
    }
}


export const BlockDoctor = async(req,res)=>{

    try{
    const id = req.params.id  
    const user = await Doctor.findById(id)
    console.log("user",user);
    
    if(user.is_Blocked === false){
        const updatedUser = await Doctor.findByIdAndUpdate(id,{$set:{is_Blocked:true}})
        console.log('update',updatedUser);
        res.status(200).json({success:true,message:'Successfully updated',data:updatedUser})

    }
     if(user.is_Blocked === true){    

        const updatedUser = await Doctor.findByIdAndUpdate(id,{$set:{is_Blocked:false}})
        res.status(200).json({success:true,message:'Successfully updated',data:updatedUser})
    }

}
catch(err){
    res 
       .status(500)
       .json({success:false, message:'Falied to update'})
}
}

export const getAllBookings = async(req,res)=>{

    try {

        const booking = await Booking.find({})
        res.status(200).json({success:true,message:'User Found',data:booking})
        
    } catch (error) {
        res.status(404).json({success:false,message:'No Bookings found',})
        
    }
}