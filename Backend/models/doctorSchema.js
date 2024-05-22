import mongoose from "mongoose";


const AppointmentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  isPaid: { type: Boolean, default: true },
  ticketPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const DoctorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: Number },
  photo: { type: String },
  certificate: { type: String },
  ticketPrice: { type: Number },
  Numberofslots:{type:Number},
  gender: { type: String, enum: ["male", "female", "other"] },
  is_Blocked : { type: Boolean, default: false },
  role: {
    type: String,
  },

  // Fields for doctors only
  specialization: { type: String },
  qualifications: {
    type: Array,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 200 },
  about: { type: String },
  timeSlots:[
    {
      day: { type: String, required: true },
      startingTime: { type: String, required: true },
      endingTime: { type: String, required: true },
      isBooked: { type: Boolean, default: false },
    }
  ],
  reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
  averageRating: {
    type: Number,
    default: 0,
  },
  totalRating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [AppointmentSchema]
});

export default mongoose.model("Doctor", DoctorSchema);