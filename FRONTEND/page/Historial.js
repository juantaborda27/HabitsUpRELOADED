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

    // Función para obtener los hábitos de MisHabitos
    function getHabitosFromMisHabitos() {
        const habitos = JSON.parse(localStorage.getItem('habits')) || [];
        console.log('Hábitos cargados:', habitos); // Para depuración
        return habitos.map(habito => ({
            id: habito.id,
            nombre: habito.name,
            estado: habito.completed ? 'completado' : 'creado',
            fecha: new Date(habito.fechaCreacion)
        }));
    }

    // Función para filtrar hábitos
    function filterHabits() {
        const dateFrom = flatpickr("#date-from").selectedDates[0];
        const dateTo = flatpickr("#date-to").selectedDates[0];
        const statusFilter = document.querySelector('.status-btn.active').dataset.status;

        const habitos = getHabitosFromMisHabitos();
        console.log('Hábitos antes del filtro:', habitos); // Para depuración

        const filteredHabits = habitos.filter(habito => {
            const habitoDate = habito.fecha;
            const dateCondition = (!dateFrom || habitoDate >= dateFrom) && (!dateTo || habitoDate <= dateTo);
            const statusCondition = statusFilter === 'all' || habito.estado === statusFilter;
            return dateCondition && statusCondition;
        });

        console.log('Hábitos después del filtro:', filteredHabits); // Para depuración
        renderHabitsTimeline(filteredHabits);
    }

    // Función para renderizar la línea de tiempo de hábitos
    function renderHabitsTimeline(habits) {
        const timeline = document.getElementById('habits-timeline');
        timeline.innerHTML = '';

        if (habits.length === 0) {
            timeline.innerHTML = '<p class="text-center text-gray-500">No se encontraron hábitos para el período seleccionado.</p>';
            return;
        }

        habits.forEach(habito => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div class="timeline-card">
                    <div class="timeline-card-header">
                        <span class="habit-name">${habito.nombre}</span>
                        <span class="habit-status ${habito.estado}">
                            <i data-lucide="${habito.estado === 'completado' ? 'check-circle' : 'plus-circle'}"></i>
                            ${habito.estado.charAt(0).toUpperCase() + habito.estado.slice(1)}
                        </span>
                    </div>
                    <div class="habit-date">Creado: ${habito.fecha.toLocaleDateString('es-ES')}</div>
                </div>
            `;
            timeline.appendChild(item);
        });

        lucide.createIcons();
    }

    // Manejar clics en los botones de filtro rápido
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            setQuickFilter(this.textContent.trim());
        });
    });

    // Función para establecer filtros rápidos
    function setQuickFilter(filter) {
        const today = new Date();
        let fromDate, toDate;

        switch (filter) {
            case 'Hoy':
                fromDate = toDate = today;
                break;
            case 'Esta semana':
                fromDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                toDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 6);
                break;
            case 'Este mes':
                fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
                toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case 'Este año':
                fromDate = new Date(today.getFullYear(), 0, 1);
                toDate = new Date(today.getFullYear(), 11, 31);
                break;
        }

        flatpickr("#date-from").setDate(fromDate);
        flatpickr("#date-to").setDate(toDate);
        filterHabits();
    }

    // Manejar clics en los botones de filtro de estado
    document.querySelectorAll('.status-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.status-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterHabits();
        });
    });

    // Toggle sidebar en móviles
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    // Inicializar la vista con todos los hábitos
    filterHabits();
});