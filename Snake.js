var Tausta = document.getElementById("sTausta");
var taustanLeveys = Tausta.width;
var taustanKorkeus = Tausta.height;
var nelio = Tausta.getContext("2d");
var omena = Tausta.getContext("2d");
var xKoord = 50; //Aloituskoordinaatit käärmeenpäälle
var yKoord = 50;
var seuraavaPos =[xKoord,yKoord];
var ruudunPaivitys = 60; // Milli sekuntteja.
var madonnopeus = 10;
var madonsuunta = 3; // 1 = VASEN 2 = YLÖS 3 = OIKEA 4 = ALAS
var madonpituus = 0;
var kerroin = Math.floor(Math.random() * 4) + 1;
var xOmena = ((Math.floor(Math.random() * 11) * 10) * kerroin);
var yOmena = ((Math.floor(Math.random() * 11) * 10) * kerroin);
var str = "Game Over!";
var pisteet = 0;
var snek;
var madonpalat =[[30,50],[10,50]];

Mato = function() {

	
	
	kasva = function () {
		
		for(var i = 0; i < madonpalat.length; i++){
			var matox = madonpalat[i];
			nelio.strokeRect(matox[0], matox[1], 20, 20);
			console.log(matox[0] + "..." + matox[1]);
		}
	}

	liiku = function () {
		//"Tyhjentää" ruudun vanhoista neliöistä. 
		nelio.clearRect(0, 0, taustanLeveys, taustanKorkeus);
		//"Liikuttaa" matoa luomalla uuden neliön.
		nelio.strokeRect(seuraavaPos[0], seuraavaPos[1], 20, 20);
	}
	
};

function gameLoop() {
	
	liiku();
	kasva();
	
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
		seuraavaPos = [xKoord,yKoord];
    }else if (madonsuunta === 2) {
        yKoord = yKoord - madonnopeus;
		seuraavaPos = [xKoord,yKoord];
    }else if (madonsuunta === 3) {
        xKoord = xKoord + madonnopeus;
		seuraavaPos = [xKoord,yKoord];
    }else if (madonsuunta === 4) {
        yKoord = yKoord + madonnopeus;
		seuraavaPos = [xKoord,yKoord];
    }
    
    //Törmäys omenaan
    if (xKoord === xOmena && yKoord === yOmena) {
		// Omenalle uudet koordinaatit
        xOmena = (Math.floor(Math.random()*10)*10) * kerroin; 
        yOmena = (Math.floor(Math.random()*10)*10) * kerroin;
		// Lisätään pistet
		pisteet = pisteet + 100;
		pistepaivitys();
    }  

    window.setTimeout(gameLoop, ruudunPaivitys); // Kutsuu tätä moveTest funktiota "ruudunPaivitys"ms välein
};

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

snek = Mato();
// Game loop
gameLoop();
