// Redirige al hacer clic en el botón "Acceder"
document.addEventListener("DOMContentLoaded", function () {
    const botonAcceder = document.querySelector('.login-button');
    if (botonAcceder) {
        botonAcceder.addEventListener('click', function () {
            window.location.href = 'login.html';
        });
    }
});