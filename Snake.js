/*
Törmäyksen reunukset.
Reunuksen x koordinaatit = 10 & 680
Reunuksen y koordinaatit = 10 & 480

*/



//Aloituskoordinaatit käärmeenpäälle
var taustanLeveys = 700;
var taustanKorkeus = 500;
var xKoord = 50;
var yKoord = 50;
var peliLoop = true; // Onko peli käynnissä.
var ruudunPaivitys = 100; // Milli sekuntteja, käytännössä madon nopeus atm


// 1 = VASEN 2 = YLÖS 3 = OIKEA 4 = ALAS
var madonsuunta = 3;

// Luodaan kaarmeenpaa eli nelio
var Tausta = document.getElementById("sTausta");
var nelio = Tausta.getContext("2d");
//nelio.rect(xKoord, yKoord, 10, 10); // x,y,leveys,korkeus

// Game loop
moveTest();

function moveTest() {
    nelio.clearRect(0, 0, taustanLeveys, taustanKorkeus);
   
    // Liikuttaminen
    window.onkeydown = function(k) {
        var nappain = k.keyCode ? k.keyCode : k.which;
        
        if (nappain === 37) { // VASEN
            //xKoord = xKoord - 10;
            madonsuunta = 1;
        } else if (nappain === 38) { // YLÖS
            //yKoord = yKoord - 10;
            madonsuunta = 2;
        } else if (nappain === 39) { // OIKEA
            //xKoord = xKoord + 10;
            madonsuunta = 3;
        } else if (nappain === 40) { // ALAS
            //yKoord = yKoord + 10;
            madonsuunta = 4;
        }
    };
    
    if (madonsuunta === 1) {
        xKoord = xKoord - 10
    } else if(madonsuunta === 2) {
        yKoord = yKoord - 10;      
    } else if(madonsuunta === 3) {
        xKoord = xKoord + 10;
    } else if(madonsuunta === 4) {
        yKoord = yKoord + 10;      
    }
    
    nelio.strokeRect(xKoord, yKoord, 10, 10);
    setTimeout(moveTest, ruudunPaivitys); // Kutsuu tätä moveTest funktiota "ruudunPaivitys"ms välein
}