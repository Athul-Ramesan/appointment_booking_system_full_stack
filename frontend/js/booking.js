(function() {
    class AppointmentBookingPlugin {
      constructor(apiBaseUrl = 'http://localhost:3000/api/appointments') {
        this.apiBaseUrl = apiBaseUrl;
        this.initializeDOM();
        this.attachEventListeners();
      }
  
      initializeDOM() {
        if (!document.getElementById('appointment-booking-container')) {
          const container = document.createElement('div');
          container.id = 'appointment-booking-container';
          container.innerHTML = `
            <div class="booking-plugin-container">
              <h2>Book an Appointment</h2>
              <form class="booking-plugin-form">
                <input type="text" name="name" placeholder="Full Name" required>
                <input type="tel" name="phone" placeholder="Phone Number" required>
                <input type="date" name="date" required>
                <div class="booking-plugin-slots" id="availableSlots"></div>
                <input type="hidden" name="timeSlot">
                <button type="submit">Book Appointment</button>
              </form>
              <div id="bookingMessage" class="booking-plugin-message"></div>
            </div>
          `;
          
          document.body.appendChild(container);
        }
      }
  
      attachEventListeners() {
        const form = document.querySelector('.booking-plugin-form');
        const dateInput = form.querySelector('input[name="date"]');
        const slotsContainer = document.getElementById('availableSlots');
        const messageContainer = document.getElementById('bookingMessage');
  
        dateInput.addEventListener('change', (e) => {
          const selectedDate = e.target.value;
          this.fetchAvailableSlots(selectedDate);
        });
  
        slotsContainer.addEventListener('click', (e) => {
            const clickedSlot = e.target.closest('.booking-plugin-slot');
            if (!clickedSlot) return; 
          
            document.querySelectorAll('.booking-plugin-slot').forEach(slot => {
              slot.classList.remove('selected');
            });
          
            clickedSlot.classList.add('selected');
          
            form.querySelector('input[name="timeSlot"]').value = clickedSlot.dataset.slot;
          });
          
  
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.bookAppointment(new FormData(form));
        });
      }
  
      async fetchAvailableSlots(date) {
        const slotsContainer = document.getElementById('availableSlots');
        slotsContainer.innerHTML = 'Loading slots...';
  
        try {
          const response = await fetch(`${this.apiBaseUrl}/available-slots?date=${date}`);
          
          if (!response.ok) {
            throw new Error('Failed to fetch slots');
          }
          
          const slots = await response.json();
  
          slotsContainer.innerHTML = '';
  
          console.log(slots,"slotsssssssss")
          if (slots.length === 0) {
            slotsContainer.innerHTML = 'No available slots for this date.';
          } else {
            slots.forEach(slot => {
              const slotElement = document.createElement('div');
              slotElement.classList.add('booking-plugin-slot');
              slotElement.dataset.slot = slot;
              slotElement.textContent = slot;
              slotsContainer.appendChild(slotElement);
            });
          }
        } catch (error) {
          console.error('Error fetching slots:', error);
          slotsContainer.innerHTML = 'Error fetching available slots. Please try again.';
        }
      }
  
      async bookAppointment(formData) {
        const messageContainer = document.getElementById('bookingMessage');
        messageContainer.innerHTML = '';
        messageContainer.className = 'booking-plugin-message';
  
        try {
          const response = await fetch(`${this.apiBaseUrl}/book`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Object.fromEntries(formData))
          });
  
          const result = await response.json();
  
          if (response.ok) {
            messageContainer.classList.add('success');
            messageContainer.innerHTML = 'Appointment booked successfully!';
            
            document.querySelector('.booking-plugin-form').reset();
            document.getElementById('availableSlots').innerHTML = '';
          } else {
            messageContainer.classList.add('error');
            messageContainer.innerHTML = result.error || 'Booking failed';
          }
        } catch (error) {
          console.error('Booking error:', error);
          messageContainer.classList.add('error');
          messageContainer.innerHTML = 'Network error. Please try again.';
        }
      }
    }
  
    window.AppointmentBookingPlugin = AppointmentBookingPlugin;
  })();