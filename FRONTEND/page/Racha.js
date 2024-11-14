document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const streakCountElement = document.getElementById('streak-count');
    const totalDaysElement = document.getElementById('total-days');

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

        // Verificar si la racha continúa desde el día anterior
        if (lastCompletedDate) {
            const yesterday = new Date(today);
            yesterday.setDate(yesterday.getDate() - 1);
            if (lastCompletedDate >= yesterday.setHours(0, 0, 0, 0)) {
                currentStreak = Math.max(currentStreak, 1);
            }
        }

        // Calcular días totales desde el primer hábito completado
        if (firstCompletedDate) {
            const timeDiff = today - firstCompletedDate;
            totalDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;
        }

        streakCountElement.textContent = currentStreak;
        totalDaysElement.textContent = totalDays;
    }

    updateStreak();

    // Actualizar la racha cada minuto
    setInterval(updateStreak, 60000);

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });
});