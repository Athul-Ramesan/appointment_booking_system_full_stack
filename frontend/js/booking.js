(function() {
    class AppointmentBookingPlugin {
      constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl || 'http://localhost:3000/api/appointments';
        this.initializeDOM();
        this.attachEventListeners();
      }
  
      initializeDOM() {
        this.container = document.createElement('div');
        this.container.className = 'booking-plugin-container';
        this.container.innerHTML = `
          <form class="booking-plugin-form">
            <input type="text" name="name" placeholder="Full Name" required>
            <input type="tel" name="phone" placeholder="Phone Number" required>
            <input type="date" name="date" required>
            <div class="booking-plugin-slots" id="availableSlots"></div>
            <input type="hidden" name="timeSlot">
            <button type="submit">Book Appointment</button>
          </form>
          <div id="bookingMessage" class="booking-plugin-message"></div>
        `;
        document.body.appendChild(this.container);
      }
  
      attachEventListeners() {
        const form = this.container.querySelector('form');
        const dateInput = form.querySelector('input[name="date"]');
        const slotsContainer = this.container.querySelector('#availableSlots');
        const messageContainer = this.container.querySelector('#bookingMessage');
  
        dateInput.addEventListener('change', () => this.fetchAvailableSlots(dateInput.value));
  
        slotsContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('booking-plugin-slot')) {
            const slots = slotsContainer.querySelectorAll('.booking-plugin-slot');
            slots.forEach(slot => slot.classList.remove('selected'));
            e.target.classList.add('selected');
            form.querySelector('input[name="timeSlot"]').value = e.target.dataset.slot;
          }
        });
  
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          this.bookAppointment(new FormData(form));
        });
      }
  
      async fetchAvailableSlots(date) {
        const slotsContainer = this.container.querySelector('#availableSlots');
        slotsContainer.innerHTML = 'Loading slots...';
  
        try {
          const response = await fetch(`${this.apiBaseUrl}/available-slots?date=${date}`);
          const slots = await response.json();
  
          slotsContainer.innerHTML = slots.map(slot => 
            `<div class="booking-plugin-slot" data-slot="${slot}">${slot}</div>`
          ).join('');
        } catch (error) {
          slotsContainer.innerHTML = 'Error fetching slots';
        }
      }
  
      async bookAppointment(formData) {
        const messageContainer = this.container.querySelector('#bookingMessage');
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
            this.container.querySelector('form').reset();
          } else {
            messageContainer.classList.add('error');
            messageContainer.innerHTML = result.error || 'Booking failed';
          }
        } catch (error) {
          messageContainer.classList.add('error');
          messageContainer.innerHTML = 'Network error. Please try again.';
        }
      }
    }
  
    window.AppointmentBookingPlugin = AppointmentBookingPlugin;
  })();