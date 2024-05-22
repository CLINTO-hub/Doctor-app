import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

  userId: { type: String },
  doctorId: { type: String },
  message: { type: String },
  is_Seen: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export default mongoose.model("Notification", notificationSchema);