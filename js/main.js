/* 
Es una página relacionada con el trading, así que inicialmente se piensa implementar 2 de las 3 siguientes carácteristicas con js
1. es un conversor de moneda que ojala use alguna api para realizar la conversión con precios reales
2. un apartado para la venta de robots e indicadores
3. Graficador de precios de activos financieros.
*/

//conversor version pre alpha

//Objetos con metodos dentro

var ValorDolares ={"usd":1,"aud":0.74,"gbp":1.39,"jpy":0.0091,"cop":0.00025,"ars":0.010}
class conversor{
    constructor(pMoneda1,pMoneda2){
        this.Moneda1=pMoneda1;
        this.Moneda2=pMoneda2;
    }
    convert(){
        //Metodo que realiza la conversión de monedas
        let multMoneda2=0;
        //console.log(this.Moneda1.NombreMoneda+" "+ValorDolares[this.Moneda1.NombreMoneda]+" "+ValorDolares[this.Moneda2.NombreMoneda]);
        if(ValorDolares[this.Moneda1.NombreMoneda] === undefined || ValorDolares[this.Moneda2.NombreMoneda] === undefined){
            console.log("undefined");
            multMoneda2=1;
            this.cantDolares=multMoneda2*this.Moneda1.CantidadMoneda;
        }
        else{
            multMoneda2=ValorDolares[this.Moneda1.NombreMoneda]/ValorDolares[this.Moneda2.NombreMoneda];
            this.cantDolares=ValorDolares[this.Moneda1.NombreMoneda]*this.Moneda1.CantidadMoneda;
        }
        
        this.Moneda2.CantidadMoneda=multMoneda2*this.Moneda1.CantidadMoneda;

    }
    output(){
        this.convert();
        return(this.Moneda1.CantidadMoneda+this.Moneda1.NombreMoneda+" equivalen a "+this.Moneda2.CantidadMoneda+this.Moneda2.NombreMoneda);
    }

}
class moneda{
    constructor(pNombreMoneda,pCantidadMoneda,pValorDolares=1){
        this.NombreMoneda=pNombreMoneda.toLowerCase();
        this.CantidadMoneda=pCantidadMoneda;
        this.ValorDolares=pValorDolares;
    }
}
let dolaresArray=[];
let convArray=[];
if(localStorage.getItem('Conversiones')!== null){
    convArray=JSON.parse(localStorage.getItem('Conversiones'));
}
if(localStorage.getItem('Dolares')!== null){
    dolaresArray=JSON.parse(localStorage.getItem('Dolares'));
}
function CalcConversion(){
    let moneda1="usd";
    let moneda2="usd";
    let cantMoneda1=0;
    let outputText="";
    moneda1=document.getElementById("curr1").value;
    cantMoneda1=document.getElementById("cantidad").value;
    moneda2=document.getElementById("curr2").value;
    //Creo los objetos
    mon1 = new moneda(moneda1,cantMoneda1);
    mon2 = new moneda(moneda2,0);

    let conv = new conversor(mon1,mon2);

    //guardo conversor en array para analizar estadisticas
    convArray.push(conv);

    // calculo la cantidad de la segunda moneda
    // texto de salida y cantDolares
    outputText=conv.output();
    const resultOutput = document.getElementById("result");
    resultOutput.value=conv.Moneda2.CantidadMoneda;
    dolaresArray.push(convArray[convArray.length-1].cantDolares);
    localStorage.setItem('Dolares',JSON.stringify(dolaresArray));
    localStorage.setItem('Conversiones',JSON.stringify(convArray));
}

function showLastConversions(){
    var f=0;
    divShowLasts.innerHTML=" ";
    divShowLasts.innerHTML+=`<br><h3> Last Conversions </h3><br>`;
    for(let i=0; i<convArray.length && f<5;i++){

        divShowLasts.innerHTML+=`<p> ${convArray[i].Moneda1.CantidadMoneda}
        ${convArray[i].Moneda1.NombreMoneda} <strong>=</strong> 
        ${convArray[i].Moneda2.CantidadMoneda}${convArray[i].Moneda1.NombreMoneda}
        </p><hr>`;
        f++;     

    }
}


// Inicializo las variables
let moneda1prub=document.getElementById("curr1").value;
let mayorDolares=0;

var divShowLasts=document.getElementById("LastConversions");
var convertidor=document.getElementById("convert");
convertidor.addEventListener('click',CalcConversion);
var convertidor=document.getElementById("convert");
var showlasts=document.getElementById("ShowAll");
showlasts.addEventListener('click',showLastConversions);

//ordenamos array para capturar el mayor de las conversiones y ofrecemos alerta final
mayorDolares=dolaresArray.sort(function(a, b){return b-a})[0];
//alert("Realizaste "+convArray.length+ " conversiones de moneda \n y la mayor cantidad de dolares en una conversion fue "+mayorDolares);
