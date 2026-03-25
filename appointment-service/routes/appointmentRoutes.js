import express from 'express';
import { bookAppointment, getAppointments, cancelAppointment } from '../controllers/appointmentController.js';

const router = express.Router();

router.post('/', bookAppointment);
router.get('/:patientId', getAppointments);
router.delete('/:id', cancelAppointment);

export default router;