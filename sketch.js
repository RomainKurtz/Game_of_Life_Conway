var HEIGHT = 500;
var WIDTH = 500;
var PIXEL = [];
var PIXEL_SWAP;
var RANDOM_LIFE_FACTOR = 0.95;

function setup() {
	initPIXEL();
	InitBaseCells();

  createCanvas(WIDTH, HEIGHT);
}

function draw() {
	clear();
	background(0);
  noSmooth();
  stroke(255);

 	DrawPIXEL();
 	CopyPIXELintoPIXEL_SWAP();
  UpdatePIXEL();
}



function initPIXEL(){
	PIXEL = new Array(HEIGHT);
	for (var i = 0; i < HEIGHT; i++) {
 		PIXEL[i] = new Array(WIDTH);
	}

	for (var i = 0; i < PIXEL.length; i++) {
		for (var u = 0; u < PIXEL[i].length; u++) {
			//PIXEL[i][u] = false;
			PIXEL[i][u] = Math.random() >= RANDOM_LIFE_FACTOR;
		}
	}
}

function mouseMoved() {
  PIXEL[mouseX][mouseY]= true;
  // prevent default
  return false;
}

function InitBaseCells(){
	// PIXEL[200][200] = true;
	// PIXEL[200][201] = true;
	// PIXEL[200][202] = true;
	// PIXEL[200][203] = true;
	// PIXEL[200][204] = true;
	// PIXEL[201][200] = true;
	// PIXEL[201][204] = true;

	//	PIXEL[200][205] = true;
	//	PIXEL[201][206] = true;
	//	PIXEL[202][202] = true;
	//	PIXEL[202][206] = true;
	//	PIXEL[203][203] = true;
	//	PIXEL[203][204] = true;
	//	PIXEL[203][205] = true;
	//	PIXEL[203][206] = true;

	// FROG
	// PIXEL[200][200] = true;
	// PIXEL[200][201] = true;
	// PIXEL[200][202] = true;
	// PIXEL[201][201] = true;
	// PIXEL[201][202] = true;
	// PIXEL[201][203] = true;

}

function DrawPIXEL(){
	for (var i = 0; i < PIXEL.length; i++) {
		for (var u = 0; u < PIXEL[i].length; u++) {
			if(PIXEL[i][u]){
			 point(i, u);
			}
		}
	}
}

function UpdatePIXEL(){
	for (var i = 0; i < PIXEL.length; i++) {
		for (var u = 0; u < PIXEL[i].length; u++) {
				PIXEL[i][u] = ConwayState(i,u);
		}
	}
}

function ConwayState(i,u){
		var liveCells = 0;

		if((i-1 >= 0 && u < PIXEL_SWAP[i].length) && PIXEL_SWAP[i-1][u+1]){
				liveCells++;
		}
		if((u < PIXEL_SWAP[i].length) && PIXEL_SWAP[i][u+1]){
				liveCells++;
		}
		if((i+1 < PIXEL_SWAP.length && u+1 < PIXEL_SWAP.length) && PIXEL_SWAP[i+1][u+1]){
				liveCells++;
		}
		if((i+1 < PIXEL_SWAP.length ) && PIXEL_SWAP[i+1][u]){
				liveCells++;
		}
		if((i+1 < PIXEL_SWAP.length && u-1 >= 0) && PIXEL_SWAP[i+1][u-1]){
				liveCells++;
		}
		if(u-1 >= 0 && PIXEL_SWAP[i][u-1]){
				liveCells++;
		}
		if((i-1 >= 0 && u-1 >= 0) && PIXEL_SWAP[i-1][u-1]){
				liveCells++;
		}
		if(i-1 >= 0 && PIXEL_SWAP[i-1][u]){
				liveCells++;
		}

		if(PIXEL_SWAP[i][u] == false && liveCells == 3 ){
			return true;
		}

		if(PIXEL_SWAP[i][u] == true &&  ( liveCells == 3 || liveCells == 2 )){
			return true;
		}

		if(PIXEL_SWAP[i][u] == true &&  ( liveCells < 2 || liveCells > 3 )){
			return false;
		}

		return false;
}

function CopyPIXELintoPIXEL_SWAP(){
	PIXEL_SWAP = PIXEL.map(function(arr) {
    return arr.slice();
	});
}