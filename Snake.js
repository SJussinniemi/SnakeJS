var Tausta = document.getElementById("sTausta");
var taustanLeveys = Tausta.width;
var taustanKorkeus = Tausta.height;
var nelio = Tausta.getContext("2d");
var omena = Tausta.getContext("2d");
var xKoord = 50; //Aloituskoordinaatit käärmeenpäälle
var yKoord = 50;
var ruudunPaivitys = 60; // Milli sekuntteja.
var madonnopeus = 10;
var madonsuunta = 3; // 1 = VASEN 2 = YLÖS 3 = OIKEA 4 = ALAS
var kerroin = Math.floor(Math.random()*4)+1;
var xOmena = ((Math.floor(Math.random()*11)*10) * kerroin);
var yOmena = ((Math.floor(Math.random()*11)*10) * kerroin);
var str = "Game Over!";
var pisteet = 0;


// Game loop
gameLoop();

function gameLoop() {
    //"Tyhjentää" ruudun vanhoista neliöistä.
    nelio.clearRect(0, 0, taustanLeveys, taustanKorkeus);
    //"Liikuttaa" matoa luomalla uuden neliön.
    nelio.strokeRect(xKoord, yKoord, 20, 20);
    
    luoOmena(xOmena,yOmena);

    // Madon pää osuu seinään 
    if (xKoord < 0 || xKoord > 401 || yKoord < 0 || yKoord > 401) {
        madonnopeus = 0;
        peliLoppu();
    }
   
    // Liikutetaan matoa haluttuun suuntaan
    // 1 = VASEN, 2 = YLÖS, 3 = OIKEA, 4 = ALAS
    if (madonsuunta === 1) {
        xKoord = xKoord - madonnopeus;
    } else if (madonsuunta === 2) {
        yKoord = yKoord - madonnopeus;      
    } else if (madonsuunta === 3) {
        xKoord = xKoord + madonnopeus;
    } else if (madonsuunta === 4) {
        yKoord = yKoord + madonnopeus;      
    }
    
    //Törmäys omenaan
    if (xKoord === xOmena && yKoord === yOmena) {
        xOmena = (Math.floor(Math.random()*10)*10) * kerroin;
        yOmena = (Math.floor(Math.random()*10)*10) * kerroin;
		pisteet = pisteet + 100;
		pistepaivitys();
    }  

    window.setTimeout(gameLoop, ruudunPaivitys); // Kutsuu tätä moveTest funktiota "ruudunPaivitys"ms välein
}

// Tehdään omenapelilaudalle
function luoOmena(x,y) {
    xOmena = x;
    yOmena = y;   
    omena.fillStyle ="#FF0000";
    omena.fillRect(xOmena,yOmena,20,20);
    omena.stroke();
}

function pistepaivitys(){
	document.getElementById("pts2").innerHTML = pisteet;
}

function peliLoppu(){
	document.getElementById("GG").innerHTML = str;
}

// Madon liikuttaminen
window.onkeydown = function (k) {
    var nappain = k.keyCode ? k.keyCode : k.which;
        
    // Asetetaan suunta näppäinpainalluksen perusteella
    if (nappain === 37 && madonsuunta != 3 ) { // VASEN
        madonsuunta = 1;  
    } else if (nappain === 38 && madonsuunta != 4) { // YLÖS
        madonsuunta = 2;
    } else if (nappain === 39 && madonsuunta != 1) { // OIKEA
        madonsuunta = 3;
    } else if (nappain === 40 && madonsuunta != 2) { // ALAS
        madonsuunta = 4;
    }
};
