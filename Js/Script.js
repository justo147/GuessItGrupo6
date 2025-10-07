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
} 
