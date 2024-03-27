import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDB from './database/connectDB.js'
import dotenv from 'dotenv'
import authRoute from './Routes/auth.js'
import userRoute from './Routes/user.js'
import doctorRoute from './Routes/doctor.js'
import adminRoute from './Routes/admin.js'



dotenv.config()

const app = express()

const port = process.env.PORT || 8000

const corsOptions = {
    origin: true,
};



app.get("/", (req, res) => {
    res.send('API is Working');
});

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/users',userRoute)
app.use('/api/v1/doctors',doctorRoute)
app.use('/api/v1/admins',adminRoute)



app.listen(port, () => {
    connectDB()
    console.log('Server is running on port', port);
});
