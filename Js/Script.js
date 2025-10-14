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
        resultDiv.style.display = "none";
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
        box.className = "error";
        resultDiv.style.display = "block"; // Muestra el cuadro
        resultDiv.innerHTML = `El número es <strong>MAYOR</strong> que ${num}`;
    } else if (num > numRand) {
        box.className = "error";
        resultDiv.style.display = "block"; // Muestra el cuadro
        resultDiv.innerHTML = `El número es <strong>MENOR</strong> que ${num}`;
    } else {
        gameOver = true;
        resultDiv.style.display = "block"; // Lo muestra SOLO al acertar
        resultDiv.innerHTML = `🎉 ¡FELICIDADES! Adivinaste el número ${numRand}`;
        lanzarConfeti();
    }
    // Mostrar historial de intentos
    if (!gameOver && count > 2) {
        // Toma los últimos 5 elementos del array 'attempts', los invierte para mostrar
        // los más recientes primero, y genera un string HTML con cada intento
        // formateado como un div con clase 'attempt-item'
        attemptsListDiv.innerHTML = `
                    <div class="attempts-list">
                        <h4>Tus últimos intentos:</h4>
                        ${attempts.slice(-5).reverse().map(a =>
            `<div class="attempt-item">→ ${a}</div>`
        ).join('')}
                    </div>
                `;
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
    resultDiv.style.display = "none";
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
