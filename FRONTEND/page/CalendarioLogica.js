document.addEventListener('DOMContentLoaded', function(){
    // Initialize Lucide icons
    lucide.createIcons();


    const calendar = document.getElementById('calendar');
        const modal = document.getElementById('eventModal');
        const closeBtn = document.getElementsByClassName('close')[0];
        const eventForm = document.getElementById('eventForm');
        const eventDateInput = document.getElementById('eventDate');
        const eventTitleInput = document.getElementById('eventTitle');
        const eventIdInput = document.getElementById('eventId');
        const saveButton = document.getElementById('saveButton');
        const deleteButton = document.getElementById('deleteButton');
        const prevMonthBtn = document.getElementById('prevMonth');
        const nextMonthBtn = document.getElementById('nextMonth');
        const currentMonthElement = document.getElementById('currentMonth');

        let currentDate = new Date();
        let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

        function createCalendar() {
            calendar.innerHTML = '';
            const weekdays = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
            weekdays.forEach(day => {
                const dayElement = document.createElement('div');
                dayElement.textContent = day;
                dayElement.className = 'weekday';
                calendar.appendChild(dayElement);
            });

            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDay = firstDay.getDay();

            currentMonthElement.textContent = `${firstDay.toLocaleString('default', { month: 'long' })} ${year}`;

            for (let i = 0; i < startingDay; i++) {
                const dayElement = document.createElement('div');
                dayElement.className = 'day other-month';
                calendar.appendChild(dayElement);
            }

            for (let i = 1; i <= daysInMonth; i++) {
                const dayElement = document.createElement('div');
                dayElement.textContent = i;
                dayElement.className = 'day';
                const date = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                dayElement.setAttribute('data-date', date);
                dayElement.addEventListener('click', openModal);
                calendar.appendChild(dayElement);
            }

            const remainingDays = 7 - ((startingDay + daysInMonth) % 7);
            if (remainingDays < 7) {
                for (let i = 0; i < remainingDays; i++) {
                    const dayElement = document.createElement('div');
                    dayElement.className = 'day other-month';
                    calendar.appendChild(dayElement);
                }
            }

            updateCalendar();
        }

        function updateCalendar() {
            document.querySelectorAll('.day:not(.other-month)').forEach(day => {
                const date = day.getAttribute('data-date');
                if (events[date]) {
                    day.classList.add('has-event');
                    day.setAttribute('aria-label', `${day.textContent}, Tiene evento: ${events[date].title}`);
                } else {
                    day.classList.remove('has-event');
                    day.removeAttribute('aria-label');
                }
            });
        }

        function openModal(e) {
            const date = e.target.getAttribute('data-date');
            eventDateInput.value = date;
            if (events[date]) {
                const event = events[date];
                eventTitleInput.value = event.title;
                eventIdInput.value = event.id;
                document.getElementById('eventDescription').value = event.description || '';
                document.getElementById('eventTime').value = event.time || '';
                document.getElementById('eventFrequency').value = event.frequency || 'once';
                document.getElementById('eventReminder').checked = event.reminder || false;
                deleteButton.style.display = 'block';
            } else {
                eventTitleInput.value = '';
                eventIdInput.value = '';
                document.getElementById('eventDescription').value = '';
                document.getElementById('eventTime').value = '';
                document.getElementById('eventFrequency').value = 'once';
                document.getElementById('eventReminder').checked = false;
                deleteButton.style.display = 'none';
            }
            modal.style.display = 'block';
        }

        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        eventForm.onsubmit = function(e) {
            e.preventDefault();
            const date = eventDateInput.value;
            const title = eventTitleInput.value;
            const id = eventIdInput.value || Date.now().toString();
            const description = document.getElementById('eventDescription').value;
            const time = document.getElementById('eventTime').value;
            const frequency = document.getElementById('eventFrequency').value;
            const reminder = document.getElementById('eventReminder').checked;
            events[date] = { id, title, description, time, frequency, reminder };
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            updateCalendar();
            modal.style.display = 'none';
        }

        deleteButton.onclick = function() {
            const date = eventDateInput.value;
            delete events[date];
            localStorage.setItem('calendarEvents', JSON.stringify(events));
            updateCalendar();
            modal.style.display = 'none';
        }

        prevMonthBtn.onclick = function() {
            currentDate.setMonth(currentDate.getMonth() - 1);
            createCalendar();
        }

        nextMonthBtn.onclick = function() {
            currentDate.setMonth(currentDate.getMonth() + 1);
            createCalendar();
        }

        createCalendar();


    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });
});