/*
Törmäyksen reunukset.
Reunuksen x koordinaatit = 10 & 680
Reunuksen y koordinaatit = 10 & 480
Omena x 15 - 675
*/


var taustanLeveys = 700;
var taustanKorkeus = 500;
var xKoord = 50; //Aloituskoordinaatit käärmeenpäälle
var yKoord = 50;
var ruudunPaivitys = 100; // Milli sekuntteja.
var madonnopeus = 10;
var madonsuunta = 3; // 1 = VASEN 2 = YLÖS 3 = OIKEA 4 = ALAS
var Tausta = document.getElementById("sTausta");
var nelio = Tausta.getContext("2d");
var omena = Tausta.getContext("2d");
var omenalaudalla;
var xOmena;
var yOmena;

// Game loop

moveTest();
seinaTarkistus();


function moveTest() {
    nelio.clearRect(0, 0, taustanLeveys, taustanKorkeus);
   
    // Liikuttaminen
    window.onkeydown = function(k) {
        var nappain = k.keyCode ? k.keyCode : k.which;
        
        // Asetetaan suunta näppäinpainalluksen perusteella
        if (nappain === 37) { // VASEN
            madonsuunta = 1;
        } else if (nappain === 38) { // YLÖS
            madonsuunta = 2;
        } else if (nappain === 39) { // OIKEA
            madonsuunta = 3;
        } else if (nappain === 40) { // ALAS
            madonsuunta = 4;
        }
    };
    // Liikutetaan matoa haluttuun suuntaan
    if (madonsuunta === 1) {
        xKoord = xKoord - madonnopeus;
    } else if (madonsuunta === 2) {
        yKoord = yKoord - madonnopeus;      
    } else if(madonsuunta === 3) {
        xKoord = xKoord + madonnopeus;
    } else if(madonsuunta === 4) {
        yKoord = yKoord + madonnopeus;      
    }
    
    nelio.strokeRect(xKoord, yKoord, 10, 10);
    setTimeout(moveTest, ruudunPaivitys); // Kutsuu tätä moveTest funktiota "ruudunPaivitys"ms välein
    
    
    if(xKoord === xOmena && yKoord === yOmena){
        //TODO
    }  

    luoOmena();
    console.log(xKoord + " -- " + yKoord);
}

function seinaTarkistus(){
    if(xKoord < 0 || xKoord > 691 || yKoord < 0 || yKoord > 491) {
        madonnopeus = 0;
    }
    setTimeout(seinaTarkistus,ruudunPaivitys);
}

function luoOmena() {
    xOmena = 280;
    yOmena = 50;   
    omena.fillStyle ="#FF0000";
    omena.fillRect(xOmena,yOmena,10,10);
    omena.stroke();
    
}

