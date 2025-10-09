/*Funcionalidad Simple para ver como funciona
let num;
let guess = false;
let numRand = random(1, 100);
let count = 0;
do {
    num = parseInt(prompt("Escribe un numero"));
    if (num < numRand) {
        alert("El numero a adivinar es mayor");
    } else if (num > numRand) {
        alert("El numero a adivinar es menor");
    } else {
        alert("Felicidades has adivinado el numero");
        guess = true;
    }
    count++;
} while (guess != true);

if (count <= 5) {
    document.writeln("Excelente, lo has adivinado en " + count + " intentos");
} else if (count > 5 && count <= 10) {
    document.writeln("Bien, lo has adivinado en " + count + " intentos");
} else {
    document.writeln("Regular, lo has adivinado en " + count + " intentos");
}

//Funcion para calcular el numero random entero
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
} */




//Empezamos el codigo utilizando formularios y botones
// Variables 
let numRand = random(1, 100);
let count = 0;
let gameOver = false;
let attempts = [];

// Elementos del DOM
const form = document.getElementById('guessForm');
const guessInput = document.getElementById('guess');
const resultDiv = document.getElementById('result');
const attemptCountEl = document.getElementById('attemptCount');
const box = document.getElementById('box');
const attemptsListDiv = document.getElementById('attemptsList');

// Función para generar número aleatorio
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función principal del juego
//Transladamos la logica comentada arriba utilizando los elementos del html para devolver lo que queramos
function evaluateGuess(num) {
    if (gameOver) return;

    count++;
    attemptCountEl.textContent = count;
    attempts.push(num);

    if (num < numRand) {
        resultDiv.innerHTML = ` El número es <strong>MAYOR</strong> que ${num}`;
    } else if (num > numRand) {
        resultDiv.innerHTML = ` El número es <strong>MENOR</strong> que ${num}`;
    } else {
        gameOver = true;
        resultDiv.innerHTML = ` ¡FELICIDADES! Adivinaste el número ${numRand}`;

        //Lanza confetti cuando se adivina el número
        lanzarConfeti();

    }
}

// Event listeners
form.addEventListener('submit', function (e) {
    e.preventDefault();
    const num = parseInt(guessInput.value);

    // Validación básica
    if (isNaN(num) || num < 1 || num > 100) {

        resultDiv.textContent = ' Por favor, introduce un número válido entre 1 y 100';
        return;
    }

    // funcion para ejecutar el juego
    evaluateGuess(num);
});

// Función para reiniciar el juego
function resetGame() {
    // Lógica de reinicio aquí...
}

console.log("Número aleatorio:", numRand);

function lanzarConfeti() {

    confetti({
        particleCount: 3,
        spread: 30,
        origin: { y: 0.6 }
    });
    requestAnimationFrame(lanzarConfeti);

}
