document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileForm = document.getElementById('edit-profile-form');
    const profileForm = document.getElementById('profile-form');
    const cancelEditBtn = document.getElementById('cancel-edit');
    const userAvatar = document.getElementById('user-avatar');
    const editAvatar = document.getElementById('edit-avatar');

    // Mostrar formulario de edición
    editProfileBtn.addEventListener('click', function() {
        editProfileForm.style.display = 'block';
        document.getElementById('edit-username').value = document.getElementById('user-name').textContent;
    });

    // Ocultar formulario de edición
    cancelEditBtn.addEventListener('click', function() {
        editProfileForm.style.display = 'none';
        profileForm.reset();
    });

    // Manejar cambio de avatar
    editAvatar.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                userAvatar.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejar envío del formulario
    profileForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('edit-username').value;
        const password = document.getElementById('edit-password').value;
        const confirmPassword = document.getElementById('edit-confirm-password').value;

        // Validar contraseña
        if (password && password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        // Actualizar nombre de usuario
        document.getElementById('user-name').textContent = username;

        // Aquí puedes agregar la lógica para guardar los cambios en el servidor
        // Por ahora, solo simularemos que se guardó correctamente

        alert('Perfil actualizado correctamente');
        editProfileForm.style.display = 'none';
        profileForm.reset();
    });
});