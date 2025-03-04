const Appointment = require('../models/index');

exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    const availableSlots = await Appointment.findAvailableSlots(date);
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.bookAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.createAppointment(req.body);
    res.status(201).json(appointment);
  } catch (error) {
    if (error.message === 'Slot already booked') {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
};