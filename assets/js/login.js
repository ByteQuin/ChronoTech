// Efectos de foco en los campos
const inputs = document.querySelectorAll(".input");

function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
}

function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value === "") {
        parent.classList.remove("focus");
    }
}

inputs.forEach(input => {
    input.addEventListener("focus", addcl);
    input.addEventListener("blur", remcl);
});

// Variables para control de modo
let isRegistering = false;

function toggleRegister() {
    const title = document.querySelector('.title');
    const submitBtn = document.getElementById('submitBtn');
    const toggleText = document.getElementById('toggleForm');
    const labelUsuario = document.querySelector(".input-div.one h5");
    const labelPassword = document.querySelector(".input-div.pass h5");

    isRegistering = !isRegistering;

    if (isRegistering) {
        title.innerText = 'Regístrate';
        submitBtn.value = 'Registrar';
        toggleText.innerHTML = '¿Ya tienes cuenta? <a href="#" onclick="toggleRegister()">Inicia sesión</a>';
        labelUsuario.innerText = 'Nuevo Usuario';
        labelPassword.innerText = 'Nueva Contraseña';
    } else {
        title.innerText = 'Bienvenido';
        submitBtn.value = 'Login';
        toggleText.innerHTML = '¿No tienes cuenta? <a href="#" onclick="toggleRegister()">Regístrate aquí</a>';
        labelUsuario.innerText = 'Usuario';
        labelPassword.innerText = 'Contraseña';
    }
}

// Manejador del formulario
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.querySelectorAll(".input")[0].value.trim();
    const password = document.querySelectorAll(".input")[1].value.trim();

    if (username === "" || password === "") {
        alert("Por favor, completa ambos campos.");
        return;
    }

    if (isRegistering) {
        if (localStorage.getItem(username)) {
            alert("Este usuario ya está registrado.");
        } else {
            localStorage.setItem(username, password);
            alert("¡Usuario creado satisfactoriamente! Ahora puedes iniciar sesión.");
            toggleRegister();
        }
    } else {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword === password) {
            alert("Inicio de sesión exitoso.");
            localStorage.setItem("usuarioActivo", username); // para dashboard
            window.location.href = "dashboard.html";
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    }
});
