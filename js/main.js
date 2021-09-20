/* 
Es una página relacionada con el trading, así que inicialmente se piensa implementar 2 de las 3 siguientes carácteristicas con js
1. es un conversor de moneda que ojala use alguna api para realizar la conversión con precios reales
2. un apartado para la venta de robots e indicadores
3. Graficador de precios de activos financieros.
*/

//conversor version pre alpha

//Objetos con metodos dentro

//var ValorDolares ={"usd":1,"aud":0.74,"gbp":1.39,"jpy":0.0091,"cop":0.00025,"ars":0.010}
var ValorDolares={};
class conversor{
    constructor(pMoneda1,pMoneda2){
        this.Moneda1=pMoneda1;
        this.Moneda2=pMoneda2;
    }
    convert(){
        //Metodo que realiza la conversión de monedas
        let multMoneda2=0;
        console.log(this.Moneda1);
        let NomMoneda1=this.Moneda1.NombreMoneda;
        let NomMoneda2=this.Moneda2.NombreMoneda;
        let CanMoneda1=this.Moneda1.CantidadMoneda;
        let CantDolares=0;
        let canMoneda2=0;
        let self=this;
        return this.request().then(function(){
            if(ValorDolares[NomMoneda1] === undefined || ValorDolares[NomMoneda2] === undefined){
                console.log("undefined "+ ValorDolares[NomMoneda1]);
                multMoneda2=1;
            }
            else{
                multMoneda2=ValorDolares[NomMoneda1]/ValorDolares[NomMoneda2];
                
            }
            CantDolares=ValorDolares[NomMoneda1]*CanMoneda1;
            canMoneda2=CanMoneda1/multMoneda2;
            self.cantDolares=CantDolares;
            self.Moneda2.CantidadMoneda=canMoneda2;
            
        });
        console.log("YEAHAAFADSFA");    

    }
    request(){
        // API
        
        const APIURL = 'http://api.exchangeratesapi.io/v1/latest' ; 
        //Declaramos la información a enviar
        const infoPost =  {access_key: 'c0e73835a8c74e4e8a2ff702754ea125', base: 'EUR'};
        
        return $.ajax({
            method: "get",
            url: APIURL,
            data: infoPost,
            dataType:"json",
            timeout: 100000000,
            success: function(respuesta){
                ValorDolares=respuesta.rates;
                console.log(ValorDolares);
                
            }
        });

    }
    output(){
        
        this.convert();

        return(this.Moneda1.CantidadMoneda+this.Moneda1.NombreMoneda+" equivalen a "+this.Moneda2.CantidadMoneda+this.Moneda2.NombreMoneda);
    }

}
class moneda{
    constructor(pNombreMoneda,pCantidadMoneda,pValorDolares=1){
        this.NombreMoneda=pNombreMoneda.toUpperCase();
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
    let moneda1="EUR";
    let moneda2="EUR";
    let cantMoneda1=0;
    let outputText="";
    moneda1=document.getElementById("curr1").value;
    cantMoneda1=document.getElementById("cantidad").value;
    moneda2=document.getElementById("curr2").value;
    if(!$.isNumeric(cantMoneda1)){
        alert("You should insert a numeric value in the ammount of currency field");
        return false;
    }
    //Creo los objetos
    mon1 = new moneda(moneda1,cantMoneda1);
    mon2 = new moneda(moneda2,0);

    conv = new conversor(mon1,mon2);



    // calculo la cantidad de la segunda moneda
    // texto de salida y cantDolares
    $.when(conv.convert()).done(function(){
    //guardo conversor en array para analizar estadisticas
    convArray.push(conv);
    const resultOutput = document.getElementById("result");
    resultOutput.innerHTML=(Math.round(conv.Moneda2.CantidadMoneda*1000)/1000)+" "+moneda2;
    dolaresArray.push(convArray[convArray.length-1].cantDolares);
    localStorage.setItem('Dolares',JSON.stringify(dolaresArray));
    localStorage.setItem('Conversiones',JSON.stringify(convArray));
    $('#result').animate({height :'20px',
                          margin:"2em",
                          "font-size":"20px"},"slow")
                .fadeIn(2000)
                .css({"color":"blue"})
                .delay(20000)
                .animate({height :'20px',
                          margin:"2em",
                          "font-size":"20px"},"slow")
                .fadeOut(1000);    

    });            
}

function showLastConversions(){
    var f=0;
    var divShowLasts=document.getElementById("LastConversions");
    divShowLasts.innerHTML=" ";
    $('#LastConversions').append(`<br><h3> Last 5 Conversions </h3><br></br>`);
    for(let i=convArray.length-1;i>=0  && f<5;i--){
        $('#LastConversions').append(`
        <p> ${(Math.round(convArray[i].Moneda1.CantidadMoneda*1000)/1000)}
         ${convArray[i].Moneda1.NombreMoneda} <strong>=</strong> 
        ${(Math.round(convArray[i].Moneda2.CantidadMoneda*1000)/1000)} ${convArray[i].Moneda1.NombreMoneda}
        </p><hr>`
        );
        f++;     
    }
    $('#LastConversions').toggle("fast");
    if($('#ShowAll').val()=="Show All"){
        $('#ShowAll').val("Hide All");
    }
    else{
        $('#ShowAll').val("Show All");
    }
    $('html, body').animate({
        scrollTop: $("#LastConversions").offset().top  
    }, 500);



}


// Comienzo a realizar las operaciones de las variables una vez este cargado el DOM
$(document).ready(function(){

    $('#convert').on('click',CalcConversion);
    $('#ShowAll').on('click',showLastConversions);
    //ordenamos array para capturar el mayor de las conversiones y ofrecemos alerta final
    let mayorDolares=dolaresArray.sort(function(a, b){return b-a})[0];
}) ;   

//alert("Realizaste "+convArray.length+ " conversiones de moneda \n y la mayor cantidad de dolares en una conversion fue "+mayorDolares);
