document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();

  async function fetchHabitsData() {
    try {
      const [
        habitsResponse,
        completedTodayResponse,
        currentStreakResponse,
        topStreakResponse
      ] = await Promise.all([
        fetch("http://localhost:5035/api/Habitos/asociados"),
        fetch("http://localhost:5035/api/HistorialHabitos/Hoy"),
        fetch("http://localhost:5035/api/HistorialHabitos/RachaHoy"),
        fetch("http://localhost:5035/api/HistorialHabitos/TopHabitosPorRacha")
      ]);

      const habits = await habitsResponse.json();
      const completedToday = await completedTodayResponse.json();
      const currentStreak = await currentStreakResponse.json();
      const topStreak = await topStreakResponse.json();

      const habitsData = {
        totalHabits: habits.length,
        completedToday: completedToday.length,
        currentStreak: currentStreak,
        focusTime: calculateFocusTime(),
        habitsDistribution: calculateHabitsDistribution(habits, topStreak)
      };
      updateUI(habitsData);

      const habitsDistribution = await calculateHabitsDistribution(
        habits,
        topStreak
      );

      renderHabitsDistributionChart(habitsDistribution);

      if (habits && habits.length > 0) {
        const weeklyProgressData = await calculateWeeklyProgress(habits);

        loadWeeklyProgressGraph(weeklyProgressData);
      } else {
        console.log("No se encontraron hábitos.");
      }
    } catch (error) {
      console.error("Error al cargar los datos de las APIs:", error);
    }
  }

  function updateUI(habitsData) {
    document.getElementById("total-habits").textContent =
      habitsData.totalHabits;
    document.getElementById("completed-habits").textContent =
      habitsData.completedToday;
    document.getElementById("current-streak").textContent =
      habitsData.currentStreak;
  }

  function calculateFocusTime() {
    const totalFocusTime =
      parseInt(localStorage.getItem("totalFocusTime")) || 0;
    const hours = Math.floor(totalFocusTime / 3600);
    const minutes = Math.floor((totalFocusTime % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }

  async function calculateWeeklyProgress(habits) {
    const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const progress = new Array(7).fill(0);
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    const completedHabitsByDay = {};

    for (let habit of habits) {
      try {
        const response = await fetch(
          `http://localhost:5035/api/HistorialHabitos/${habit.id}`
        );
        const data = await response.json();

        if (data && data.fechaCompletado) {
          const habitDate = new Date(data.fechaCompletado);
          if (habitDate >= oneWeekAgo && habitDate <= today) {
            const dateString = habitDate.toDateString();
            if (!completedHabitsByDay[dateString]) {
              completedHabitsByDay[dateString] = new Set();
            }
            completedHabitsByDay[dateString].add(habit.id);
          }
        }
      } catch (error) {
        console.error(
          "Error al obtener la fecha de completado para el hábito",
          habit.id,
          error
        );
      }
    }

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateString = date.toDateString();
      const completedHabits = completedHabitsByDay[dateString] || new Set();
      progress[6 - i] = completedHabits.size;
    }

    return weekDays.map((day, index) => ({
      x: day,
      y: progress[index]
    }));
  }

  function loadWeeklyProgressGraph(weeklyProgressData) {
    const ctx = document.getElementById("myChart").getContext("2d");

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: weeklyProgressData.map((item) => item.x),
        datasets: [
          {
            label: "Hábitos Completados",
            data: weeklyProgressData.map((item) => item.y),
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  async function calculateHabitsDistribution(habits, topStreak) {
    const topHabits = topStreak.slice(0, 5);

    const habitsWithNames = await Promise.all(
      topHabits.map(async (habit) => {
        try {
          const response = await fetch(
            `http://localhost:5035/api/Habitos/${habit.habitosId}`
          );
          const habitData = await response.json();

          return {
            x: habitData.nombre,
            y: habit.racha || 0
          };
        } catch (error) {
          console.error(
            `Error al obtener el hábito con ID ${habit.habitosId}:`,
            error
          );
          return {
            x: `Hábito ${habit.habitosId}`,
            y: habit.racha || 0
          };
        }
      })
    );

    return habitsWithNames;
  }

  function renderHabitsDistributionChart(habitsDistribution) {
    const options = {
      series: habitsDistribution.map((item) => item.y),
      chart: {
        width: "100%",
        height: 500,
        type: "pie"
      },
      labels: habitsDistribution.map((item) => item.x),
      title: {
        text: "Top Hábitos por Días de Racha",
        align: "center"
      }
    };

    const chart = new ApexCharts(
      document.querySelector("#habits-distribution-chart"),
      options
    );

    chart.render();
  }

  fetchHabitsData();
});
