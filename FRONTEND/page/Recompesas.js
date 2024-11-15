document.addEventListener('DOMContentLoaded', function () {
    lucide.createIcons();

    // Variables globales
    let experiencia = 0;
    let nivel = 1;
    let habitosCompletados = 0;
    const experienciaPorHabito = 10;

    // Consejos motivacionales
    const consejos = [
        "La consistencia es clave para formar nuevos hábitos.",
        "Celebra tus pequeños logros diarios.",
        "Mantén el enfoque en tus objetivos.",
        "Cada día es una nueva oportunidad para mejorar.",
        "El progreso constante lleva al éxito.",
        "Pequeños cambios, grandes resultados.",
        "La disciplina vence a la motivación.",
        "Construye hábitos duraderos paso a paso.",
        "Tu futuro depende de tus hábitos actuales.",
        "La persistencia es el camino al éxito."
    ];
    let ultimoConsejo = '';

    // Inicialización del contador de hábitos completados
    function inicializarContador() {
        const progreso = JSON.parse(localStorage.getItem('recompensas')) || {};
        habitosCompletados = progreso.habitosCompletados || 0;
        actualizarUI();
    }

    // Función para actualizar la interfaz
    function actualizarUI() {
        const experienciaNecesaria = nivel * 100;
        const porcentajeExperiencia = (experiencia / experienciaNecesaria) * 100;

        document.getElementById('current-level').textContent = nivel;
        document.getElementById('current-xp').textContent = experiencia;
        document.getElementById('xp-needed').textContent = experienciaNecesaria;
        document.getElementById('habits-completed').textContent = habitosCompletados;

        // Animación suave de la barra de progreso
        const progressBar = document.getElementById('experience-bar');
        progressBar.animate([{ width: progressBar.style.width }, { width: `${porcentajeExperiencia}%` }], {
            duration: 500,
            fill: 'forwards',
            easing: 'ease-in-out'
        });
    }

    // Función para actualizar el consejo de manera aleatoria
    function actualizarConsejo() {
        const consejoElement = document.getElementById('current-tip');
        let nuevoConsejo;

        do {
            nuevoConsejo = consejos[Math.floor(Math.random() * consejos.length)];
        } while (nuevoConsejo === ultimoConsejo);

        ultimoConsejo = nuevoConsejo;
        consejoElement.style.opacity = '0';
        setTimeout(() => {
            consejoElement.textContent = nuevoConsejo;
            consejoElement.style.opacity = '1';
        }, 500);
    }

    // Manejo del evento de completar hábito
    window.addEventListener('habitoCompletado', function (event) {
        if (event.detail && event.detail.totalCompletados) {
            habitosCompletados = event.detail.totalCompletados;
            experiencia += experienciaPorHabito;

            if (experiencia >= nivel * 100) {
                nivel++;
                experiencia -= (nivel - 1) * 100;
                mostrarLogro(`¡Nivel ${nivel} alcanzado!`, `Has alcanzado el nivel ${nivel}. ¡Sigue así!`);
            }

            actualizarUI();
            guardarProgreso();
        }
    });

    // Función para completar un hábito
    function completarHabito() {
        habitosCompletados++;
        experiencia += experienciaPorHabito;

        if (experiencia >= nivel * 100) {
            nivel++;
            experiencia -= (nivel - 1) * 100;
            mostrarLogro(`¡Nivel ${nivel} alcanzado!`, `Has alcanzado el nivel ${nivel}. ¡Sigue así!`);
        }

        actualizarUI();
        guardarProgreso();
    }

    // Función para mostrar un logro
    function mostrarLogro(titulo, descripcion) {
        const logrosContainer = document.getElementById('achievements-container');
        const logroElement = document.createElement('div');
        logroElement.className = 'achievement-item';
        logroElement.innerHTML = `
            <i data-lucide="star" class="achievement-icon"></i>
            <div class="achievement-content">
                <h3>${titulo}</h3>
                <p>${descripcion}</p>
            </div>
        `;
        logrosContainer.prepend(logroElement);
        lucide.createIcons();

        // Limitar a mostrar solo los últimos 3 logros
        if (logrosContainer.children.length > 3) {
            logrosContainer.removeChild(logrosContainer.lastChild);
        }
    }

    // Función para guardar el progreso en localStorage
    function guardarProgreso() {
        const progresoActual = JSON.parse(localStorage.getItem('recompensas')) || {};
        const progresoNuevo = {
            experiencia,
            nivel,
            habitosCompletados
        };

        if (JSON.stringify(progresoActual) !== JSON.stringify(progresoNuevo)) {
            localStorage.setItem('recompensas', JSON.stringify(progresoNuevo));
        }
    }

    // Función para cargar el progreso desde localStorage
    function cargarProgreso() {
        try {
            const progreso = JSON.parse(localStorage.getItem('recompensas')) || {};
            experiencia = progreso.experiencia || 0;
            nivel = progreso.nivel || 1;
            habitosCompletados = progreso.habitosCompletados || 0;
            actualizarUI();
        } catch (error) {
            console.error("Error al cargar el progreso:", error);
            localStorage.removeItem('recompensas');
            experiencia = 0;
            nivel = 1;
            habitosCompletados = 0;
            actualizarUI();
        }
    }

    // Inicialización de la aplicación
    cargarProgreso();
    actualizarConsejo();
    inicializarContador();

    // Cambiar el consejo cada 30 segundos
    setInterval(actualizarConsejo, 30000);

    // Toggle del sidebar para dispositivos móviles
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function () {
        sidebar.classList.toggle('show-sidebar');
    });
});
