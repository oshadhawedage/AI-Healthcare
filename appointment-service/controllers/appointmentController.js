// controllers/appointmentController.js
import Appointment from '../models/appointmentModel.js';
import { sendNotification } from '../services/notificationService.js';

// Mock call to Payment Service (simulated for now)
const mockPaymentCall = async (appointmentData) => {
  console.log(`Simulating payment call for patient ${appointmentData.patientId}`);
  return { status: 'PAID', amount: 100 }; // dummy response
};

// Book a new appointment
export const bookAppointment = async (req, res) => {
  try {
    const appointmentData = req.body;

    // Save appointment to DB
    const appointment = new Appointment(appointmentData);
    await appointment.save();

    // Simulate Payment Service call
    const paymentResult = await mockPaymentCall(appointmentData);

    // Send notifications
    await sendNotification(appointmentData);

    res.status(201).json({ 
      message: 'Appointment booked successfully', 
      appointment, 
      paymentResult 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get appointments for a patient
export const getAppointments = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointments = await Appointment.find({ patientId });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Cancel an appointment
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await Appointment.findByIdAndDelete(id);
    res.json({ message: 'Appointment cancelled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};