import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './database/connectDB.js';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';
import adminRoute from './Routes/admin.js';
import bookingRoute from './Routes/booking.js';
import chatRoute from './Routes/chat.js';
import notificationRoute from './Routes/notification.js';
import walletRoute from './Routes/wallet.js';
import { Server } from 'socket.io';

import path from "path"
const currentWorkingDir = path.resolve();
const parentDir = path.dirname(currentWorkingDir)
const productionParendDir = path.dirname(parentDir)
console.log('currentworkingdir:',currentWorkingDir)
console.log('parendDir:',parentDir)
console.log('productiondir:',productionParendDir)

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://www.medicare.clintogeorge.live"],
  },
});

const corsOptions = {
  origin: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

io.on("connection", (socket) => {
  console.log('A user connected');

  socket.on('join', (user) => {
    if (user && user._id) {
      socket.join(user._id);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

const enviornment = "production"

if (enviornment === 'production') { 
    app.use(express.static(path.join(parentDir ,'/Frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(parentDir,'Frontend', 'dist', 'index.html'))
    );
 
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....');
    });
  }

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/bookings', bookingRoute);
app.use('/api/v1/chat', chatRoute);
app.use('/api/v1/notification', notificationRoute);
app.use('/api/v1/wallet', walletRoute);




server.listen(port, () => {
  connectDB();
  console.log('Server is running on port', port);
});
