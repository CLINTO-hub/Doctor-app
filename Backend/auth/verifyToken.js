import jwt from 'jsonwebtoken'
import Doctor from '../models/doctorSchema.js'
import User from '../models/userSchema.js'
import  Admin  from '../models/adminSchema.js'

export const authenticate = async(req,res,next)=>{
    const authToken = req.headers.authorization

    

    if(!authToken || !authToken.startsWith("Bearer")){
        return res
        .status(401)
        .json({success:false,message:"No token, authorization denied"});
    }

    try {
       const token = authToken.split(" ")[1];
       
      

      

      
       console.log('hiii');
       console.log('envvv',process.env.JWT_SECERT_KEY);

       console.log('token',token);

       

       const decoded = jwt.verify(token,process.env.JWT_SECERT_KEY)

       console.log('ded',decoded);
       
       
       

       req.userId = decoded.id
       req.role = decoded.role

       console.log(req.userId,"userIddd");
       console.log(req.role,"role");
        next()
    } catch (error) {

        console.log(error.message);

        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message:'Token is expired'});
        }

        return res.status(401).json({sucess:false,message:"Invalid session"})
        
    }
}

export const restrict =(roles)=> async(req,res,next)=>{
    const userId = req.userId

    let user;

    const patient = await User.findById(userId)
    const doctor = await Doctor.findById(userId)
    

    if(patient){
        user = patient
    }
    if(doctor){
        user = doctor
    }
    

    if(!roles.includes(user.role)){
        return res
                  .status(401)
                  .json({sucess:false,message:"You are not authorized"})
    }
    next()
}
