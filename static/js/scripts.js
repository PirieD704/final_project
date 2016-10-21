/*
* ---------
* -- CANVAS
* ---------
*/	

// // create the canvas tag with JS
// var canvas = document.createElement('canvas');
// // create a context for JS to play inside of
// var context = canvas.getContext('2d');
// // give canvas some substance
// canvas.width = 512;
// canvas.height = 480;
// // console.dir(canvas)
// // Put the canvas in the DOM
// document.body.appendChild(canvas);

// function draw(){
// 	requestAnimationFrame(draw);
// }

// draw();

/*
from - http://phaser.io/tutorials/making-your-first-phaser-game
The first two parameters are the width and the height of the canvas element

The third parameter can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. 
This is the rendering context that you want to use. The recommended parameter is 
Phaser.AUTO which automatically tries to use WebGL, but if the browser or device doesn't 
support it it'll fall back to Canvas.

The fourth parameter is an empty string, this is the id of the DOM element in which you would 
like to insert the canvas element that Phaser creates. As we've left it blank it will simply 
be appended to the body.

The final parameter is an object containing four references to Phasers essential functions.

*/


var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.image(/* asset key */, /* image path */);
}
/* asset key is what is called in the code when creating sprites. any valid JS String can be a key */

function create() {
	game.add.sprite(/* top */, /* left */ , /* asset key */);
}

function update() {
}