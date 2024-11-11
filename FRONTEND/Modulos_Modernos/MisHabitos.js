document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // DOM elements
    const habitsContainer = document.getElementById('habits-container');
    const newHabitBtn = document.getElementById('new-habit-btn');
    const modal = document.getElementById('modal');
    const habitForm = document.getElementById('habit-form');
    const cancelHabitBtn = document.getElementById('cancel-habit');
    const confirmDialog = document.getElementById('confirm-dialog');
    const cancelDeleteBtn = document.getElementById('cancel-delete');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    let habits = [
        { id: 1, name: "Meditar", description: "Práctica diaria de meditación", time: "08:00", frequency: "daily", streak: 5, progress: 70, reminder: true },
        { id: 2, name: "Ejercicio", description: "30 minutos de actividad física", time: "07:00", frequency: "daily", streak: 3, progress: 40, reminder: true }
    ];

    let editingHabitId = null;
    let deletingHabitId = null;

    // Render habits
    function renderHabits() {
        habitsContainer.innerHTML = '';
        habits.forEach(habit => {
            const habitCard = document.createElement('div');
            habitCard.className = 'habit-card';
            habitCard.innerHTML = `
                <h3>${habit.name}</h3>
                <p>${habit.description}</p>
                <div>
                    <span>${habit.time}</span>
                    <span>Racha: ${habit.streak} días</span>
                </div>
                <div class="habit-progress">
                    <div class="habit-progress-bar" style="width: ${habit.progress}%"></div>
                </div>
                <div class="habit-actions">
                    <button class="primary-button complete-habit">Completar</button>
                    <div>
                        <button class="icon-button edit-habit"><i data-lucide="edit"></i></button>
                        <button class="icon-button delete-habit"><i data-lucide="trash-2"></i></button>
                        ${habit.reminder ? '<button class="icon-button"><i data-lucide="bell"></i></button>' : ''}
                    </div>
                </div>
            `;
            habitsContainer.appendChild(habitCard);

            // Add event listeners to the new buttons
            habitCard.querySelector('.edit-habit').addEventListener('click', () => editHabit(habit.id));
            habitCard.querySelector('.delete-habit').addEventListener('click', () => showDeleteConfirmation(habit.id));
        });
        lucide.createIcons(); // Refresh Lucide icons
    }

    // Show modal
    function showModal(title) {
        document.getElementById('modal-title').textContent = title;
        modal.style.display = 'block';
    }

    // Hide modal
    function hideModal() {
        modal.style.display = 'none';
        habitForm.reset();
        editingHabitId = null;
    }

    // Add new habit
    newHabitBtn.addEventListener('click', () => {
        showModal('Crear Nuevo Hábito');
    });

    // Edit habit
    function editHabit(id) {
        const habit = habits.find(h => h.id === id);
        if (habit) {
            document.getElementById('habit-name').value = habit.name;
            document.getElementById('habit-description').value = habit.description;
            document.getElementById('habit-frequency').value = habit.frequency;
            document.getElementById('habit-time').value = habit.time;
            document.getElementById('habit-reminder').checked = habit.reminder;
            editingHabitId = id;
            showModal('Editar Hábito');
        }
    }

    // Delete habit confirmation
    function showDeleteConfirmation(id) {
        deletingHabitId = id;
        confirmDialog.style.display = 'block';
    }

    // Handle form submission
    habitForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const habitData = {
            name: document.getElementById('habit-name').value,
            description: document.getElementById('habit-description').value,
            frequency: document.getElementById('habit-frequency').value,
            time: document.getElementById('habit-time').value,
            reminder: document.getElementById('habit-reminder').checked,
            streak: 0,
            progress: 0
        };

        if (editingHabitId) {
            // Update existing habit
            habits = habits.map(h => h.id === editingHabitId ? {...h, ...habitData} : h);
        } else {
            // Add new habit
            habitData.id = Date.now();
            habits.push(habitData);
        }

        renderHabits();
        hideModal();
    });

    // Cancel habit creation/edit
    cancelHabitBtn.addEventListener('click', hideModal);

    // Confirm delete
    confirmDeleteBtn.addEventListener('click', function() {
        habits = habits.filter(h => h.id !== deletingHabitId);
        renderHabits();
        confirmDialog.style.display = 'none';
    });

    // Cancel delete
    cancelDeleteBtn.addEventListener('click', function() {
        confirmDialog.style.display = 'none';
    });

    // Toggle sidebar on mobile
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    // Initial render
    renderHabits();
});