document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const suggestionHabits = [
        { name: "Beber agua", description: "Beber 8 vasos de agua al día", time: "08:00", frequency: "daily", reminder: true , categori: "Salud"},
        { name: "Leer", description: "Leer 30 minutos al día", time: "21:00", frequency: "daily", reminder: true, categori: "Salud"},
        { name: "Caminar", description: "Caminar 30 minutos al aire libre", time: "18:00", frequency: "daily", reminder: true , categori: "Salud" },
        { name: "Practicar gratitud", description: "Escribir 3 cosas por las que estás agradecido", time: "22:00", frequency: "daily", reminder: true , categori: "Salud"},
        { name: "Meditar", description: "Meditar durante 10 minutos", time: "07:00", frequency: "daily", reminder: true , categori: "Salud"},
        { name: "Ejercicio", description: "Hacer 30 minutos de ejercicio", time: "06:30", frequency: "daily", reminder: true , categori: "Salud" },
        { name: "Leer", description: "Leer 20 páginas de un libro", time: "20:00", frequency: "daily", reminder: true, categori: "Salud"},
        { name: "Beber Agua", description: "Beber 8 vasos de agua", time: "08:00", frequency: "daily", reminder: true, categori: "Salud" },
        { name: "Planificar el Día", description: "Revisar la lista de tareas del día", time: "08:30", frequency: "daily", reminder: true , categori: "Salud"},
        { name: "Escribir en Diario", description: "Escribir reflexiones diarias", time: "21:00", frequency: "daily", reminder: true , categori: "Salud"},
        { name: "Estudiar Idioma", description: "Practicar inglés durante 15 minutos", time: "19:00", frequency: "daily", reminder: true , categori: "Salud"},
        { name: "Agradecer", description: "Escribir 3 cosas por las que estoy agradecido", time: "22:00", frequency: "daily", reminder: true , categori: "Salud" },
        { name: "Aprender", description: "Ver un video educativo", time: "12:00", frequency: "daily", reminder: true , categori: "Salud" },
        { name: "Dormir Bien", description: "Acostarse temprano para dormir 8 horas", time: "22:30", frequency: "daily", reminder: true, categori: "Salud" },
        { name: "Organizar Espacio", description: "Ordenar el escritorio al final del día", time: "18:00", frequency: "daily", reminder: true, categori: "Salud"}
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
                    <p><i data-lucide="chart-bar-stacked"></i> Categoria: ${habit.categori}</p>
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