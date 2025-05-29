// Lista de personajes con pistas más desafiantes
const personajes = [
  {
    nombre: "Albert Einstein",
    imagen: "assets/img/einstein.jpg",
    pista: "Pista: Revolucionó la física sin necesidad de una manzana cayendo."
  },
  {
    nombre: "Cleopatra",
    imagen: "assets/img/cleopatra.jpg",
    pista: "Pista: Fue la última líder de una gran dinastía del Nilo."
  },
  {
    nombre: "Mario Bros",
    imagen: "assets/img/mario.jpg",
    pista: "Pista: Salta sobre enemigos y explora tuberías verdes."
  },
  {
    nombre: "Frida Kahlo",
    imagen: "assets/img/frida.jpg",
    pista: "Pista: Sus autorretratos expresaban dolor y cultura mexicana."
  },
  {
    nombre: "Leonardo da Vinci",
    imagen: "assets/img/davinci.jpg",
    pista: "Pista: Maestro renacentista que mezcló arte y ciencia."
  },
  {
    nombre: "William Shakespeare",
    imagen: "assets/img/shakespeare.jpg",
    pista: "Pista: Cambió la historia del teatro con historias trágicas y poéticas."
  },
  {
    nombre: "Michael Jackson",
    imagen: "assets/img/michael.jpg",
    pista: "Pista: Dominó los escenarios con pasos que desafiaban la gravedad."
  },
  {
    nombre: "Marilyn Monroe",
    imagen: "assets/img/marilyn.jpg",
    pista: "Pista: Símbolo de Hollywood cuya imagen sigue viva décadas después."
  },
  {
    nombre: "Simón Bolívar",
    imagen: "assets/img/bolivar.jpg",
    pista: "Pista: Soñó con una América unida y libre del imperio."
  },
  {
    nombre: "Isaac Newton",
    imagen: "assets/img/newton.jpg",
    pista: "Pista: Sentó las bases de la física clásica en el siglo XVII."
  },
  {
    nombre: "Nikola Tesla",
    imagen: "assets/img/tesla.jpg",
    pista: "Pista: Su trabajo eléctrico encendió el futuro, aunque murió solo."
  },
  {
    nombre: "Messi",
    imagen: "assets/img/messi.jpg",
    pista: "Pista: Su zurda ha escrito historia en el fútbol moderno."
  },
  {
    nombre: "Goku",
    imagen: "assets/img/goku.jpg",
    pista: "Pista: Entrenó con maestros, murió, resucitó y aún sigue peleando."
  },
  {
    nombre: "Bob Esponja",
    imagen: "assets/img/bob.jpg",
    pista: "Pista: Trabaja en un restaurante debajo del mar con su amigo estrella."
  },
  {
    nombre: "La Mona Lisa",
    imagen: "assets/img/monalisa.jpg",
    pista: "Pista: Su sonrisa enigmática ha sido analizada por siglos."
  },
];

const hintElement = document.getElementById("hint");
const cardsContainer = document.getElementById("cards");
const successSound = document.getElementById("success-sound");
const errorSound = document.getElementById("error-sound");
const botonReiniciar = document.getElementById("reiniciar");

function obtenerTresAleatorios() {
  const copia = [...personajes];
  const seleccionados = [];
  for (let i = 0; i < 3; i++) {
    const index = Math.floor(Math.random() * copia.length);
    seleccionados.push(copia.splice(index, 1)[0]);
  }
  return seleccionados;
}

function iniciarJuego() {
  cardsContainer.innerHTML = "";
  const seleccionados = obtenerTresAleatorios();
  const correcto = seleccionados[Math.floor(Math.random() * 3)];
  hintElement.textContent = correcto.pista;

  seleccionados.forEach(personaje => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<img src="${personaje.imagen}" alt="personaje">`;

    card.addEventListener("click", () => {
      if (personaje.nombre === correcto.nombre) {
        card.classList.add("correct");
        successSound.play();
        hintElement.textContent = `¡Correcto! Era ${correcto.nombre}. 🎉`;
        desactivarTarjetas();
      } else {
        card.classList.add("incorrect");
        errorSound.play();
      }
    });

    cardsContainer.appendChild(card);
  });
}

function desactivarTarjetas() {
  const tarjetas = document.querySelectorAll(".card");
  tarjetas.forEach(t => t.style.pointerEvents = "none");
}

botonReiniciar.addEventListener("click", () => {
  iniciarJuego();
});

window.onload = iniciarJuego;
