document.addEventListener("DOMContentLoaded", function () {
  // Inicializar iconos de Lucide
  lucide.createIcons();

  // Inicializar Flatpickr para los selectores de fecha
  const dateFromPicker = flatpickr("#date-from", {
    locale: "es",
    dateFormat: "d/m/Y",
    onChange: filterHabits
  });

  const dateToPicker = flatpickr("#date-to", {
    locale: "es",
    dateFormat: "d/m/Y",
    onChange: filterHabits
  });

  // Función para obtener los hábitos asociados
  async function getHabitosAsociados() {
    try {
      const response = await fetch(
        "http://localhost:5035/api/Habitos/asociados"
      );
      const habitosAsociados = await response.json();
      return habitosAsociados;
    } catch (error) {
      console.error("Error al obtener los hábitos asociados:", error);
    }
  }

  // Función para obtener el historial de hábitos
  async function getHistorialHabitos() {
    try {
      const response = await fetch(
        "http://localhost:5035/api/HistorialHabitos"
      );
      const historial = await response.json();
      return historial;
    } catch (error) {
      console.error("Error al obtener el historial de hábitos:", error);
    }
  }

  // Función para obtener los hábitos con los detalles
  async function getHabitosConDetalles() {
    try {
      // Obtener los hábitos asociados y el historial
      const habitosAsociados = await getHabitosAsociados();
      const historial = await getHistorialHabitos();

      // Crear un conjunto de IDs de hábitos del historial
      const historialHabitosIds = new Set(
        historial.map((registro) => registro.habitosId)
      );

      // Mapear los hábitos asociados con su estado basado en el historial
      const habitosDetallesPromises = habitosAsociados.map(async (habit) => {
        const estado = historialHabitosIds.has(habit.id)
          ? "completado"
          : "creado";
        return {
          id: habit.id,
          nombre: habit.nombre,
          estado: estado,
          fecha: new Date(habit.fechaCreacion)
        };
      });

      // Esperar a que todas las promesas se resuelvan
      const habitos = await Promise.all(habitosDetallesPromises);
      console.log("Hábitos con detalles:", habitos);

      return habitos;
    } catch (error) {
      console.error("Error al obtener los hábitos con detalles:", error);
    }
  }

  // Función para filtrar hábitos
  async function filterHabits() {
    const dateFrom = dateFromPicker.selectedDates[0]; // Fecha de inicio del filtro
    const dateTo = dateToPicker.selectedDates[0]; // Fecha de fin del filtro
    const statusFilter = document.querySelector(".status-btn.active")
      ? document.querySelector(".status-btn.active").dataset.status
      : "all";

    // Obtener los hábitos con detalles
    const habitos = await getHabitosConDetalles();
    console.log("Hábitos antes del filtro:", habitos); // Para depuración

    const filteredHabits = habitos.filter((habito) => {
      const habitoDate = habito.fecha;
      const dateCondition =
        (!dateFrom || habitoDate >= dateFrom) && // Comparar fecha de inicio
        (!dateTo || habitoDate <= dateTo); // Comparar fecha de fin
      const statusCondition =
        statusFilter === "all" || habito.estado === statusFilter;
      return dateCondition && statusCondition;
    });

    console.log("Hábitos después del filtro:", filteredHabits); // Para depuración
    renderHabitsTimeline(filteredHabits);
  }

  // Función para renderizar la línea de tiempo de hábitos
  function renderHabitsTimeline(habits) {
    const timeline = document.getElementById("habits-timeline");
    timeline.innerHTML = "";

    if (habits.length === 0) {
      timeline.innerHTML =
        '<p class="text-center text-gray-500">No se encontraron hábitos para el período seleccionado.</p>';
      return;
    }

    habits.forEach((habito) => {
      const item = document.createElement("div");
      item.className = "timeline-item";
      item.innerHTML = `
                  <div class="timeline-card">
                      <div class="timeline-card-header">
                          <span class="habit-name">${habito.nombre}</span>
                          <span class="habit-status ${habito.estado}">
                              <i data-lucide="${
                                habito.estado === "completado"
                                  ? "check-circle"
                                  : "plus-circle"
                              }"></i>
                              ${
                                habito.estado.charAt(0).toUpperCase() +
                                habito.estado.slice(1)
                              }
                          </span>
                      </div>
                      <div class="habit-date">Creado: ${habito.fecha.toLocaleDateString(
                        "es-ES"
                      )}</div>
                  </div>
              `;
      timeline.appendChild(item);
    });

    lucide.createIcons();
  }

  function setQuickFilter(filter) {
    const today = new Date();
    let fromDate, toDate;

    switch (filter) {
      case "Hoy":
        fromDate = toDate = today;
        break;
      case "Esta semana":
        fromDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay()
        );
        toDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() - today.getDay() + 6
        );
        break;
      case "Este mes":
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1);
        toDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case "Este año":
        fromDate = new Date(today.getFullYear(), 0, 1);
        toDate = new Date(today.getFullYear(), 11, 31);
        break;
    }

    // Establecer las fechas en los selectores de Flatpickr
    dateFromPicker.setDate(fromDate);
    dateToPicker.setDate(toDate);

    // Llamar a la función de filtrado después de aplicar las fechas
    filterHabits();
  }

  // Manejar clic en los botones de filtro rápido
  document.querySelectorAll(".quick-filters .filter-btn").forEach((button) => {
    button.addEventListener("click", function () {
      // Activar el botón clickeado
      document
        .querySelectorAll(".quick-filters .filter-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      // Llamar a setQuickFilter con el valor correspondiente
      setQuickFilter(button.textContent);
    });
  });

  // Función para manejar el clic en los filtros rápidos de estado
  document.querySelectorAll(".status-btn").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".status-btn")
        .forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterHabits(); // Aplicar el filtro cuando se hace clic
    });
  });

  // Inicializar la vista con todos los hábitos
  filterHabits();
});
