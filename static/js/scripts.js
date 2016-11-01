// /*
// * ---------
// * -- CANVAS/PHASER
// * ---------
// */	

// /*
// from - http://phaser.io/tutorials/making-your-first-phaser-game
// The first two parameters are the width and the height of the canvas element

// The third parameter can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. 
// This is the rendering context that you want to use. The recommended parameter is 
// Phaser.AUTO which automatically tries to use WebGL, but if the browser or device doesn't 
// support it it'll fall back to Canvas.

// The fourth parameter is an empty string, this is the id of the DOM element in which you would 
// like to insert the canvas element that Phaser creates. As we've left it blank it will simply 
// be appended to the body.

// The final parameter is an object containing four references to Phasers essential functions.

// */


// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update, render:render });


// var circle, sprite, weapon, cursors, fireButton, blueTeam, redTeam, flagGroup, myTeam;

// function preload() {

// 	game.load.image('background', '/static/images/background.png');
// 	game.load.image('particle', '/static/images/green_particle.png');
//     game.load.image('flare', '/static/images/flare.png');
//     game.load.image('player', '/static/images/player_1.png');
//     game.load.image('flag', '/static/images/flag_orb_unclaimed.png');
//     game.load.image('blueFlag', '/static/images/flag_orb_blue.png');
//     game.load.image('redFlag', '/static/images/flag_orb_red.png');
//     game.load.image('shield', '/static/images/shield_fp.png');

// }

// function create() {

// 	game.add.tileSprite(0, 0, 1920, 1920, 'background');
//     //  Creates 30 bullets, using the 'bullet' graphic
//     // You can set the bullet limit to -1 if you don't want to worry about the size of the array, but be careful bc it will never decrease the size of the array once grown
//     weapon = game.add.weapon(300, 'particle');
//     weapon2 = game.add.weapon(10, 'flare');
//     // weapon2.scale.setTo(0.35, 0.35);

//     // if(myTeam === 'Blue'){
//     //     blueBullets = game.add.group();
//     //     blueBullets.enableBody = true;
//     //     blueBullets.physicsBodyType = Phaser.Physics.ARCADE;
//     //     blueBullets.createMultiple(30, 'particle');
//     //     // blueBullets.trackSprite(sprite, 0, 0, true);
//     //     blueBullets.setAll('outOfBoundsKill', true);
//     //     blueBullets.setAll('checkWorldBounds', true);
//     // }else if(myTeam === 'red'){
//     //     redBullets = game.add.group();
//     //     redBullets.enableBody = true;
//     //     redBullets.physicsBodyType = Phaser.Physics.ARCADE;
//     //     redBullets.createMultiple(30, 'particle');
//     //     // blueBullets.trackSprite(sprite, 0, 0, true);
//     //     redBullets.setAll('outOfBoundsKill', true);
//     //     redBullets.setAll('checkWorldBounds', true);
//     // }
//     //  The bullets will be automatically killed when they are 2000ms old
//     weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
//     weapon.bulletLifespan = 2000;
//     weapon2.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
//     weapon2.bulletLifespan = 1200;

//     //  The speed at which the bullet is fired
//     weapon.bulletSpeed = 900;
//     weapon2.bulletSpeed = 300;

//     //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
//     weapon.fireRate = 100;
//     weapon2.fireRate = 300;

//     //  Wrap bullets around the world bounds to the opposite side
//     // weapon.bulletWorldWrap = true;
//     sprite = this.add.sprite(game.world.centerX, game.world.centerY, 'player');
//     shield = game.add.sprite(game.world.centerX, game.world.centerY, 'shield');
//     // flag = game.add.sprite(game.world.centerX, game.world.centerY, 'flag');
//     flag = this.game.add.sprite(this.game.world.centerX, (this.game.world.centerY-300), 'flag');this.game.time.events.loop(2000, function() {  this.game.add.tween(flag).to({x: this.game.world.randomX, y: this.game.world.randomY}, 3000, Phaser.Easing.Quadratic.InOut, true);}, this)
//     flag.scale.setTo(0.2, 0.2);
//     sprite.scale.setTo(0.35, 0.35);
//     console.log(flag);
//     console.log(sprite)
//     sprite.anchor.set(0.5);
//     shield.anchor.set(0.5);

//     game.physics.arcade.enable(sprite);
//     game.physics.arcade.enable(shield);

//     sprite.body.drag.set(70);
//     sprite.body.maxVelocity.set(200);
//     shield.body.drag.set(70);
//     shield.body.maxVelocity.set(200);

//     // creat our team and flag groups
//     blueTeam = game.add.group();
//     blueTeam.enableBody = true;
//     blueTeam.physicsBodyType = Phaser.Physics.ARCADE;
//     redTeam = game.add.group();
//     redTeam.enableBody = true;
//     redTeam.physicsBodyType = Phaser.Physics.ARCADE;
//     flagGroup = game.add.group();
//     flagGroup.enableBody = true;
//     flagGroup.physicsBodyType = Phaser.Physics.ARCADE;

//     // add sprite to a team
//     blueTeam.add(sprite);

//     // add flag to flag group
//     flagGroup.add(flag);


//     //  Tell the Weapon to track the 'player' Sprite
//     //  With no offsets from the position
//     //  But the 'true' argument tells the weapon to track sprite rotation
//     weapon.trackSprite(sprite, 0, 0, true);
//     weapon2.trackSprite(sprite, 0, 0, true);

//     cursors = this.input.keyboard.createCursorKeys();

//     fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
//     fireButton2 = this.input.keyboard.addKey(Phaser.KeyCode.F);
//     boost = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT);

//     //
// 	//cursor follow arrow
// 	//
//     game.physics.startSystem(Phaser.Physics.ARCADE);

//     game.stage.backgroundColor = '#0072bc';

//     // sprite = game.add.sprite(400, 300, 'arrow');
//     // sprite.anchor.setTo(0.5, 0.5);
//     shield.anchor.setTo(0.45, 0.5);

//     //  Enable Arcade Physics for the sprite
//     game.physics.enable([sprite, shield], Phaser.Physics.ARCADE);
//     // game.physics.enable(shield, Phaser.Physics.ARCADE);

//     sprite.name = 'mainPlayer';
//     flag.name = 'theFlag'
//     // group = game.add.physicsGroup();


//     //  Tell it we don't want physics to manage the rotation
//     // sprite.body.allowRotation = false;

//     //camera follows players / center

//     game.world.setBounds(0, 0, 1920, 1920);
//     game.physics.startSystem(Phaser.Physics.P2JS);
    
//     game.physics.p2.enable(sprite);
//     cursors = game.input.keyboard.createCursorKeys();
//     game.camera.follow(sprite);
//     // Turn on impact events for the world, without this we get no collision callbacks
//     game.physics.p2.setImpactEvents(true);
//     game.physics.p2.restitution = 0.8;

//     // create our collision groups
//     // var redTeamCollisionGroup = game.physics.p2.createCollisionGroup();
//     // var blueTeamCollisionGroup = game.physics.p2.createCollisionGroup();
//     // var flagCollisionGroup = game.physics.p2.createCollisionGroup();

//     // // We need objects their own collision groups to still collide with the world bounds
//     // game.physics.p2.updateBoundsCollisionGroup();

//     // // set the player's collision group
//     // sprite.body.setCollisionGroup(blueTeamCollisionGroup);

//     // // set the flag's collision group
//     // flag.body.setCollisionGroup(flagCollisionGroup);

//     // // tells what happens when the ship collides with something else
//     // sprite.body.collides([blueTeamCollisionGroup, flagCollisionGroup, redTeamCollisionGroup], madeCollision, this);

//     // // tells what happens when the flag gets run over
//     // flag.body.collides([blueTeamCollisionGroup, redTeamCollisionGroup], madeCollision, this);


// }


// function update() {

//     // this to check the overlap of two items
//     game.physics.arcade.overlap(blueTeam, flagGroup, collisionHandler, null, this);
//     game.physics.arcade.overlap(blueTeam, flagGroup, collisionHandler, null, this);



//     //handles the shield disappearing when boost or shooting is initiated
//     if (fireButton.isDown || boost.isDown)
//     {
//         shield.visible = false;
//     }
//     else
//     {
//         shield.visible = true;
//     }
//     //the firing methods
//     if (fireButton.isDown)
//     {
//         weapon.fire()
//     }
//     else if (fireButton2.isDown)
//     {
//         //this tells weapon2 to shoot at a specific Sprite, in this case, the flag
//         weapon2.fireAtSprite(flag);
//     }
//     //the boost adjustments
//     if (boost.isDown)
//     {
//         sprite.body.maxVelocity.set(600);
//         sprite.body.drag.set(0);
//         shield.body.maxVelocity.set(600);
//         shield.body.drag.set(0);
//     }
//     else
//     {
//         sprite.body.maxVelocity.set(200);
//         sprite.body.drag.set(70);
//         shield.body.maxVelocity.set(200);
//         shield.body.drag.set(70);
//     }
//     if (cursors.up.isDown)
//     {
//         game.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
//         game.physics.arcade.accelerationFromRotation(shield.rotation, 300, shield.body.acceleration);
//     }
//     else
//     {
//         sprite.body.acceleration.set(0);
//         shield.body.acceleration.set(0);
//     }
//     if (cursors.left.isDown)
//     {
//         sprite.body.angularVelocity = -300;
//         shield.body.angularVelocity = -300;
//     }
//     else if (cursors.right.isDown)
//     {
//         sprite.body.angularVelocity = 300;
//         shield.body.angularVelocity = 300;
//     }
//     else
//     {
//         sprite.body.angularVelocity = 0;
//         shield.body.angularVelocity = 0;
//     }
    

//     game.world.wrap(sprite, 16);

//     sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);
//     shield.rotation = game.physics.arcade.moveToPointer(shield, 60, game.input.activePointer, 500);

// }

// // our callback for when a collision is made
// function collisionHandler(){
//     console.log("collision!")
//     flag.loadTexture('blueFlag', 0)
// }

// function blueBulletsFire(){

// }

// function render() {

// }

// // var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, render: render });

// // var circle;
// // var floor;

// // function create() {

// //     circle = new Phaser.Circle(game.world.centerX, 100,64);

// // }

// // function render () {

// //     game.debug.geom(circle,'#cfffff');
// //     game.debug.text('Diameter : '+circle.diameter,50,200);
// //     game.debug.text('Circumference : '+circle.circumference(),50,230);

// // }

// var http = require('http');
// var fs = require('fs');
// //Include the socketio module
// var socketIo = require('socket.io');
// //listen to the server which is listening on port XXXX
// var io = socketIo.listen(server);

// //============================================================
// // -- CREATE A SERVER
// //============================================================
// var server = http.createServer(function(req, res){
//     fs.readFile('index.html', 'utf-8', function(error, data){
//         // console.log(error);
//         // console.log(data);
//         if(error){
//             res.writeHead(500,{'content-type': 'text/html'})
//             res.end(error);
//         }else{
//             res.writeHead(200,{'content-type':'text/html'});
//             res.end(data);
//         }
//     })
// })

// //============================================================
// // -- CREATE A SERVER
// //============================================================

// var socketIo = require('socket.io');

// io.sockets.on('connect',function(socket){
//     console.log(socket.id);

//     console.log('someone has connected via a socket!');
// }); 

// server.listen(8080);
// console.log('listening on port 8080');

// module.exports = router;