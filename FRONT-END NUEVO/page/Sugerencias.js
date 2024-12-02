document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();

  let suggestionHabits = [];
  let currentFilter = "Todas";

  async function loadHabitsFromAPI() {
    try {
      const response = await fetch("http://localhost:5035/api/Habitos");

      if (!response.ok) {
        throw new Error("Error al cargar los datos de la API");
      }

      const data = await response.json();
      console.log(data);
      if (Array.isArray(data)) {
        suggestionHabits = data.map((habit) => ({
          ...habit,
          hora: new Date("1970-01-01T" + habit.hora).toLocaleTimeString(),
          categoria: habit.productividad
            ? habit.productividad.nombre
            : "No especificada",
          fechaCreacion: new Date(habit.fechaCreacion).toLocaleDateString(
            "es-ES"
          )
        }));
        renderSuggestions(currentFilter);
      } else {
        console.error("Los datos no tienen el formato esperado:", data);
        showNotification("Los datos recibidos no son correctos.");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Hubo un problema al cargar los hábitos.");
    }
  }

  function renderSuggestions(filter = "Todas") {
    const suggestionsGrid = document.getElementById("suggestions-grid");
    suggestionsGrid.innerHTML = "";

    const filteredHabits =
      filter === "Todas"
        ? suggestionHabits
        : suggestionHabits.filter((habit) => habit.categoria === filter);

    filteredHabits.forEach((habit, index) => {
      const card = document.createElement("div");
      card.className = "suggestion-card";
      card.innerHTML = `
          <h3>${habit.nombre}</h3>
            <p>${habit.descripcion}</p>
          <div class="suggestion-details">
            <p><i data-lucide="clock"></i> Hora: ${habit.hora}</p>
                <p><i data-lucide="repeat"></i> Frecuencia: ${habit.frecuencia}</p>
            <p><i data-lucide="tag"></i> Categoría: ${habit.categoria}</p>
            <p><i data-lucide="calendar"></i> Fecha Creación: ${habit.fechaCreacion}</p>
          </div>
          <button class="add-suggestion-btn" data-index="${index}">
            <i data-lucide="plus-circle"></i> Agregar Hábito
          </button>
        `;
      suggestionsGrid.appendChild(card);
    });

    lucide.createIcons();

    document.querySelectorAll(".add-suggestion-btn").forEach((button) => {
      button.addEventListener("click", addSuggestedHabit);
    });
  }
  document.querySelectorAll(".add-suggestion-btn").forEach((button) => {
    button.addEventListener("click", addSuggestedHabit);
  });
  function addSuggestedHabit(event) {
    const index = event.currentTarget.getAttribute("data-index");
    const habit = suggestionHabits[index];

    const UsuarioId = 1;

    const habitData = {
      id: habit.id,
      usuarioId: UsuarioId
    };

    fetch(`http://localhost:5035/api/Habitos/${habit.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(habitData)
    })
      .then((data) => {
        showNotification(`Hábito "${habit.nombre}" añadido con éxito`);

        suggestionHabits.splice(index, 1);
        renderSuggestions(currentFilter);
      })
      .catch((error) => {
        showNotification(`Error al agregar el hábito: ${error}`);
      });
  }

  function addHabitToStorage(habit) {
    let habits = JSON.parse(localStorage.getItem("habits")) || [];
    const newHabit = {
      id: Date.now(),
      name: habit.name,
      description: habit.description,
      time: habit.time,
      frequency: habit.frequency,
      reminder: habit.reminder,
      streak: 0,
      progress: 0,
      category: habit.categoria,
      fechaCreacion: new Date().toISOString()
    };
    habits.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(habits));
  }

  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";

    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  }

  async function setupCategoryFilters() {
    const filterContainer = document.getElementById("category-filters");

    try {
      const response = await fetch("http://localhost:5035/api/Productividad");
      if (!response.ok) {
        throw new Error(`Error al obtener categorías: ${response.statusText}`);
      }

      // Parsear los datos de la API
      const categories = await response.json();

      const allCategories = ["Todas", ...categories.map((cat) => cat.nombre)];

      allCategories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.className = "category-filter-btn";
        button.addEventListener("click", () => {
          currentFilter = category;
          document
            .querySelectorAll(".category-filter-btn")
            .forEach((btn) => btn.classList.remove("active"));
          button.classList.add("active");
          renderSuggestions(category);
        });
        filterContainer.appendChild(button);
      });

      filterContainer
        .querySelector(".category-filter-btn")
        .classList.add("active");
    } catch (error) {
      console.error("Error configurando los filtros de categoría:", error);
    }
  }

  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("show-sidebar");
  });

  function loadProfilePicture() {
    const profilePicture = localStorage.getItem("profilePicture");
    const profilePictureElement = document.getElementById("profile-picture");
    if (profilePicture && profilePictureElement) {
      profilePictureElement.src = profilePicture;
    } else if (profilePictureElement) {
      profilePictureElement.src = "path/to/default-profile-picture.jpg";
    }
  }

  loadProfilePicture();
  setupCategoryFilters();
  loadHabitsFromAPI();
});
