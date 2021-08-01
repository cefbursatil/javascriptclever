/* 
Es una página relacionada con el trading, así que inicialmente se piensa implementar 2 de las 3 siguientes carácteristicas con js
1. es un conversor de moneda que ojala use alguna api para realizar la conversión con precios reales
2. un apartado para la venta de robots e indicadores
3. Graficador de precios de activos financieros.
*/

//conversor version pre alpha

//FUNCIONES
function conversor(moneda1,cantMoneda1,moneda2){
    //recibe la hora actual (solo hora) y el país de esa hora entre argentina y colombia y devuelve la hora de japon para ver las olimpidas
    let multMoneda2=0;
    if(moneda1=="usd"){
        if(moneda2=="usd"){
            multMoneda2=1;
        }
        else if(moneda2=="aud"){
            multMoneda2=0.9;
        }
        else{
            multMoneda2=1;
        }
    }
    else if(moneda1=="aud"){
        if(moneda2=="aud"){
            multMoneda2=1;
        }
        else if(moneda2=="usd"){
            multMoneda2=1.1;
        }
        else{
            multMoneda2=1;
        }
    }
    else{
        multMoneda2=1;
    }
    return(multMoneda2*cantMoneda1);
}

function output(moneda1,cantMoneda1,moneda2,cantMoneda2){
        return(cantMoneda1+moneda1+" equivalen a "+cantMoneda2+moneda2);
}


// Inicializo las variables
let moneda1="";
let moneda2="";
let cantMoneda1=0;
let multMoneda2=0;
let cantMoneda2=0;
let outputText=""
// Pido el país y la hora actual
moneda1=prompt("¿que moneda quieres convertir? (ej: USD)");
moneda1=moneda1.toLowerCase();
cantMoneda1=parseFloat(prompt("¿Que cantidad quieres convertir? \n (ej: 10000)"));
moneda2=prompt("¿a cual moneda quieres convertir convertir? (ej: AUD)");
moneda2=moneda2.toLowerCase();
// calculo la hora en japon
cantMoneda2=conversor(moneda1,cantMoneda1,moneda2);
// texto de salida
outputText=output(moneda1,cantMoneda1,moneda2,cantMoneda2);
// alerta al usuario
alert(outputText);

