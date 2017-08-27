// HTML juttuja
var Tausta = document.getElementById("sTausta");
var taustanLeveys = Tausta.width;
var taustanKorkeus = Tausta.height;
var nelio = Tausta.getContext("2d");
var omena = Tausta.getContext("2d");
var str = "Game Over!";
var pisteet = 0;

var ruudunPaivitys = 30; // Milli sekuntteja.
// Satunnaislaskuri TODO parempi
var kerroin = Math.floor(Math.random() * 4) + 1;
var xOmena = ((Math.floor(Math.random() * 11) * 10) * kerroin);
var yOmena = ((Math.floor(Math.random() * 11) * 10) * kerroin);
var snek;

Mato = function() {
	
	this.madonpalat = [];
	this.madonpituus = 6;
	this.madonsuunta = 3; // 1 = VASEN 2 = YLÖS 3 = OIKEA 4 = ALAS
	this.madonnopeus = 10;
	this.xKoord = 50; //Aloituskoordinaatit käärmeenpäälle
	this.yKoord = 20;
	this.madonpaa = madonpalat[0];
	
	luoMato = function () {
		// Luodaan mato laudalle käyttäne positiota x:50,y:20;
		var z = xKoord;
		for(var i = madonpituus - 1; i >= 0; i--){
			
			madonpalat.push({x:z,y:20});
			z-=20;
		}
	}
	
	piirrapala = function (x,y) {
		nelio.strokeRect(x,y,10,10);
	}

	piirraMato = function () {
		//"Tyhjentää" ruudun vanhoista neliöistä. 
		nelio.clearRect(0, 0, taustanLeveys, taustanKorkeus);

		// Poistaa viimeisimmän position listasta
		madonpalat.pop();
		// Piirtää paloiksi kaikki positiot listassa
		for(var i = 0; i < madonpalat.length; i++){
			var z = madonpalat[i];
			var q = madonpalat[0];
			console.log(i + ": " + z.x + " --- " + z.y);
			piirrapala(z.x, z.y);	
		}
	}	
};

function gameLoop() {
	
	piirraMato();
    luoOmena(xOmena,yOmena);
	tormaysTesti();
    /* 	
	Liikutetaan matoa haluttuun suuntaan
    1 = VASEN, 2 = YLÖS, 3 = OIKEA, 4 = ALAS
	unshift lisää uuden position matopalat listaan.
	*/
    if (madonsuunta === 1) {
        xKoord = xKoord - madonnopeus;
		madonpalat.unshift({x:xKoord,y:yKoord});
    }else if (madonsuunta === 2) {
        yKoord = yKoord - madonnopeus;
		madonpalat.unshift({x:xKoord,y:yKoord});
    }else if (madonsuunta === 3) {
        xKoord = xKoord + madonnopeus;
		madonpalat.unshift({x:xKoord,y:yKoord});
    }else if (madonsuunta === 4) {
        yKoord = yKoord + madonnopeus;
		madonpalat.unshift({x:xKoord,y:yKoord});
    }
    window.setTimeout(gameLoop, ruudunPaivitys); // Kutsuu tätä gameLoop funktiota "ruudunPaivitys" millisekunin välein
};

// Tehdään omenapelilaudalle
function luoOmena(x,y) {
    xOmena = x;
    yOmena = y;   
    omena.fillStyle ="#FF0000";
    omena.fillRect(xOmena,yOmena,10,10);
    omena.stroke();
	console.log("omenan positio: " + x + "--" + y);
}

function tormaysTesti(){
	
	//Törmäys omenaan
	if (xKoord === xOmena && yKoord === yOmena) {
		// Omenalle uudet koordinaatit
		xOmena = (Math.floor(Math.random()*10)*10) * kerroin; 
		yOmena = (Math.floor(Math.random()*10)*10) * kerroin;
		// Lisätään pistet
		pistepaivitys();
		madonpituus++;
	} 
	
	// Madon pää osuu seinään 
	if (xKoord < 0 || xKoord > 401 || yKoord < 0 || yKoord > 401) {
		madonnopeus = 0;
		console.log("GG");
		peliLoppu();
	}
}

//Päivitellään pisteet ruudulle
function pistepaivitys(){
	pisteet = pisteet + 100;
	document.getElementById("pts2").innerHTML = pisteet;
}

//ilmoitus pelin loppumisesta
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
luoMato();