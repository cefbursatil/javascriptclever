/* 
Es una página relacionada con el trading, así que inicialmente se piensa implementar 2 de las 3 siguientes carácteristicas con js
1. es un conversor de moneda que ojala use alguna api para realizar la conversión con precios reales
2. un apartado para la venta de robots e indicadores
3. Graficador de precios de activos financieros.
*/

//conversor version pre alpha

//FUNCIONES
class conversor{
    constructor(pMoneda1,pMoneda2){
        this.Moneda1=pMoneda1;
        this.Moneda2=pMoneda2;
    }
    convert(){
        //Metodo que realiza la conversión de monedas
        let multMoneda2=0;
        if(this.Moneda1.NombreMoneda=="usd"){
            if(this.Moneda2.NombreMoneda=="usd"){
                multMoneda2=1;
            }
            else if(this.Moneda2.NombreMoneda=="aud"){
                multMoneda2=0.9;
            }
            else{
                multMoneda2=1;
            }
        }
        else if(this.Moneda1.NombreMoneda=="aud"){
            if(this.Moneda2.NombreMoneda=="aud"){
                multMoneda2=1;
            }
            else if(this.Moneda2.NombreMoneda=="usd"){
                multMoneda2=1.1;
            }
            else{
                multMoneda2=1;
            }
        }
        else{
            multMoneda2=1;
        }
        this.Moneda2.CantidadMoneda=multMoneda2*this.Moneda1.CantidadMoneda;
    }
    output(){
        this.convert();
        return(this.Moneda1.CantidadMoneda+this.Moneda1.NombreMoneda+" equivalen a "+this.Moneda2.CantidadMoneda+this.Moneda2.NombreMoneda);
    }

}
class moneda{
    constructor(pNombreMoneda,pCantidadMoneda){
        this.NombreMoneda=pNombreMoneda.toLowerCase();
        this.CantidadMoneda=pCantidadMoneda;
    }
}



// Inicializo las variables
let moneda1="";
let moneda2="";
let cantMoneda1=0;
let outputText=""
// Pido las monedas y su correspondiente cantidad

moneda1=prompt("¿que moneda quieres convertir? (ej: USD)");
cantMoneda1=parseFloat(prompt("¿Que cantidad quieres convertir? \n (ej: 10000)"));
moneda2=prompt("¿a cual moneda quieres convertir convertir? (ej: AUD)");
//Creo los objetos
mon1 = new moneda(moneda1,cantMoneda1);
mon2 = new moneda(moneda2,0);

let conv = new conversor(mon1,mon2);
// calculo la cantidad de la segunda moneda
// texto de salida
outputText=conv.output();
// alerta al usuario
alert(outputText);

