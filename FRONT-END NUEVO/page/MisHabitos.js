document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();

  const habitsContainer = document.getElementById("habits-container");
  const newHabitBtn = document.getElementById("new-habit-btn");
  const modal = document.getElementById("modal");
  const habitForm = document.getElementById("habit-form");
  const cancelHabitBtn = document.getElementById("cancel-habit");
  const confirmDialog = document.getElementById("confirm-dialog");
  const cancelDeleteBtn = document.getElementById("cancel-delete");
  const confirmDeleteBtn = document.getElementById("confirm-delete");

  async function fetchAndCombineData() {
    try {
      const [habitosResponse, historialResponse] = await Promise.all([
        fetch("http://localhost:5035/api/Habitos/asociados"),
        fetch("http://localhost:5035/api/HistorialHabitos")
      ]);

      if (!habitosResponse.ok || !historialResponse.ok) {
        throw new Error(
          `Error en las respuestas de las APIs: Habitos (${habitosResponse.status}), Historial (${historialResponse.status})`
        );
      }

      const habitos = await habitosResponse.json();
      const historial = await historialResponse.json();

      if (!Array.isArray(habitos) || !Array.isArray(historial)) {
        throw new Error(
          "Los datos obtenidos no son arreglos. Verifica las respuestas de las APIs."
        );
      }

      const habitosConHistorial = habitos.map((habit) => {
        const historialHabit =
          historial.find((h) => h.habitosId === habit.id) || null;
        return { ...habit, historial: historialHabit };
      });

      return habitosConHistorial;
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      return [];
    }
  }

  let habits = [];
  let combinedHabits = [];
  let editingHabitId = null;
  let deletingHabitId = null;

  async function loadHabits() {
    combinedHabits = await fetchAndCombineData();

    localStorage.setItem("combinedHabits", JSON.stringify(combinedHabits));
    console.log("Datos combinados cargados desde la API:", combinedHabits);

    habits = combinedHabits.map(({ historial, ...habit }) => ({
      ...habit,
      streak: historial?.racha || 0,
      reminder: historial?.recordatorio || false
    }));

    renderHabits();
    scheduleReminders();
    inicializarContador();
    populateCategorySelect();
  }

  function renderHabits() {
    habitsContainer.innerHTML = "";
    habits.forEach((habit) => {
      const habitCard = document.createElement("div");
      habitCard.className = "habit-card";
      habitCard.setAttribute("data-id", habit.id);
      const progress = (habit.streak / habit.diasRepeticiones) * 100;
      habitCard.innerHTML = `
        <h3>${habit.nombre}</h3>
        <p>${habit.descripcion}</p>
        <div class="habit-details">
          <span>Categoría: ${habit.productividad?.nombre || "Null"}</span>
          <span>Hora: ${habit.hora}</span>
          <span>Racha: ${habit.streak}/${habit.diasRepeticiones} días</span>
          <span>Creado: ${new Date(habit.fechaCreacion).toLocaleDateString(
            "es-ES"
          )}</span>
        </div>
        <div class="habit-progress">
          <div class="habit-progress-bar" style="width: ${progress}%"></div>
        </div>
        <div class="habit-actions">
          <button class="primary-button complete-habit" data-id="${
            habit.id
          }">Completar</button>
          <div>
            <span class="habit-badge ${
              habit.completed ? "habit-badge-earned" : ""
            }" title="${
        habit.completed ? "Hábito completado" : "Hábito en progreso"
      }">
              ${habit.completed ? "🏆" : "🎯"}
            </span>
            <button class="icon-button edit-habit"><i data-lucide="edit"></i></button>
            <button class="icon-button delete-habit"><i data-lucide="trash-2"></i></button>
            ${
              habit.reminder
                ? '<button class="icon-button"><i data-lucide="bell"></i></button>'
                : ""
            }
          </div>
        </div>
      `;
      habitsContainer.appendChild(habitCard);

      habitCard
        .querySelector(".edit-habit")
        .addEventListener("click", (e) => openUpdateModal(habitCard));
      habitCard
        .querySelector(".delete-habit")
        .addEventListener("click", () => showDeleteConfirmation(habit.id));
      habitCard
        .querySelector(".complete-habit")
        .addEventListener("click", () => completeHabit(habit.id));
    });
    lucide.createIcons();
  }

  function openUpdateModal(habitCard) {
    const habitId = habitCard.getAttribute("data-id");
    const habit = habits.find((h) => h.id === parseInt(habitId));

    if (!habit) {
      alert("Hábito no encontrado");
      return;
    }

    const modal = document.getElementById("updateHabitModal");
    modal.style.display = "flex";

    document.getElementById("habitName").value = habit.nombre;
    document.getElementById("habitDescription").value = habit.descripcion;
    // document.getElementById("habitFrequency").value = habit.frecuencia;
    document.getElementById("habitTime").value = habit.hora;
    document.getElementById("habitRepetitions").value = habit.diasRepeticiones;
    document.getElementById("habitReminder").checked = habit.recordatorio;
    document.getElementById("habitCreationDate").value = new Date(
      habit.fechaCreacion
    ).toLocaleDateString("es-ES");

    const frequencySelect = document.getElementById("habitFrequency").value;
    frequencySelect.value = habit.frecuencia.toLowerCase();
    console.log("AQUI ------------------>", frequencySelect);
    fetch("http://localhost:5035/api/Productividad")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener las categorías de productividad.");
        }
        return response.json();
      })
      .then((productivities) => {
        const productivitySelect = document.getElementById("habitProductivity");
        productivitySelect.innerHTML = "";

        productivities.forEach((productivity) => {
          const option = document.createElement("option");
          option.value = productivity.id;
          option.textContent = productivity.nombre;
          if (productivity.id === habit.productividad.id) {
            option.selected = true;
          }
          productivitySelect.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error al cargar las opciones de productividad:", error);
      });

    document
      .getElementById("habitUpdateForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        updateHabit(habit.id);
      });

    document.getElementById("closeModalBtn").addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  function updateHabit(id) {
    const habitName = document.getElementById("habitName").value;
    const habitDescription = document.getElementById("habitDescription").value;
    const habitFrequency = document.getElementById("habitFrequency").value;
    const habitTime = document.getElementById("habitTime").value;
    const habitRepetitions = document.getElementById("habitRepetitions").value;
    const habitReminder = document.getElementById("habitReminder").checked;
    const habitProductivityId =
      document.getElementById("habitProductivity").value;

    const updatedHabit = {
      nombre: habitName,
      descripcion: habitDescription,
      frecuencia: habitFrequency,
      hora: habitTime,
      diasRepeticiones: habitRepetitions,
      recordatorio: habitReminder,
      productividadId: habitProductivityId
    };

    fetch(`http://localhost:5035/actualizarHabito/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedHabit)
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al actualizar el hábito.");
        }
        alert("Hábito actualizado con éxito.");
        location.reload();
      })
      .catch((error) => {
        console.error("Error al actualizar el hábito:", error);
        alert("Hubo un error al actualizar el hábito.");
      });
  }

  async function completeHabit(id) {
    const habitIndex = habits.findIndex((h) => h.id === id);
    if (habitIndex === -1) {
      showNotification("Hábito no encontrado.");
      return;
    }

    const habit = habits[habitIndex];
    const today = new Date().toDateString();

    if (habit.lastCompletedDate === today) {
      showNotification("Ya has completado este hábito hoy. ¡Vuelve mañana!");
      return;
    }

    try {
      console.log(id);
      //Verificar si Existe
      const response = await fetch(
        `http://localhost:5035/api/HistorialHabitos/${id}`
      );

      if (response.ok) {
        const historial = await response.json();

        const updatedHistorial = {
          ...historial,
          racha: (historial.racha || 0) + 1
        };
        // si existe pues actualicemoslo
        const updateResponse = await fetch(
          `http://localhost:5035/api/HistorialHabitos/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedHistorial)
          }
        );

        if (updateResponse.ok) {
          showNotification("¡Racha incrementada con éxito!");
        } else {
          throw new Error("Error al actualizar la racha.");
        }
      } else if (response.status === 404) {
        const newHistorial = {
          habitosId: id,
          fechaCompletado: new Date().toISOString(),
          racha: 1,
          recordatorio: true
        };

        const createResponse = await fetch(
          "http://localhost:5035/api/agregarHistorial",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newHistorial)
          }
        );

        if (createResponse.ok) {
          showNotification("¡Historial creado con éxito!");
        } else {
          throw new Error("Error al crear el historial.");
        }
      } else {
        throw new Error("Error al verificar el historial.");
      }

      //FALTA MODIFICAR ESTE LOCAL STORAGE PARA PODER TENER EL TOTAL DE HABITOS COMPLETADOS
      let totalHabitosCompletados = parseInt(
        localStorage.getItem("totalHabitosCompletados") || "0"
      );

      totalHabitosCompletados++;
      localStorage.setItem("totalHabitosCompletados", totalHabitosCompletados);

      habit.streak += 1;
      habit.progress = Math.min(100, (habit.streak / habit.repeatDays) * 100);
      habit.lastCompletedDate = today;

      if (habit.streak >= habit.repeatDays) {
        habit.completed = true;
        showNotification(
          `¡Felicidades! Has completado el hábito "${habit.name}" durante ${habit.repeatDays} días.`
        );
      }

      renderHabits();
      showNotification(
        `¡Hábito "${habit.name}" completado! Racha: ${habit.streak}/${habit.repeatDays} días`
      );

      const habitoCompletadoEvent = new CustomEvent("habitoCompletado", {
        detail: { totalCompletados: totalHabitosCompletados }
      });
      window.dispatchEvent(habitoCompletadoEvent);

      const contadorElement = document.getElementById("habits-completed");
      if (contadorElement) {
        contadorElement.textContent = totalHabitosCompletados;
      }

      console.log("Total hábitos completados:", totalHabitosCompletados);
      console.log("Elemento en la interfaz:", contadorElement);
    } catch (error) {
      console.error("Error al completar el hábito:", error);
      showNotification("Ocurrió un error al completar el hábito.");
    }
  }

  function showModal(title) {
    document.getElementById("modal-title").textContent = title;
    modal.style.display = "block";
  }

  function hideModal() {
    modal.style.display = "none";
    habitForm.reset();
    editingHabitId = null;
  }

  function showNotification(message) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.style.display = "block";
    setTimeout(() => {
      notification.style.display = "none";
    }, 3000);
  }

  newHabitBtn.addEventListener("click", () => {
    showModal("Crear Nuevo Hábito");
    populateCategorySelect();
  });

  function editHabit(id) {
    const habit = habits.find((h) => h.id === id);
    if (habit) {
      document.getElementById("habit-name").value = habit.name;
      document.getElementById("habit-description").value = habit.description;
      document.getElementById("habit-frequency").value = habit.frequency;
      document.getElementById("habit-time").value = habit.time;
      document.getElementById("habit-repeat-days").value =
        habit.repeatDays || 1;
      document.getElementById("habit-reminder").checked = habit.reminder;
      document.getElementById("habit-category").value = habit.category || "";
      editingHabitId = id;
      showModal("Editar Hábito");
    }
  }

  function showDeleteConfirmation(habitId) {
    const userConfirmed = confirm(
      "¿Estás seguro de que deseas eliminar este hábito?"
    );

    if (userConfirmed) {
      fetch(`http://localhost:5035/api/Habitos/${habitId}`, {
        method: "DELETE"
      })
        .then((response) => {
          if (response.ok) {
            alert("Hábito eliminado con éxito");
            window.location.href = window.location.href;
            location.reload();
          } else {
            alert("Hubo un error al eliminar el hábito");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el hábito:", error);
          alert("No se pudo conectar con el servidor. Verifica tu conexión.");
        });
    }
  }

  habitForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const habitData = {
      name: document.getElementById("habit-name").value,
      description: document.getElementById("habit-description").value,
      frequency: document.getElementById("habit-frequency").value,
      time: document.getElementById("habit-time").value,
      repeatDays: parseInt(document.getElementById("habit-repeat-days").value),
      reminder: document.getElementById("habit-reminder").checked,
      category: document.getElementById("habit-category").value,
      streak: 0,
      progress: 0,
      completed: false,
      lastCompletedDate: null,
      fechaCreacion: new Date().toISOString()
    };

    if (editingHabitId) {
      habits = habits.map((h) =>
        h.id === editingHabitId
          ? { ...h, ...habitData, fechaCreacion: h.fechaCreacion }
          : h
      );
    } else {
      habitData.id = Date.now();
      habits.push(habitData);
    }

    renderHabits();
    hideModal();
  });

  cancelHabitBtn.addEventListener("click", hideModal);

  confirmDeleteBtn.addEventListener("click", function () {
    habits = habits.filter((h) => h.id !== deletingHabitId);
    renderHabits();
    confirmDialog.style.display = "none";
  });

  cancelDeleteBtn.addEventListener("click", function () {
    confirmDialog.style.display = "none";
  });

  function scheduleReminders() {
    habits.forEach((habit) => {
      if (habit.reminder) {
        const [hours, minutes] = habit.time.split(":");
        const now = new Date();
        const reminderTime = new Date(
          now.getFullYear(),
          now.getMonth(),
          now.getDate(),
          hours,
          minutes
        );

        if (reminderTime > now) {
          const timeUntilReminder = reminderTime - now;
          setTimeout(() => {
            showReminderNotification(habit);
          }, timeUntilReminder);
        }
      }
    });
  }

  function showReminderNotification(habit) {
    const notification = document.createElement("div");
    notification.className = "reminder-notification";
    notification.innerHTML = `
            <h3>¡Recordatorio de hábito!</h3>
            <p>Es hora de: ${habit.name}</p>
            <button class="close-notification">Cerrar</button>
        `;
    document.body.appendChild(notification);

    notification
      .querySelector(".close-notification")
      .addEventListener("click", () => {
        notification.remove();
      });

    setTimeout(() => {
      notification.remove();
    }, 10000);
  }

  const menuToggle = document.getElementById("menu-toggle");
  const sidebar = document.querySelector(".sidebar");
  menuToggle.addEventListener("click", function () {
    sidebar.classList.toggle("show-sidebar");
  });

  function checkUncompletedHabits() {
    const today = new Date().toDateString();
    const uncompletedHabits = habits.filter(
      (habit) =>
        habit.lastCompletedDate !== today &&
        (habit.frequency === "daily" ||
          (habit.frequency === "weekly" && new Date().getDay() === 0) ||
          (habit.frequency === "monthly" && new Date().getDate() === 1))
    );

    if (uncompletedHabits.length > 0) {
      showUncompletedHabitsNotification(uncompletedHabits);
    }
  }

  function showUncompletedHabitsNotification(uncompletedHabits) {
    const message = `No has completado ${
      uncompletedHabits.length
    } hábito(s) hoy: ${uncompletedHabits.map((h) => h.name).join(", ")}`;
    showNotification(message, 10000); // Mostrar por 10 segundos
  }

  function scheduleUncompletedHabitsCheck() {
    const now = new Date();
    const endOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );
    const timeUntilEndOfDay = endOfDay - now;

    setTimeout(() => {
      checkUncompletedHabits();
      // Programar la próxima verificación para el día siguiente
      scheduleUncompletedHabitsCheck();
    }, timeUntilEndOfDay);
  }

  function loadProfilePicture() {
    const profilePicture = localStorage.getItem("profilePicture");
    if (profilePicture) {
      document.getElementById("profile-picture").src = profilePicture;
    }
  }

  const modalContainer = document.getElementById("modal-container");
  const categories = []; // Se llenará dinámicamente

  // Función para cargar las categorías desde el backend
  async function loadCategories() {
    try {
      const response = await fetch("http://localhost:5035/api/Productividad");
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      categories.length = 0;
      categories.push(...data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  }

  function renderModal() {
    modalContainer.innerHTML = `
    <div id="modal" class="modal">
      <div class="modal-content">
        <h2 id="modal-title">Crear Nuevo Hábito</h2>
        <form id="habit-form">
          <div class="form-group">
            <label for="habit-name">Nombre</label>
            <input type="text" id="habit-name" required />
          </div>
          <div class="form-group">
            <label for="habit-description">Descripción</label>
            <textarea id="habit-description" required></textarea>
          </div>
          <div class="form-group">
            <label for="habit-time">Hora</label>
            <input type="time" id="habit-time" required />
          </div>
          <div class="form-group">
            <label for="habit-diasRepeticiones">Dias de Repeticiones</label>
            <input type="number" id="habit-diasRepeticiones" required></input>
          </div>
          <div class="form-group">
            <label for="habit-frequency">Frecuencia</label>
            <select id="habit-frequency" required>
              <option value="diario">Diario</option>
              <option value="semanal">Semanal</option>
              <option value="mensual">Mensual</option>
            </select>
          </div>
          <div class="form-group">
            <label for="habit-category">Categoría</label>
            <select id="habit-category" required>
              <option value="">Selecciona una categoría</option>
              ${categories
                .map(
                  (category) =>
                    `<option value="${category.id}">${category.nombre}</option>`
                )
                .join("")}
            </select>
          </div>
          <div class="form-group">
          <label for="habit-reminder">
            <input type="checkbox" id="habit-reminder" />
            Recordatorio
          </label>
          </div>
          <div class="form-actions">
            <button type="button" id="cancel-habit">Cancelar</button>
            <button type="submit" class="primary-button">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  `;

    document
      .getElementById("cancel-habit")
      .addEventListener("click", () => closeModal());

    document
      .getElementById("habit-form")
      .addEventListener("submit", async (event) => {
        const nombre = document.getElementById("habit-name").value;
        const descripcion = document.getElementById("habit-description").value;
        const hora = document.getElementById("habit-time").value;
        const frecuencia = document.getElementById("habit-frequency").value;
        const productividadId = parseInt(
          document.getElementById("habit-category").value,
          10
        );
        const recordatorio = document.getElementById("habit-reminder").checked;
        const diasRepeticiones = document.getElementById(
          "habit-diasRepeticiones"
        ).value;

        if (!productividadId) {
          alert("Por favor selecciona una categoría.");
          return;
        }

        const horaSplit = hora.split(":");
        const horaFormateada = `${horaSplit[0]}:${horaSplit[1]}:00`;

        const habitData = {
          Nombre: nombre,
          Descripcion: descripcion,
          Frecuencia: frecuencia,
          Hora: horaFormateada,
          diasRepeticiones: diasRepeticiones,
          Recordatorio: recordatorio,
          ProductividadId: productividadId
        };

        try {
          const response = await fetch("http://localhost:5035/añadirHabito", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(habitData)
          });

          if (response.ok) {
            const result = await response.json();
            console.log("Hábito agregado exitosamente:", result);
            alert("¡Hábito agregado con éxito!");
            closeModal();
          } else {
            const error = await response.json();
            console.error("Error al agregar el hábito:", error);
            alert("Hubo un error al agregar el hábito. Intenta nuevamente.");
          }
        } catch (error) {
          console.error("Error de conexión:", error);
          alert("No se pudo conectar con el servidor. Verifica tu conexión.");
        }
      });
  }

  async function openModal() {
    await loadCategories();
    renderModal();
    document.getElementById("modal").style.display = "block";
  }

  function closeModal() {
    modalContainer.innerHTML = "";
  }

  document.getElementById("new-habit-btn").addEventListener("click", openModal);

  // document
  //   .getElementById("habit-form")
  //   .addEventListener("submit", function (event) {
  //     event.preventDefault();

  //     const nombre = document.getElementById("habit-name").value;
  //     const descripcion = document.getElementById("habit-description").value;
  //     const frecuencia = document.getElementById("habit-frequency").value;
  //     const hora = document.getElementById("habit-time").value;
  //     const diasRepeticiones = parseInt(
  //       document.getElementById("habit-repeat-days").value,
  //       10
  //     );
  //     const recordatorio = document.getElementById("habit-reminder").checked;
  //     const productividadId = parseInt(
  //       document.getElementById("habit-category").value,
  //       10
  //     );

  //     if (!productividadId) {
  //       alert("Por favor, selecciona una categoría.");
  //       return;
  //     }

  //     const habitData = {
  //       Nombre: nombre,
  //       Descripcion: descripcion,
  //       Frecuencia: frecuencia,
  //       Hora: hora,
  //       diasRepeticiones: diasRepeticiones,
  //       Recordatorio: recordatorio,
  //       ProductividadId: productividadId
  //     };

  //     fetch("http://localhost:5035/api/agregarHabitoSinUsuario", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(habitData)
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data) {
  //           alert("Hábito creado exitosamente.");
  //           closeModal();
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error al crear el hábito:", error);
  //         alert("Hubo un error al crear el hábito.");
  //       });
  //   });

  loadHabits();
  scheduleUncompletedHabitsCheck();
  loadProfilePicture();
});
