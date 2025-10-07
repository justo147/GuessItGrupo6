let num;
let adivinado=false;
let numRand=random(1,100);
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

}while(adivinado!=true);


//Funcion para calcular el numero random entero
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
} 