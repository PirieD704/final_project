/*
* ---------
* -- CANVAS
* ---------
*/	

// create the canvas tag with JS
var canvas = document.createElement('canvas');
// create a context for JS to play inside of
var context = canvas.getContext('2d');
// give canvas some substance
canvas.width = 512;
canvas.height = 480;
// console.dir(canvas)
// Put the canvas in the DOM
document.body.appendChild(canvas);

function draw(){
	requestAnimationFrame(draw);
}

draw();