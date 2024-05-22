import Notification from "../models/notificationSchema.js";
import { Server } from "socket.io";


const io = new Server();

export const socketMiddleware = (req, res, next) => {
    req.io = io;
    next();
  };



export const createNotification = async (req, res) => {
    try {
      const { userId, doctorId, message } = req.body;
  
      const notification = new Notification({
        userId,
        doctorId,
        message,
      });
  
      await notification.save();
  
      req.io.to(doctorId).emit('notification', { userId, doctorId, message });
  
      res.status(200).json({ success: true, message: 'Notification successfully created' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error, try again' });
    }
  };

export const getNotificationbyId = async (req,res)=>{
    try {

        const doctorId = req.params.doctorId
        console.log(doctorId);

        const result = await Notification.find({doctorId})
        res.status(200).json({result})

        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error:'Internalserver error at getNotification' });
        
    }
}

export const markNotificationsAsSeen = async (req, res) => {
    try {
      const doctorId = req.params.doctorId;
      await Notification.updateMany({ doctorId }, { is_Seen: true });
  
      res.status(200).json({ success: true, message: 'Notifications marked as seen' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal server error at markNotificationsAsSeen' });
    }
  };


