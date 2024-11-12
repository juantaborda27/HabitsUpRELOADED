document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Simulated user data (replace with real data from your backend)
    const userData = {
        points: 1500,
        level: 'Intermedio'
    };

    // Simulated rewards data (replace with real data from your backend)
    const rewardsData = [
        { id: 1, name: 'Día de descanso extra', cost: 500, icon: 'coffee' },
        { id: 2, name: 'Sesión de meditación guiada', cost: 750, icon: 'lotus' },
        { id: 3, name: 'Clase de yoga online', cost: 1000, icon: 'yoga' },
        { id: 4, name: 'Libro de desarrollo personal', cost: 1500, icon: 'book-open' },
        { id: 5, name: 'Consulta con nutricionista', cost: 2000, icon: 'apple' }
    ];

    // Update user data
    document.getElementById('user-points').textContent = userData.points;
    document.getElementById('user-level').textContent = userData.level;

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
            document.getElementById('user-points').textContent = userData.points;
            alert(`¡Has canjeado "${reward.name}"! Disfruta tu recompensa.`);
        } else {
            alert('No tienes suficientes puntos para canjear esta recompensa.');
        }
    }

    // Re-initialize Lucide icons for dynamically added content
    lucide.createIcons();
});


// CODIGO FUNCION PROGRESO DE RECOMPENSA
// document.addEventListener("DOMContentLoaded",function(){

//         let circle = document.querySelector('.circle');
//         circle.forEach(function(progreso){
//             let grado = 0;
//             var targetDegree = parseInt(progreso.getAttribute
//                 ('data-degree'));
//             let color = progreso.getAttribute('data-color');
//             let  = progreso.querySelector('.number');

//             var intervalo = setInterval(function(){
//                 grado += 1;
//                 if(grado > targetDegree){
//                     clearInterval(intervalo);
//                     return;
//                 }
//                 progreso.style.background = `conic-gradient(${color} ${grado}%, #222 0%)`;
//             })
//         })
// });