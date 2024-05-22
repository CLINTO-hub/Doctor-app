 import Message from "../models/messageSchema.js";
 



export const sendMessage = async(req,res)=>{

    try{

    const {senderId,receiverId,message} = req.body

    console.log('body',req.body);
 
    const newMessage = new Message({

        senderId,
        receiverId,
        message,

    })

    await newMessage.save();
    res.status(201).json({success:true,message:'message send sucessfully'});
 }
 catch(error){
    console.error(error);
    res.status(500).json({message:"Internal Server Error"});
  }
 

}


export const getMessages = async (req, res) => {
  try {
    const { receiverId } = req.params;
    const messages = await Message.find({ receiverId }); 
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getUserMessages = async (req, res) => {
  try {
    const { senderId } = req.params;
    const messages = await Message.find({ senderId });
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const getDoctorMessages = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const messages = await Message.find({ receiverId: doctorId });
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


export const getDoctorPatientMessages = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;
    const messages = await Message.find({
      $or: [
        { senderId: doctorId, receiverId: patientId },
        { senderId: patientId, receiverId: doctorId }
      ]
    });
    res.json({ messages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};