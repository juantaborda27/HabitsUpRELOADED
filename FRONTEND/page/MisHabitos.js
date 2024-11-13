document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const habitsContainer = document.getElementById('habits-container');
    const newHabitBtn = document.getElementById('new-habit-btn');
    const modal = document.getElementById('modal');
    const habitForm = document.getElementById('habit-form');
    const cancelHabitBtn = document.getElementById('cancel-habit');
    const confirmDialog = document.getElementById('confirm-dialog');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const confirmDeleteBtn = document.getElementById('confirm-delete');

    let habits = [];
    let editingHabitId = null;
    let deletingHabitId = null;

    function loadHabits() {
        habits = JSON.parse(localStorage.getItem('habits')) || [];
        renderHabits();
        scheduleReminders();
    }

    function saveHabits() {
        localStorage.setItem('habits', JSON.stringify(habits));
        scheduleReminders();
    }

    function renderHabits() {
        habitsContainer.innerHTML = '';
        habits.forEach(habit => {
            const habitCard = document.createElement('div');
            habitCard.className = 'habit-card';
            habitCard.innerHTML = `
                <h3>${habit.name}</h3>
                <p>${habit.description}</p>
                <div class="habit-details">
                    <span>Hora: ${habit.time}</span>
                    <span>Racha: ${habit.streak} días</span>
                </div>
                <div class="habit-progress">
                    <div class="habit-progress-bar" style="width: ${habit.progress}%"></div>
                </div>
                <div class="habit-actions">
                    <button class="primary-button complete-habit" data-id="${habit.id}">Completar</button>
                    <div>
                        <span class="habit-badge ${habit.completed ? 'habit-badge-earned' : ''}" title="${habit.completed ? 'Hábito completado' : 'Hábito en progreso'}">
                            ${habit.completed ? '🏆' : '🎯'}
                        </span>
                        <button class="icon-button edit-habit"><i data-lucide="edit"></i></button>
                        <button class="icon-button delete-habit"><i data-lucide="trash-2"></i></button>
                        ${habit.reminder ? '<button class="icon-button"><i data-lucide="bell"></i></button>' : ''}
                    </div>
                </div>
            `;
            habitsContainer.appendChild(habitCard);

            habitCard.querySelector('.edit-habit').addEventListener('click', () => editHabit(habit.id));
            habitCard.querySelector('.delete-habit').addEventListener('click', () => showDeleteConfirmation(habit.id));
            habitCard.querySelector('.complete-habit').addEventListener('click', () => completeHabit(habit.id));
        });
        lucide.createIcons();
    }

    function showModal(title) {
        document.getElementById('modal-title').textContent = title;
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
        habitForm.reset();
        editingHabitId = null;
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    newHabitBtn.addEventListener('click', () => {
        showModal('Crear Nuevo Hábito');
    });

    function editHabit(id) {
        const habit = habits.find(h => h.id === id);
        if (habit) {
            document.getElementById('habit-name').value = habit.name;
            document.getElementById('habit-description').value = habit.description;
            document.getElementById('habit-frequency').value = habit.frequency;
            document.getElementById('habit-time').value = habit.time;
            document.getElementById('habit-deadline').value = habit.deadline;
            document.getElementById('habit-reminder').checked = habit.reminder;
            editingHabitId = id;
            showModal('Editar Hábito');
        }
    }

    function showDeleteConfirmation(id) {
        deletingHabitId = id;
        confirmDialog.style.display = 'block';
    }

    function completeHabit(id) {
        const habitIndex = habits.findIndex(h => h.id === id);
        if (habitIndex !== -1) {
            habits[habitIndex].streak += 1;
            habits[habitIndex].progress = Math.min(100, habits[habitIndex].progress + 10);
            
            const deadline = new Date(habits[habitIndex].deadline);
            const today = new Date();
            if (today <= deadline) {
                habits[habitIndex].completed = true;
                showNotification(`¡Felicidades! Has completado el hábito "${habits[habitIndex].name}" antes de la fecha límite.`);
            }
            
            saveHabits();
            renderHabits();
            showNotification(`¡Hábito "${habits[habitIndex].name}" completado! Racha: ${habits[habitIndex].streak} días`);
        }
    }

    habitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const habitData = {
            name: document.getElementById('habit-name').value,
            description: document.getElementById('habit-description').value,
            frequency: document.getElementById('habit-frequency').value,
            time: document.getElementById('habit-time').value,
            deadline: document.getElementById('habit-deadline').value,
            reminder: document.getElementById('habit-reminder').checked,
            streak: 0,
            progress: 0,
            completed: false
        };

        if (editingHabitId) {
            habits = habits.map(h => h.id === editingHabitId ? {...h, ...habitData} : h);
        } else {
            habitData.id = Date.now();
            habits.push(habitData);
        }

        saveHabits();
        renderHabits();
        hideModal();
    });

    cancelHabitBtn.addEventListener('click', hideModal);

    confirmDeleteBtn.addEventListener('click', function() {
        habits = habits.filter(h => h.id !== deletingHabitId);
        saveHabits();
        renderHabits();
        confirmDialog.style.display = 'none';
    });

    cancelDeleteBtn.addEventListener('click', function() {
        confirmDialog.style.display = 'none';
    });

    function scheduleReminders() {
        habits.forEach(habit => {
            if (habit.reminder) {
                const [hours, minutes] = habit.time.split(':');
                const now = new Date();
                const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
                
                if (reminderTime > now) {
                    setTimeout(() => {
                        showNotification(`¡Recordatorio! Es hora de "${habit.name}"`);
                    }, reminderTime - now);
                }
            }
        });
    }

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    function completeHabit(id) {
        const habitIndex = habits.findIndex(h => h.id === id);
        if (habitIndex !== -1) {
            const habit = habits[habitIndex];
            const today = new Date().toDateString();
            
            if (habit.lastCompletedDate === today) {
                showNotification("Ya has completado este hábito hoy. ¡Vuelve mañana!");
                return;
            }
    
            habit.streak += 1;
            habit.progress = Math.min(100, habit.progress + 10);
            habit.lastCompletedDate = today;
            
            const deadline = new Date(habit.deadline);
            if (new Date() <= deadline) {
                habit.completed = true;
                showNotification(`¡Felicidades! Has completado el hábito "${habit.name}" antes de la fecha límite.`);
            }
            
            saveHabits();
            renderHabits();
            showNotification(`¡Hábito "${habit.name}" completado! Racha: ${habit.streak} días`);
        }
    }

    
    habitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const habitData = {
            name: document.getElementById('habit-name').value,
            description: document.getElementById('habit-description').value,
            frequency: document.getElementById('habit-frequency').value,
            time: document.getElementById('habit-time').value,
            deadline: document.getElementById('habit-deadline').value,
            reminder: document.getElementById('habit-reminder').checked,
            streak: 0,
            progress: 0,
            completed: false,
            lastCompletedDate: null
        };
    });

    // ... (código existente) ...

function scheduleReminders() {
    habits.forEach(habit => {
        if (habit.reminder) {
            const [hours, minutes] = habit.time.split(':');
            const now = new Date();
            const reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            
            if (reminderTime > now) {
                const timeUntilReminder = reminderTime - now;
                setTimeout(() => {
                    showReminderNotification(habit);
                }, timeUntilReminder);
            }
        }
    });
}

function showReminderNotification(habit) {
    const notification = document.createElement('div');
    notification.className = 'reminder-notification';
    notification.innerHTML = `
        <h3>¡Recordatorio de hábito!</h3>
        <p>Es hora de: ${habit.name}</p>
        <button class="close-notification">Cerrar</button>
    `;
    document.body.appendChild(notification);

    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.remove();
    });

    setTimeout(() => {
    notification.remove();
    }, 10000); // La notificación desaparecerá después de 10 segundos
                    }

// Modificar la función loadHabits para incluir scheduleReminders
            function loadHabits() {
                    habits = JSON.parse(localStorage.getItem('habits')) || [];
                    renderHabits();
                    scheduleReminders();
            }

            // Modificar la función saveHabits para incluir scheduleReminders
          function saveHabits() {
                localStorage.setItem('habits', JSON.stringify(habits));
                scheduleReminders();
            }

            // ... (resto del código existente) ...
            loadHabits();
});