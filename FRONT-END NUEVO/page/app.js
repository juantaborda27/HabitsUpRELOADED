// Variables globales
let currentSlide = 0;
let isLogin = true;
const slides = document.querySelectorAll(".carousel-slide");
const totalSlides = slides.length;

// Funciones del carrusel
function showSlide(index) {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

// Iniciar el carrusel automático
let slideInterval = setInterval(nextSlide, 5000);

// Funciones del modal
function toggleModal(show, loginMode = true) {
  const modal = document.getElementById("authModal");
  const birthdateGroup = document.querySelector(".birthdate-group");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const submitButtonText = document.getElementById("submitButtonText");
  const toggleText = document.getElementById("toggleText");
  const toggleButtonText = document.getElementById("toggleButtonText");

  if (show) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  } else {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  isLogin = loginMode;
  updateAuthUI();
}

function updateAuthUI() {
  const birthdateGroup = document.querySelector(".birthdate-group");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const submitButtonText = document.getElementById("submitButtonText");
  const toggleText = document.getElementById("toggleText");
  const toggleButtonText = document.getElementById("toggleButtonText");

  if (isLogin) {
    modalTitle.textContent = "Iniciar sesión";
    modalDescription.textContent = "Ingresa a tu cuenta para continuar";
    submitButtonText.textContent = "Iniciar sesión";
    toggleText.textContent = "¿No tienes cuenta?";
    toggleButtonText.textContent = "Regístrate";
    birthdateGroup.style.display = "none";
  } else {
    modalTitle.textContent = "Crear cuenta";
    modalDescription.textContent =
      "Regístrate para comenzar a mejorar tus hábitos";
    submitButtonText.textContent = "Registrarse";
    toggleText.textContent = "¿Ya tienes cuenta?";
    toggleButtonText.textContent = "Inicia sesión";
    birthdateGroup.style.display = "block";
  }
}

function toggleAuthMode() {
  isLogin = !isLogin;
  updateAuthUI();
}

// Event Listeners
document.getElementById("authModal").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (isLogin) {
    // Lógica para iniciar sesión
    fetch("http://localhost:5035/api/Usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al obtener los usuarios.");
        }
        return response.json();
      })
      .then((users) => {
        const user = users.find(
          (user) => user.correo === email && user.contraseña === password
        );

        if (user) {
          console.log("Autenticación exitosa:", user);
          toggleModal(false);
          window.location.href = "MisHabitos.html";
        } else {
          console.error("Error de autenticación: Usuario no encontrado.");
          alert("Usuario o contraseña incorrectos. Intenta de nuevo.");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        alert("Error en la conexión. Intenta de nuevo más tarde.");
      });
  } else {
    // Lógica para registrarse
    const nombre = document.getElementById("Nombre").value.trim();

    if (!nombre) {
      alert("Por favor, completa tu nombre para registrarte.");
      return;
    }

    fetch("http://localhost:5035/api/Usuarios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre,
        correo: email,
        contraseña: password
      })
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al registrar el usuario.");
        }
        return response.json();
      })
      .then((newUser) => {
        console.log("Registro exitoso:", newUser);
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        toggleAuthMode();
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
        alert("Error al registrarse. Intenta de nuevo más tarde.");
      });
  }
});

// Detener el carrusel cuando el mouse está sobre los controles
document.querySelectorAll(".carousel-control").forEach((control) => {
  control.addEventListener("mouseenter", () => clearInterval(slideInterval));
  control.addEventListener("mouseleave", () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  });
});

const text = "Mejora tus hábitos"; // El texto a mostrar
const duration = 200; // Duración entre cada carácter (en milisegundos)
let i = 0;

// Obtener el contenedor donde se muestra el texto
const typingContainer = document.getElementById("typingText");

// Función para mostrar cada carácter uno a uno
function typeText() {
  if (i < text.length) {
    typingContainer.textContent += text[i];
    i++;
    setTimeout(typeText, duration);
  }
}

// Iniciar la animación
typeText();

// Inicializar la primera diapositiva
showSlide(currentSlide);
