document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    let workTime = 25;
    let breakTime = 5;
    let seconds = 0;
    let minutes = workTime;
    let isRunning = false;
    let isWorkTime = true;
    let timer;
    let activityName = "Actividad sin nombre";

    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const startButton = document.getElementById('start');
    const resetButton = document.getElementById('reset');
    const configButton = document.getElementById('config');
    const workElement = document.getElementById('work');
    const breakElement = document.getElementById('break');
    const activityNameElement = document.getElementById('activity-name');
    const customPrompt = document.getElementById('custom-prompt');
    const promptTitle = document.getElementById('prompt-title');
    const promptDescription = document.getElementById('prompt-description');
    const promptInputContainer = document.getElementById('prompt-input-container');
    const promptAcceptButton = document.getElementById('prompt-accept');
    const promptCancelButton = document.getElementById('prompt-cancel');

    // Crear el elemento de audio para la alarma
    const alarmSound = new Audio('alarm-clock-short-6402.mp3');
    
    // Precargar el sonido
    alarmSound.load();

    function updateDisplay() {
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        activityNameElement.textContent = activityName;
    }

    function toggleStartPause() {
        if (isRunning) {
            clearInterval(timer);
            startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
            timer = setInterval(updateTimer, 1000);
            startButton.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
        isRunning = !isRunning;
    }

    function updateTimer() {
        if (seconds > 0) {
            seconds--;
        } else if (minutes > 0) {
            minutes--;
            seconds = 59;
        } else {
            clearInterval(timer);
            isRunning = false;
            playAlarm();
            showNotification();
            if (isWorkTime) {
                minutes = breakTime;
                isWorkTime = false;
                workElement.classList.remove('active');
                breakElement.classList.add('active');
            } else {
                minutes = workTime;
                isWorkTime = true;
                breakElement.classList.remove('active');
                workElement.classList.add('active');
            }
            startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
        updateDisplay();
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        isWorkTime = true;
        minutes = workTime;
        seconds = 0;
        updateDisplay();
        startButton.innerHTML = '<i class="fa-solid fa-play"></i>';
        workElement.classList.add('active');
        breakElement.classList.remove('active');
    }

    function showConfigPrompt() {
        promptTitle.textContent = 'Configurar temporizador';
        promptDescription.textContent = 'Ingrese los detalles de la actividad';
        promptInputContainer.innerHTML = `
            <label for="activity-name-input">Nombre de la actividad:</label>
            <input type="text" id="activity-name-input" value="${activityName}">
            <label for="work-time-input">Tiempo de trabajo (minutos):</label>
            <input type="number" id="work-time-input" min="1" value="${workTime}">
            <label for="break-time-input">Tiempo de descanso (minutos):</label>
            <input type="number" id="break-time-input" min="1" value="${breakTime}">
        `;
        customPrompt.style.display = 'flex';
    }

    function saveConfig() {
        const newActivityName = document.getElementById('activity-name-input').value;
        const newWorkTime = parseInt(document.getElementById('work-time-input').value);
        const newBreakTime = parseInt(document.getElementById('break-time-input').value);

        if (newActivityName) {
            activityName = newActivityName;
        }
        if (newWorkTime && newWorkTime > 0) {
            workTime = newWorkTime;
        }
        if (newBreakTime && newBreakTime > 0) {
            breakTime = newBreakTime;
        }

        customPrompt.style.display = 'none';
        resetTimer();
    }

    function playAlarm() {
        console.log('Intentando reproducir el sonido...');
        alarmSound.currentTime = 0;
        alarmSound.play().then(() => {
            console.log('Sonido reproducido con éxito');
        }).catch(error => {
            console.error('Error al reproducir el sonido:', error);
        });
    }

    function showNotification() {
        const message = isWorkTime ? "¡Tiempo de descanso!" : "¡Tiempo de trabajo!";
        if ("Notification" in window) {
            Notification.requestPermission().then(function (permission) {
                if (permission === "granted") {
                    new Notification("Temporizador finalizado", {
                        body: message,
                        icon: "path/to/your/icon.png" // Reemplaza con la ruta a tu icono
                    });
                }
            });
        }
        // Mostrar notificación en la interfaz
        const notification = document.createElement('div');
        notification.className = 'custom-notification';
        notification.innerHTML = `
            <h3>Temporizador finalizado</h3>
            <p>${message}</p>
            <button class="close-notification">Cerrar</button>
        `;
        document.body.appendChild(notification);

        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.remove();
            alarmSound.pause(); // Detiene el sonido cuando se cierra la notificación
        });

        setTimeout(() => {
            notification.remove();
            alarmSound.pause(); // Detiene el sonido después de 5 segundos
        }, 5000);
    }

    startButton.addEventListener('click', toggleStartPause);
    resetButton.addEventListener('click', resetTimer);
    configButton.addEventListener('click', showConfigPrompt);
    promptAcceptButton.addEventListener('click', saveConfig);
    promptCancelButton.addEventListener('click', () => {
        customPrompt.style.display = 'none';
    });

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    updateDisplay();
    workElement.classList.add('active');
});