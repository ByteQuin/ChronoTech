// Obtener usuario desde localStorage
const usuario = localStorage.getItem("usuarioActivo");

if (!usuario) {
  window.location.href = "index.html"; // Redirige si no ha iniciado sesión
} else {
  document.getElementById("nombreUsuario").textContent = usuario;
}

// Cerrar sesión
document.getElementById("cerrarSesion").addEventListener("click", function () {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "index.html";
});
