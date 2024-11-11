document.addEventListener('DOMContentLoaded', function() {
    // Inicializar iconos de Lucide
    lucide.createIcons();

    // Inicializar Flatpickr para los selectores de fecha
    flatpickr("#date-from", {
        locale: "es",
        dateFormat: "d/m/Y",
        onChange: filterHabits
    });

    flatpickr("#date-to", {
        locale: "es",
        dateFormat: "d/m/Y",
        onChange: filterHabits
    });

    // Simulación de datos de hábitos
    const habitosSimulados = [
        { id: 1, nombre: "Hacer ejercicio", estado: "Completado", fecha: new Date(2023, 5, 1) },
        { id: 2, nombre: "Meditar", estado: "Creado", fecha: new Date(2023, 5, 2) },
        { id: 3, nombre: "Leer un libro", estado: "Completado", fecha: new Date(2023, 5, 3) },
        { id: 4, nombre: "Beber agua", estado: "Completado", fecha: new Date(2023, 5, 4) },
        { id: 5, nombre: "Escribir en el diario", estado: "Creado", fecha: new Date(2023, 5, 5) },
    ];

    // Función para filtrar hábitos
    function filterHabits() {
        const dateFrom = document.getElementById('date-from').value;
        const dateTo = document.getElementById('date-to').value;

        const filteredHabits = habitosSimulados.filter(habito => {
            if (!dateFrom && !dateTo) return true;
            const habitoDate = habito.fecha.toLocaleDateString('es-ES');
            if (dateFrom && !dateTo) return habitoDate >= dateFrom;
            if (!dateFrom && dateTo) return habitoDate <= dateTo;
            return habitoDate >= dateFrom && habitoDate <= dateTo;
        });

        renderHabitsTable(filteredHabits);
    }

    // Función para renderizar la tabla de hábitos
    function renderHabitsTable(habits) {
        const tableBody = document.querySelector('#habits-table tbody');
        tableBody.innerHTML = '';

        habits.forEach(habito => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${habito.nombre}</td>
                <td>${habito.estado}</td>
                <td>${habito.fecha.toLocaleDateString('es-ES')}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Renderizar la tabla inicial
    renderHabitsTable(habitosSimulados);

    // Toggle sidebar en móviles
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });
});