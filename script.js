// Credenciales predefinidas
const VALID_USERS = [
    { username: "Anfercorp", password: "2025Anfercorp" },
];

// Referencias a elementos del DOM
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('error-message');

// Función para validar credenciales
function validateCredentials(username, password) {
    return VALID_USERS.some(user => 
        user.username === username && user.password === password
    );
}

// Manejar el envío del formulario
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    
    // Validar credenciales
    if (validateCredentials(username, password)) {
        // Guardar estado de login en sessionStorage
        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('username', username);
        
        // Redirigir a la aplicación principal
        window.location.href = 'cotizacion.html';
    } else {
        // Mostrar mensaje de error
        errorMessage.style.display = 'block';
        
        // Limpiar campos
        passwordInput.value = '';
        
        // Enfocar en el campo de usuario
        usernameInput.focus();
    }
});

// Limpiar mensaje de error al cambiar los campos
usernameInput.addEventListener('input', function() {
    errorMessage.style.display = 'none';
});

passwordInput.addEventListener('input', function() {
    errorMessage.style.display = 'none';
});

// Enfocar en el campo de usuario al cargar la página
window.addEventListener('DOMContentLoaded', function() {
    usernameInput.focus();
});
