import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import appointmentRoutes from './routes/appointmentRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5003;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Appointment Service running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:',err));