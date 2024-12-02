document.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();

  streakCountElement = document.getElementById("total-streak");
  let lastKnownStreak = 0;

  const totalDaysElement = document.getElementById("total-days");

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

  const gifMotivacionales = [
    "https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1",
    "https://mir-s3-cdn-cf.behance.net/project_modules/hd/5eeea355389655.59822ff824b72.gif",
    "https://i.gifer.com/XOsX.gif",
    "https://media.idownloadblog.com/wp-content/uploads/2016/11/Animated-GIF-Banana.gif",
    "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmRpYnNucXVxa2x3Ym9yZWNlZ3VqaTExcW1zeTQxbXV3c3VjajUycSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/jwxMFMf74yjaXX3AD9/giphy.webp",
    "https://media.tenor.com/Jloq3y4mk8kAAAAj/amor-love.gif",
    "https://i.giphy.com/y4PQTcLTYJwOI.webp",
    "https://i0.wp.com/media1.giphy.com/media/QUOs7hGpn6PS/giphy.gif"
  ];

  async function cargarTotalRachas() {
    try {
      const response = await fetch(
        "http://localhost:5035/api/HistorialHabitos"
      );
      if (!response.ok) throw new Error("Error al obtener datos de la API");

      const historial = await response.json();

      const totalRachas = historial.reduce(
        (total, item) => total + (item.racha || 0),
        0
      );

      streakCountElement.textContent = totalRachas;

      if (totalRachas > lastKnownStreak) {
        showCongratulations(totalRachas);
        lastKnownStreak = totalRachas;
      }
    } catch (error) {
      console.error("Error cargando el total de rachas:", error);
    }
  }

  function showCongratulations(streak) {
    const modal = document.createElement("div");
    modal.className = "congratulations-modal";
    modal.innerHTML = `
        <div class="modal-content">
          <h2>¡Felicidades!</h2>
          <p>Has alcanzado una racha total de ${streak} días.</p>
          <p class="motivation">${getRandomMotivationalMessage()}</p>
          <button id="closeModal">Cerrar</button>
        </div>
      `;
    document.body.appendChild(modal);

    modal.style.animation = "fadeIn 0.5s";

    document
      .getElementById("closeModal")
      .addEventListener("click", function () {
        modal.style.animation = "fadeOut 0.5s";
        setTimeout(() => modal.remove(), 500);
      });
  }

  function getRandomMotivationalMessage() {
    return mensajesMotivacionales[
      Math.floor(Math.random() * mensajesMotivacionales.length)
    ];
  }

  function getRandomGIF() {
    return gifMotivacionales[
      Math.floor(Math.random() * gifMotivacionales.length)
    ];
  }

  function showDailyMotivation() {
    const motivationElement = document.createElement("div");
    motivationElement.className = "daily-motivation";
    motivationElement.innerHTML = `
        <div class="motivation-content">
          <p id="pMsg">${getRandomMotivationalMessage()}</p>
          <img src="${getRandomGIF()}" id="imgMsg"/>
        </div>
      `;
    document.querySelector(".container").prepend(motivationElement);

    motivationElement.style.animation = "slideIn 0.5s";
  }

  async function init() {
    await cargarTotalRachas();
    showDailyMotivation();
    cargarTotalDias();

    // Actualizar rachas cada minuto
    setInterval(cargarTotalRachas, 60000);
  }

  init();

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

  async function cargarTotalDias() {
    try {
      const response = await fetch(
        "http://localhost:5035/api/Habitos/asociados"
      );
      if (!response.ok)
        throw new Error("Error al obtener los hábitos asociados");

      const habitos = await response.json();

      // Obtén la fecha más antigua de la lista de hábitos
      let fechaMasAntigua = null;
      habitos.forEach((habito) => {
        const fechaCreacion = new Date(habito.fechaCreacion);
        if (!fechaMasAntigua || fechaCreacion < fechaMasAntigua) {
          fechaMasAntigua = fechaCreacion;
        }
      });

      if (fechaMasAntigua) {
        const today = new Date();
        const diferenciaTiempo = today - fechaMasAntigua;
        const totalDias = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24)); // Convertir a días

        if (totalDaysElement) {
          totalDaysElement.textContent = totalDias;
        } else {
          console.error("Elemento con id 'total-days' no encontrado.");
        }
      }
    } catch (error) {
      console.error("Error cargando el total de días:", error);
    }
  }
  loadProfilePicture();
});
