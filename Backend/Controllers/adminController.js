import Admin from '../models/adminSchema.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'



dotenv.config();

const generateToken = (user)=>{
    return jwt.sign({id:user._id},process.env.JWT_SECERT_KEY,{
        expiresIn:'15d',
    })
}


export const Adminregister = async(req,res)=>{
    const {email,password} = req.body

    try {
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)

        let admin = new Admin({
            email,
            password:hashPassword

        })
        await admin.save()
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

            res
            .status(200)
            .json({status: true, message:"Successfully login",token});
        }

        }

        
    
    catch (error) {

        console.log(error);
        res
           .status(500)
        
           .json({status:false,message:'Failed to login'});
        
    }
}
