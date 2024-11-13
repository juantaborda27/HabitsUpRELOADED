document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Simulated user data (replace with real data from your backend)
    const userData = {
        points: 1500,
        level: 'Intermedio',
        habitsCompleted: 0,
        streakDays: 0
    };

    // Simulated rewards data (replace with real data from your backend)
    const rewardsData = [
        { id: 1, name: 'Día de descanso extra', cost: 500, icon: 'coffee' },
        { id: 2, name: 'Sesión de meditación guiada', cost: 750, icon: 'star' },
        { id: 3, name: 'Clase de yoga online', cost: 1000, icon: 'leaf' },
        { id: 4, name: 'Libro de desarrollo personal', cost: 1500, icon: 'book-open' },
        { id: 5, name: 'Consulta con nutricionista', cost: 2000, icon: 'apple' }
    ];

    // Update user data
    function updateUserData() {
        document.getElementById('user-points').textContent = userData.points;
        document.getElementById('user-level').textContent = userData.level;
    }

    // Render rewards
    const rewardsContainer = document.getElementById('rewards-container');
    rewardsData.forEach(reward => {
        const rewardElement = createRewardElement(reward);
        rewardsContainer.appendChild(rewardElement);
    });

    // Toggle sidebar on mobile
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });

    function createRewardElement(reward) {
        const rewardDiv = document.createElement('div');
        rewardDiv.className = 'reward-item';
        rewardDiv.innerHTML = `
            <div class="reward-icon">
                <i data-lucide="${reward.icon}"></i>
            </div>
            <div class="reward-info">
                <h3>${reward.name}</h3>
                <p>${reward.cost} puntos</p>
            </div>
            <button class="redeem-button" data-reward-id="${reward.id}">Canjear</button>
        `;

        const redeemButton = rewardDiv.querySelector('.redeem-button');
        redeemButton.addEventListener('click', () => redeemReward(reward));

        return rewardDiv;
    }

    function redeemReward(reward) {
        if (userData.points >= reward.cost) {
            userData.points -= reward.cost;
            updateUserData();
            alert(`¡Has canjeado "${reward.name}"! Disfruta tu recompensa.`);
        } else {
            alert('No tienes suficientes puntos para canjear esta recompensa.');
        }
    }

    // Re-initialize Lucide icons for dynamically added content
    lucide.createIcons();

    // Función para actualizar los círculos de progreso
    function updateProgressCircles() {
        let circles = document.querySelectorAll('.circle');
        circles.forEach(function(progress, index) {
            let degree = 0;
            let targetDegree;
            if (index === 0) {
                targetDegree = userData.habitsCompleted;
            } else {
                targetDegree = (userData.streakDays / 100) * 100; // Convertir a porcentaje
            }
            let color = progress.getAttribute('data-color');
            let number = progress.querySelector('.number');
    
            var interval = setInterval(function() {
                degree += 1;
                if (degree > targetDegree) {
                    clearInterval(interval);
                    if (index === 0 && targetDegree >= 100) {
                        document.getElementById('habits-status').textContent = 'Hábitos completados';
                        userData.points += 500; // Puntos por completar hábitos diarios
                        updateUserData();
                        alert('¡Felicidades! Has completado todos tus hábitos diarios. Recibes 500 puntos extra.');
                    } else if (index === 1 && targetDegree >= 100) {
                        document.getElementById('streak-status').textContent = 'Racha completada 100 días';
                        userData.points += 1000;
                        updateUserData();
                        alert('¡Felicidades! Has completado una racha de 100 días. Recibes 1000 puntos extra.');
                    }
                    return;
                }
    
                progress.style.background = `conic-gradient(${color} ${degree * 3.6}deg, #222 0deg)`;
                number.textContent = Math.round(degree) + '%';
            }, 50); // Aumentado el intervalo para ralentizar la animación
        });
    }

    // Simular la actualización de hábitos completados y días de racha
    function simulateProgress() {
        userData.habitsCompleted = 2;//Math.min(100, userData.habitsCompleted + 5); // Reducido el incremento
        userData.streakDays = Math.min(100, userData.streakDays + 2); // Reducido el incremento
        updateProgressCircles();

        //userData.habitsCompleted < 100
        if (userData.streakDays < 100) {
            setTimeout(simulateProgress, 3000); // Aumentado el intervalo entre actualizaciones
        }
    }

    // Iniciar la simulación
    updateUserData();
    simulateProgress();


    const rewardModal = document.getElementById('reward-modal');
    const rewardModalTitle = document.getElementById('reward-modal-title');
    const rewardModalMessage = document.getElementById('reward-modal-message');
    const rewardModalClose = document.getElementById('reward-modal-close');

    function showRewardModal(title, message) {
        rewardModalTitle.textContent = title;
        rewardModalMessage.textContent = message;
        rewardModal.classList.add('show');
        createConfetti();
    }

    function hideRewardModal() {
        rewardModal.classList.remove('show');
    }

    rewardModalClose.addEventListener('click', hideRewardModal);

    function createConfetti() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            document.body.appendChild(confetti);

            confetti.addEventListener('animationend', function() {
                confetti.remove();
            });
        }
    }

    function redeemReward(reward) {
        if (userData.points >= reward.cost) {
            userData.points -= reward.cost;
            updateUserData();
            showRewardModal('¡Recompensa Canjeada!', `Has canjeado "${reward.name}". ¡Disfruta tu recompensa!`);
        } else {
            showRewardModal('Puntos Insuficientes', 'No tienes suficientes puntos para canjear esta recompensa.');
        }
    }


    
});