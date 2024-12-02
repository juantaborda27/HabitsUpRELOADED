document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();

    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileForm = document.getElementById('edit-profile-form');
    const profileForm = document.getElementById('profile-form');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const userAvatar = document.getElementById('user-avatar');
    const editAvatar = document.getElementById('edit-avatar');
    const userName = document.getElementById('user-name');
    const userEmail = document.getElementById('user-email');

    loadUserData();
    loadUserStats();

    editProfileBtn.addEventListener('click', function() {
        editProfileForm.style.display = 'block';
        document.getElementById('edit-username').value = userName.textContent;
        document.getElementById('edit-email').value = userEmail.textContent;
    });

    cancelEditBtn.addEventListener('click', function() {
        editProfileForm.style.display = 'none';
        profileForm.reset();
    });

    editAvatar.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userAvatar.src = e.target.result;
                // Guardar la imagen en localStorage
                localStorage.setItem('profilePicture', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    });

    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('edit-username').value;
        const email = document.getElementById('edit-email').value;
        const password = document.getElementById('edit-password').value;
        const confirmPassword = document.getElementById('edit-confirm-password').value;

        if (password && password !== confirmPassword) {
            showNotification('Las contraseñas no coinciden', 'error');
            return;
        }

        userName.textContent = username;
        userEmail.textContent = email;

        saveUserData({
            name: username,
            email: email,
            avatar: userAvatar.src
        });

        if (password) {
            // Aquí se debería implementar la lógica para actualizar la contraseña de forma segura
            console.log('Contraseña actualizada');
        }

        showNotification('Perfil actualizado correctamente', 'success');
        editProfileForm.style.display = 'none';
        profileForm.reset();
    });

    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show-sidebar');
    });


});

function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};
    document.getElementById('user-name').textContent = userData.name || 'Nombre de Usuario';
    document.getElementById('user-email').textContent = userData.email || 'usuario@ejemplo.com';
    
    // Cargar la imagen de perfil desde localStorage
    const profilePicture = localStorage.getItem('profilePicture');
    if (profilePicture) {
        document.getElementById('user-avatar').src = profilePicture;
    } else {
        document.getElementById('user-avatar').src = 'img/default-avatar.png';
    }
}

function saveUserData(data) {
    const currentData = JSON.parse(localStorage.getItem('userData')) || {};
    const updatedData = { ...currentData, ...data };
    localStorage.setItem('userData', JSON.stringify(updatedData));
    
    // Asegurarse de que la imagen de perfil se guarde por separado
    if (data.avatar) {
        localStorage.setItem('profilePicture', data.avatar);
    }
}

function loadUserStats() {
    const habits = JSON.parse(localStorage.getItem('habits')) || [];
    const today = new Date().toDateString();

    const activeHabits = habits.length;
    const completedHabits = habits.filter(h => h.completed).length;
    const currentStreak = calculateStreak(habits);
    const bestStreak = calculateBestStreak(habits);

    document.getElementById('active-habits').textContent = activeHabits;
    document.getElementById('completed-habits').textContent = completedHabits;
    document.getElementById('current-streak').textContent = currentStreak;
    document.getElementById('best-streak').textContent = bestStreak;
}

function calculateStreak(habits) {
    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    
    for (let i = 0; i < habits.length; i++) {
        const habitDate = new Date(habits[i].lastCompletedDate).setHours(0, 0, 0, 0);
        if (today - habitDate === streak * 86400000) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

function calculateBestStreak(habits) {
    let bestStreak = 0;
    let currentStreak = 0;
    let lastDate = null;

    habits.forEach(habit => {
        if (habit.lastCompletedDate) {
            const currentDate = new Date(habit.lastCompletedDate).setHours(0, 0, 0, 0);
            if (lastDate && currentDate - lastDate === 86400000) {
                currentStreak++;
            } else {
                currentStreak = 1;
            }
            lastDate = currentDate;
            bestStreak = Math.max(bestStreak, currentStreak);
        }
    });

    return bestStreak;
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}