let num;
let adivinado=false;
let numRand=random(1,100);
let contador=0;
do{
    num=parseInt(prompt("Escribe un numero"));
    if(num<numRand){
        alert("El numero a adivinar es mayor");
    }else if(num>numRand){
        alert("El numero a adivinar es menor");
    }else{
        alert("Felicidades has adivinado el numero");
        adivinado=true;
    }
    contador++;
}while(adivinado!=true);

if(contador<=5){
    document.writeln("Excelente has tenido "+contador+" Intentos");
}else if(contador>5 && contador<=10){
    document.writeln("Bien has tenido "+contador+" Intentos");
}else{
    document.writeln("Regular has tenido "+contador+" Intentos");
}

//Funcion para calcular el numero random entero
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 