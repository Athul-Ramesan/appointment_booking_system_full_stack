# Appointment Booking System

## Project Overview
A full-stack appointment booking system with a reusable frontend plugin that allows users to book 30-minute appointments with ease.

## Features
- 30-minute appointment slots
- Lunch break (1 PM - 2 PM) automatically excluded
- Prevent double booking
- Responsive and easy-to-use interface
- Embeddable plugin for any website

## Project Structure
```
appointment-booking-system/
│
├── backend/
│   ├── config/       # Database configuration
│   ├── controllers/  # Request handlers
│   ├── models/       # Data models
│   ├── routes/       # API routes
│   ├── utils/        # Utility functions
│   └── app.js        # Main server file
│
└── frontend/
    ├── css/          # Styling
    └── js/           # Plugin JavaScript
```

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

## Local Setup and Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/appointment-booking-system.git
cd appointment-booking-system
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Start the server
npm start
# Server will run on http://localhost:3000
```

### 3. Environment Configuration
Create a `.env` file in the backend directory:
```
PORT=3000
```

## Plugin Embedding Instructions

### HTML Embedding Script
```html
<!-- In your webpage -->
<link rel="stylesheet" href="http://localhost:3000/css/booking.css">
<div id="booking-container"></div>

<script src="http://localhost:3000/js/booking.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', () => {
        new AppointmentBookingPlugin('http://localhost:3000/api/appointments');
    });
</script>
```

## API Endpoints

### Get Available Slots
- **URL:** `/api/appointments/available-slots`
- **Method:** GET
- **Query Param:** `date` (YYYY-MM-DD)
- **Response:** Array of available time slots

### Book Appointment
- **URL:** `/api/appointments/book`
- **Method:** POST
- **Payload:**
```json
{
    "name": "John Doe",
    "phone": "1234567890",
    "date": "2024-03-15",
    "timeSlot": "10:00"
}
```

## Troubleshooting
- Ensure backend server is running
- Check browser console for any errors
- Verify date format is YYYY-MM-DD
- Confirm API endpoint URL is correct

## Security Considerations
- Implement proper input validation
- Add authentication for booking API
- Use HTTPS in production
- Implement rate limiting

## Potential Improvements
- Add timezone support
- Implement user authentication
- Create admin dashboard for managing appointments
- Add email/SMS notifications

## License
MIT License

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
```