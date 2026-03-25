export const sendNotification = async (appointmentData) => {
  console.log(`Sending notification to patient ${appointmentData.patientId} and doctor ${appointmentData.doctorId}...`);
  return { sms: 'Sent', email: 'Sent' };
};