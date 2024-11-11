document.addEventListener('DOMContentLoaded', function() {
  // Inicializar iconos de Lucide
  lucide.createIcons();

  // Variables para el temporizador
  let workTime = 25;
  let breakTime = 5;
  let seconds = 0;
  let minutes = workTime;
  let isRunning = false;
  let isWorkTime = true;
  let timer;

  const minutesElement = document.getElementById('minutes');
  const secondsElement = document.getElementById('seconds');
  const startButton = document.getElementById('start');
  const resetButton = document.getElementById('reset');
  const workElement = document.getElementById('work');
  const breakElement = document.getElementById('break');

  function updateDisplay() {
      minutesElement.textContent = minutes.toString().padStart(2, '0');
      secondsElement.textContent = seconds.toString().padStart(2, '0');
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

  // Event listeners
  startButton.addEventListener('click', toggleStartPause);
  resetButton.addEventListener('click', resetTimer);

  // Toggle sidebar en móviles
  const menuToggle = document.getElementById('menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  menuToggle.addEventListener('click', function() {
      sidebar.classList.toggle('show-sidebar');
  });

  // Inicializar la pantalla
  updateDisplay();
  workElement.classList.add('active');
});