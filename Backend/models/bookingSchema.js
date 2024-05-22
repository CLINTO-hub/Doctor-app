import mongoose from "mongoose";
import User from './userSchema.js'
import Doctor from "./doctorSchema.js";

const bookingSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },  
    doctorName: { type: String, required: true },
    userName: { type: String, required: true },
    doctorPhoto: { type: String },
    userPhoto:{type:String},
    specialization: { type: String },
    ticketPrice: { type: String, required: true },
    
    status: {
      type: String,
      enum: ["Scheduled", "approved", "cancelled"],
      default: "Scheduled",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    timeSlots: [
      {
        day: { type: String, required: true },
        startingTime: { type: String, required: true },
        endingTime: { type: String, required: true },
      }
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);