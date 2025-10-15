// Variables globales
let numRand;
let count = 0;
let gameOver = false;
let attempts = [];
let currentDifficulty = 'easy';
let maxNumber = 100;
let confettiAnimationId;

// Sistema simple de jugadores
let players = JSON.parse(localStorage.getItem('numberGuessPlayers')) || [];
let currentPlayer = localStorage.getItem('currentPlayerName') || '';

// Elementos del DOM
const difficultyScreen = document.getElementById('difficultyScreen');
const gameScreen = document.getElementById('gameScreen');
const difficultyCards = document.querySelectorAll('.difficulty-card');
const rangeSubtitle = document.getElementById('rangeSubtitle');
const rangeDisplay = document.getElementById('rangeDisplay');
const inputSubtext = document.getElementById('inputSubtext');
const backToDifficultyBtn = document.getElementById('backToDifficulty');
const form = document.getElementById('guessForm');
const guessInput = document.getElementById('guess');
const resultDiv = document.getElementById('result');
const attemptCountEl = document.getElementById('attemptCount');
const box = document.getElementById('box');
const attemptsListDiv = document.getElementById('attemptsList');

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    resultDiv.style.display = "none";

    // Event listeners para las tarjetas de dificultad
    difficultyCards.forEach(card => {
        card.addEventListener('click', function () {
            selectDifficulty(this.dataset.difficulty);
        });
    });

    // Event listener para el botón volver
    backToDifficultyBtn.addEventListener('click', showDifficultyScreen);
    
    // Agregar botones al menú principal
    addMenuButtons();
});

// Función para seleccionar dificultad
function selectDifficulty(difficulty) {
    // Pedir nombre si no existe
    if (!currentPlayer) {
        const playerName = prompt('¿Cuál es tu nombre?');
        if (playerName && playerName.trim() !== '') {
            currentPlayer = playerName.trim();
            localStorage.setItem('currentPlayerName', currentPlayer);
            
            // Agregar a players si no existe
            if (!players.find(p => p.name === currentPlayer)) {
                players.push({
                    name: currentPlayer,
                    games: []
                });
                savePlayers();
            }
        } else {
            return; // Si no pone nombre, no inicia juego
        }
    }
    
    currentDifficulty = difficulty;

    if (difficulty === 'easy') {
        maxNumber = 100;
    } else {
        maxNumber = 1000;
    }

    // Actualizar la UI con el rango seleccionado
    rangeSubtitle.textContent = `Encuentra el número entre 1 y ${maxNumber}`;
    rangeDisplay.textContent = `1 - ${maxNumber}`;
    inputSubtext.textContent = `Número del 1 al ${maxNumber}`;

    // Actualizar los atributos del input
    guessInput.min = 1;
    guessInput.max = maxNumber;
    guessInput.placeholder = `1-${maxNumber}`;

    // Iniciar juego
    startGame();
    showGameScreen();
}

// Función para iniciar el juego
function startGame() {
    numRand = random(1, maxNumber);
    count = 0;
    gameOver = false;
    attempts = [];
    attemptCountEl.textContent = '0';
    resultDiv.style.display = "none";
    resultDiv.innerHTML = '';
    attemptsListDiv.innerHTML = '';
    guessInput.value = '';
    box.className = "box";
    
    // Detener confeti si estaba activo
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
        confettiAnimationId = null;
    }
    
    console.log("Número aleatorio:", numRand);
}

// Función para mostrar pantalla de juego
function showGameScreen() {
    difficultyScreen.classList.remove('active');
    gameScreen.classList.add('active');
    guessInput.focus();
}

// Función para mostrar pantalla de dificultad
function showDifficultyScreen() {
    gameScreen.classList.remove('active');
    difficultyScreen.classList.add('active');
}

// Función para generar número aleatorio
function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función principal del juego
function evaluateGuess(num) {
    if (gameOver) return;

    count++;
    attemptCountEl.textContent = count;
    attempts.push(num);

    if (num < numRand) {
        box.className = "box error";
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `El número es <strong>MAYOR</strong> que ${num}`;
    } else if (num > numRand) {
        box.className = "box error";
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `El número es <strong>MENOR</strong> que ${num}`;
    } else {
        gameOver = true;
        box.className = "box success";
        resultDiv.style.display = "block";
        
        // Guardar partida
        saveGame(count);
        
        resultDiv.innerHTML = `
            🎉 <strong>¡FELICIDADES ${currentPlayer}!</strong> Adivinaste el número ${numRand}
            <br><br>
            <strong>Intentos:</strong> ${count}
            <br><br>
            <div style="text-align: center;">
                <button class="reset-btn" onclick="resetGame()">↻</button>
            </div>
        `;
        lanzarConfeti();
    }

    // Mostrar historial de intentos
    if (!gameOver && count > 2) {
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

    if (isNaN(num) || num < 1 || num > maxNumber) {
        resultDiv.style.display = "block";
        resultDiv.innerHTML = `❌ Por favor, introduce un número válido entre 1 y ${maxNumber}`;
        return;
    }

    evaluateGuess(num);
    guessInput.value = '';
    guessInput.focus();
});

// Función para reiniciar el juego
function resetGame() {
    startGame();
}

// Función de confeti (sin bucle infinito)
function lanzarConfeti() {
    // Detener cualquier animación previa
    if (confettiAnimationId) {
        cancelAnimationFrame(confettiAnimationId);
    }

    // Lanzar confeti por 3 segundos
    const duration = 3000;
    const end = Date.now() + duration;

    function frame() {
        confetti({
            particleCount: 5,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff0080', '#8000ff', '#00ff80', '#ff8000', '#667eea']
        });

        if (Date.now() < end) {
            confettiAnimationId = requestAnimationFrame(frame);
        } else {
            confettiAnimationId = null;
        }
    }

    frame();
}

// Permitir reinicio con la tecla ESC
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        showDifficultyScreen();
    }
});



// Función para guardar partida
function saveGame(attempts) {
    const player = players.find(p => p.name === currentPlayer);
    if (player) {
        player.games.push({
            date: new Date().toISOString(),
            difficulty: currentDifficulty,
            attempts: attempts,
            number: numRand
        });
        savePlayers();
    }
}

// Función para guardar jugadores en localStorage
function savePlayers() {
    localStorage.setItem('numberGuessPlayers', JSON.stringify(players));
}

// Función para mostrar ranking
function showRanking() {
    updateRanking();
    showScreen('rankingScreen');
}

// Función para actualizar el ranking
function updateRanking() {
    const rankingList = document.getElementById('rankingList');
    
    // Calcular ranking (menos intentos promedio = mejor)
    const rankedPlayers = players
        .map(player => {
            const totalAttempts = player.games.reduce((sum, game) => sum + game.attempts, 0);
            const avgAttempts = player.games.length > 0 ? (totalAttempts / player.games.length).toFixed(1) : '-';
            return {
                name: player.name,
                games: player.games.length,
                avgAttempts: avgAttempts
            };
        })
        .filter(player => player.games > 0)
        .sort((a, b) => a.avgAttempts - b.avgAttempts);

    // Mostrar ranking
    rankingList.innerHTML = rankedPlayers.length > 0 ? 
        rankedPlayers.map((player, index) => `
            <div class="ranking-item">
                <span class="ranking-position">#${index + 1}</span>
                <span class="ranking-name">${player.name} ${player.name === currentPlayer ? '(Tú)' : ''}</span>
                <span class="ranking-score">${player.avgAttempts} intentos</span>
                <br>
                <small>${player.games} partidas</small>
            </div>
        `).join('') :
        '<p style="text-align: center; color: #666;">Aún no hay partidas jugadas</p>';
}

// Función para cambiar de jugador
function switchPlayer() {
    if (confirm('¿Quieres cambiar de jugador?')) {
        currentPlayer = '';
        localStorage.removeItem('currentPlayerName');
        showScreen('difficultyScreen');
    }
}

// Función para mostrar pantallas
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenName).classList.add('active');
}

// Función para agregar botones al menú principal
function addMenuButtons() {
    const menuButtons = document.createElement('div');
    menuButtons.style.textAlign = 'center';
    menuButtons.style.marginTop = '20px';
    menuButtons.innerHTML = `
        <button class="menu-btn" onclick="showRanking()" style="margin: 5px; padding: 10px 15px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Ver Ranking</button>
        <button class="menu-btn" onclick="switchPlayer()" style="margin: 5px; padding: 10px 15px; background: #95a5a6; color: white; border: none; border-radius: 5px; cursor: pointer;">Cambiar Jugador</button>
    `;
    
    const difficultyBox = document.getElementById('difficultyBox');
    if (difficultyBox && !difficultyBox.querySelector('.menu-buttons')) {
        difficultyBox.appendChild(menuButtons);
    }
}