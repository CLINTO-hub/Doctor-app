import User from '../models/userSchema.js'
import Doctor from '../models/doctorSchema.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

dotenv.config();

const generateToken = (user)=>{
    return jwt.sign({id:user._id,role:user.role},process.env.JWT_SECERT_KEY,{
        expiresIn:'15d',
    })

}

export const register = async(req,res)=>{


    const {email,password,name,role,photo,gender} = req.body

    let user = null;

    try{

    if(role === 'patient'){
        user === await User.findOne({email})

    }
    else if(role==='doctor'){
        user = await Doctor.findOne({email})
    }

    if(user){
        return res.status(400).json({message:'User already exist'})

    }


    const salt =  await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)

    if(role==='patient'){
        user = new User({
            name,
            email,
            password:hashPassword,
            photo,
            gender,
            role

        })
    }
    if(role==='doctor'){
        user = new Doctor({
            name,
            email,
            password:hashPassword,
            photo,
            gender,
            role

        })
    }

    await user.save()

    res.status(200).json({success:true, message:'User sucessfully created'})
}

    catch (error) {

        res.status(500).json({success:false, message:'Internal server error Try again'})
        
    }
}



export const isBlocked = async (req,res,next)=>{
    const {email} = req.body

    try {
        let user = null;
        const patient = await User.findOne({email})
        const doctor = await Doctor.findOne({email})

        if(patient){
            user = patient
        }

        if(doctor){
            user = doctor
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(user.is_Blocked === true){
            return res.status(403).json({message:"User is blocked"})

        }
        next()
        
        
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ status: false, message: 'Failed to check' });
        
    }
}

export const login = async (req,res)=>{

    const {email} = req.body

   
    
    try {

        let user = null;

        const patient = await User.findOne({email})
        const doctor = await Doctor.findOne({email})

        if(patient){
            user= patient
        }
        if(doctor){
            user= doctor
        }
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
    
        const isPasswordMatch =  await bcrypt.compare(req.body.password,user.password)

      

        if(!isPasswordMatch){
            return res.status(400).json({status:false,message:"Invalid credentials"});
        }

        if(isPasswordMatch===true){

           

        

        const token = generateToken(user)
        

        

        const{password,role,appointements,...rest} = user._doc

        res
            .status(200)
            .json({status: true, message:"Successfully login",token,data:{...rest},role,});
        }


    } catch (error) {
        console.log(error);
        res
           .status(500)
        
           .json({status:false,message:'Failed to login'});
        
    }
}