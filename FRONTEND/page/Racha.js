document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const streakCountElement = document.getElementById('streak-count');
    const totalDaysElement = document.getElementById('total-days');
    let lastKnownStreak = 0;

    const mensajesMotivacionales = [
        "El esfuerzo que pones hoy será tu recompensa mañana.",
        "Cada día es una nueva oportunidad para mejorar. ¡No la desperdicies!",
        "Eres más fuerte de lo que piensas. ¡Sigue adelante!",
        "La disciplina te llevará más lejos que la motivación. ¡Mantén el ritmo!",
        "Cada paso que das es una victoria en sí misma. ¡No te detengas!",
        "El éxito no es instantáneo, se construye paso a paso. ¡Vas por buen camino!",
        "Tus logros son el resultado de tu dedicación diaria.",
        "No importa cuán lento avances, siempre estarás adelante de los que no lo intentan.",
        "El esfuerzo de hoy es el éxito de mañana. ¡Sigue avanzando!",
        "Tus hábitos de hoy son el reflejo de tu futuro. ¡Construye bien!",
        "Cada hábito cumplido es una promesa cumplida contigo mismo.",
        "No te rindas, el progreso se construye día a día.",
        "La constancia es el camino hacia tus sueños. ¡Tú puedes lograrlo!",
        "No tienes que ser perfecto, solo constante. ¡Sigue intentándolo!",
        "Las pequeñas mejoras diarias se convierten en grandes logros.",
        "Tu persistencia es lo que te distingue. ¡Sigue luchando!",
        "El éxito no es suerte, es trabajo duro y consistencia.",
        "Cada día que mantienes tus hábitos, estás más cerca de tu mejor versión.",
        "Los grandes cambios vienen de pequeños hábitos diarios.",
        "Eres capaz de hacer cosas increíbles. ¡Confía en ti y sigue adelante!"
    ];
    

    function updateStreak() {
        const habits = JSON.parse(localStorage.getItem('habits')) || [];
        const today = new Date().setHours(0, 0, 0, 0);
        let currentStreak = 0;
        let totalDays = 0;
        let lastCompletedDate = null;
        let firstCompletedDate = null;

        habits.forEach(habit => {
            if (habit.lastCompletedDate) {
                const completedDate = new Date(habit.lastCompletedDate).setHours(0, 0, 0, 0);
                if (completedDate === today) {
                    currentStreak++;
                }
                if (!lastCompletedDate || completedDate > lastCompletedDate) {
                    lastCompletedDate = completedDate;
                }
                if (!firstCompletedDate || completedDate < firstCompletedDate) {
                    firstCompletedDate = completedDate;
                }
            }
        });

        if (lastCompletedDate) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastCompletedDate >= yesterday.setHours(0, 0, 0, 0)) {
                currentStreak = Math.max(currentStreak, 1);
            }
        }

        if (firstCompletedDate) {
            const timeDiff = today - firstCompletedDate;
            totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        }

        streakCountElement.textContent = currentStreak;
        totalDaysElement.textContent = totalDays;

        if (currentStreak > lastKnownStreak) {
            showCongratulations(currentStreak);
        }
        lastKnownStreak = currentStreak;
    }

    function showCongratulations(streak) {
        const modal = document.createElement('div');
        modal.className = 'congratulations-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>¡Felicidades!</h2>
                <p>Has alcanzado una racha de ${streak} días.</p>
                <p class="motivation">${getRandomMotivationalMessage()}</p>
                <button id="closeModal">Cerrar</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.style.animation = 'fadeIn 0.5s';

        document.getElementById('closeModal').addEventListener('click', function() {
            modal.style.animation = 'fadeOut 0.5s';
            setTimeout(() => modal.remove(), 500);
        });
    }

    function getRandomMotivationalMessage() {
        return mensajesMotivacionales[Math.floor(Math.random() * mensajesMotivacionales.length)];
    }

    function showDailyMotivation() {
        const motivationElement = document.createElement('div');
        motivationElement.className = 'daily-motivation';
        motivationElement.innerHTML = `
            <div class="motivation-content">
                <h2>Mensaje del día</h2>
                <p>${getRandomMotivationalMessage()}</p>
            </div>
        `;
        document.querySelector('.container').prepend(motivationElement);

        motivationElement.style.animation = 'slideIn 0.5s';
    }

    updateStreak();
    showDailyMotivation();

    setInterval(updateStreak, 60000);

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });
});