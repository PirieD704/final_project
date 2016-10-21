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


var circle, sprite, weapon, cursors, fireButton;

function preload() {

	game.load.image('background', '/static/images/background.png');
	game.load.image('particle', '/static/images/green_particle.png')
    game.load.image('player', '/static/images/player_1.png');
    game.load.image('shield', '/static/images/line2.png');

}

function create() {

	game.add.tileSprite(0, 0, 1920, 1920, 'background');
    //  Creates 30 bullets, using the 'bullet' graphic
    weapon = game.add.weapon(30, 'particle');


    //  The bullets will be automatically killed when they are 2000ms old
    weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    weapon.bulletLifespan = 2000;

    //  The speed at which the bullet is fired
    weapon.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    weapon.fireRate = 100;

    //  Wrap bullets around the world bounds to the opposite side
    // weapon.bulletWorldWrap = true;
    sprite = this.add.sprite(game.world.centerX, game.world.centerY, 'player');
    shield = game.add.sprite(game.world.centerX, game.world.centerY, 'shield');
    sprite.scale.setTo(0.3, 0.3);
    circleObj = new Phaser.Circle(game.world.centerX, 100,64);
    circle = game.add.sprite(game.world.centerX, game.world.centerY, circle);

    sprite.anchor.set(0.5);

    game.physics.arcade.enable(sprite);
    game.physics.arcade.enable(circle);

    sprite.body.drag.set(70);
    sprite.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    weapon.trackSprite(sprite, 0, 0, true);

    cursors = this.input.keyboard.createCursorKeys();

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

    //
	//cursor follow arrow
	//
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = '#0072bc';

    // sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.setTo(0.5, 0.5);

    //  Enable Arcade Physics for the sprite
    game.physics.enable(sprite, Phaser.Physics.ARCADE);
    game.physics.enable(circle, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    // sprite.body.allowRotation = false;

    //camera follows players / center

    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
    
    game.physics.p2.enable(sprite);
    game.physics.p2.enable(circle);
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(sprite);

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

    // sprite.rotation = game.physics.arcade.angleToPointer(sprite);
    sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);

}

function render() {

    // weapon.debug();
    // game.debug.spriteInfo(sprite, 32, 32);
    game.debug.geom(circle,'#cfffff');
    // game.debug.text('Diameter : '+circle.diameter,50,200);
    // game.debug.text('Circumference : '+circle.circumference(),50,230);

}

// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, render: render });

// var circle;
// var floor;

// function create() {

//     circle = new Phaser.Circle(game.world.centerX, 100,64);

// }

// function render () {

//     game.debug.geom(circle,'#cfffff');
//     game.debug.text('Diameter : '+circle.diameter,50,200);
//     game.debug.text('Circumference : '+circle.circumference(),50,230);

// }