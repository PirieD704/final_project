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


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update, render:render });

function preload() {

    game.load.image('arrow', '/static/images/109617.png');

}

var sprite;
var weapon;
var cursors;
var fireButton;

function create() {

    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'arrow');

    //  The bullets will be automatically killed when they are 2000ms old
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon.bulletLifespan = 2000;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 100;

    //  Wrap bullets around the world bounds to the opposite side
    // weapon.bulletWorldWrap = true;

    sprite = this.add.sprite(400, 300, 'arrow');

    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite);

    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(sprite, 0, 0, true);

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

}

function update() {

    if (cursors.up.isDown)
    {
        game.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
    }
    else
    {
        sprite.body.acceleration.set(0);
    }

    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -300;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 300;
    }
    else
    {
        sprite.body.angularVelocity = 0;
    }

    if (fireButton.isDown)
    {
        weapon.fire();
    }

    game.world.wrap(sprite, 16);

}

function render() {

    weapon.debug();

}