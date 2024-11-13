document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const suggestionHabits = [
        { name: "Beber agua", description: "Beber 8 vasos de agua al día", time: "08:00", frequency: "daily", reminder: true },
        { name: "Leer", description: "Leer 30 minutos al día", time: "21:00", frequency: "daily", reminder: true },
        { name: "Caminar", description: "Caminar 30 minutos al aire libre", time: "18:00", frequency: "daily", reminder: true },
        { name: "Practicar gratitud", description: "Escribir 3 cosas por las que estás agradecido", time: "22:00", frequency: "daily", reminder: true },
        { name: "Meditar", description: "Meditar durante 10 minutos", time: "07:00", frequency: "daily", reminder: true },
    ];

    function renderSuggestions() {
        const suggestionsGrid = document.getElementById('suggestions-grid');
        suggestionsGrid.innerHTML = '';

        suggestionHabits.forEach((habit, index) => {
            const card = document.createElement('div');
            card.className = 'suggestion-card';
            card.innerHTML = `
                <h3>${habit.name}</h3>
                <p>${habit.description}</p>
                <div class="suggestion-details">
                    <p><i data-lucide="clock"></i> Hora: ${habit.time}</p>
                    <p><i data-lucide="repeat"></i> Frecuencia: ${habit.frequency}</p>
                </div>
                <button class="add-suggestion-btn" data-index="${index}">
                    <i data-lucide="plus-circle"></i> Agregar Hábito
                </button>
            `;
            suggestionsGrid.appendChild(card);
        });

        lucide.createIcons();

        document.querySelectorAll('.add-suggestion-btn').forEach(button => {
            button.addEventListener('click', addSuggestedHabit);
        });
    }

    function addSuggestedHabit(event) {
        const index = event.currentTarget.getAttribute('data-index');
        const habit = suggestionHabits[index];
        
        // Agregar el hábito a localStorage
        addHabitToStorage(habit);
        
        showNotification(`Hábito "${habit.name}" añadido con éxito`);
        
        suggestionHabits.splice(index, 1);
        renderSuggestions();
    }

    function addHabitToStorage(habit) {
        let habits = JSON.parse(localStorage.getItem('habits')) || [];
        const newHabit = {
            id: Date.now(),
            name: habit.name,
            description: habit.description,
            time: habit.time,
            frequency: habit.frequency,
            reminder: habit.reminder,
            streak: 0,
            progress: 0
        };
        habits.push(newHabit);
        localStorage.setItem('habits', JSON.stringify(habits));
    }

    function showNotification(message) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.style.display = 'block';

        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    renderSuggestions();
});