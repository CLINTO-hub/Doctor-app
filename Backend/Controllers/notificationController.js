import Notification from "../models/notificationSchema.js";

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

export const getNotificationbyId = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const result = await Notification.find({ doctorId });
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error at getNotification' });
  }
};

export const markNotificationsAsSeen = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    await Notification.updateMany({ doctorId }, { is_Seen: true });

    res.status(200).json({ success: true, message: 'Notifications marked as seen' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error at markNotificationsAsSeen' });
  }
};
