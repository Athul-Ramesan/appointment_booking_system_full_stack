const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/index');

router.get('/available-slots', appointmentController.getAvailableSlots);
router.post('/book', appointmentController.bookAppointment);

module.exports = router;