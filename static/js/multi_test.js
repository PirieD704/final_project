
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update, render:render });
var myId = 1;

var sprite, blueTeamList, redTeamList, blueBulletList, redBullletList, weapon, weapon2, cursors, fireButton, fireButton2, boost;
var redTotal, blueTotal = 0;

// Player = function (id, game, team) {

//     cursors = game.input.keyboard.createCursorKeys();
//     this.cursor = {
//         left:false,
//         right:false,
//         up:false,
//         fire:false
//     }

//     this.input = {
//         left:false,
//         right:false,
//         up:false,
//         fire:false
//     }

//     var x = 0;
//     var y = 0;

//     this.game = game;
//     this.health = 30;
//     this.player = team.sprite;
//     this.player.id = id;
//     this.team = team.team
//     this.player_shield = game.add.sprite(game.world.centerX, game.world.centerY, 'shield');
// };

function preload() {

	game.load.image('background', '/static/images/background.png');
	game.load.image('particle', '/static/images/green_particle.png');
    game.load.image('flare', '/static/images/flare.png');
    game.load.image('red_player', '/static/images/red_orb.png');
    game.load.image('blue_player', '/static/images/blue_orb.png');
    game.load.image('player', '/static/images/player_1.png');
    game.load.image('flag', '/static/images/unclaimed_flag.png');
    game.load.image('shield', '/static/images/shield_final_project.png');

}

function create() {

	game.add.tileSprite(0, 0, 1920, 1920, 'background');
     // Creates 30 bullets, using the 'bullet' graphic
    // weapon = game.add.weapon(30, 'particle');
    // weapon2 = game.add.weapon(1, 'flare');
    // weapon2.scale.setTo(0.35, 0.35);

    // blueTeamList, redTeamList = {};
    // player = new Player(myId, game, blue_team);
    // sprite = player.sprite;
    // weapon = player.weapon;
    // weapon2 = player.weapon2;


    //  The bullets will be automatically killed when they are 2000ms old
    // weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    // weapon.bulletLifespan = 2000;
    // weapon2.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    // weapon2.bulletLifespan = 1200;

    //  The speed at which the bullet is fired
    // weapon.bulletSpeed = 700;
    // weapon2.bulletSpeed = 300;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    // weapon.fireRate = 300;
    // weapon2.fireRate = 300;

    //  Wrap bullets around the world bounds to the opposite side
    // weapon.bulletWorldWrap = true;
    // player_orb = this.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this_player = new Player(game, 'blue', 0)
    console.log(typeof(this_player))
    console.log(this_player)

    sprite = this_player.player;
    shield = this_player.shield;
    // flag = game.add.sprite(game.world.centerX, game.world.centerY, 'flag');
    // flag = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'flag');this.game.time.events.loop(2000, function() {  this.game.add.tween(flag).to({x: this.game.world.randomX, y: this.game.world.randomY}, 3000, Phaser.Easing.Quadratic.InOut, true);}, this)
    // flag.scale.setTo(0.35, 0.35);
    sprite.scale.setTo(0.35, 0.35);

    // sprite.anchor.set(0.5);
    // shield.anchor.set(0.5);

    // game.physics.arcade.enable(sprite);
    // game.physics.arcade.enable(shield);

    // sprite.body.drag.set(70);
    // sprite.body.maxVelocity.set(200);
    // shield.body.drag.set(70);
    // shield.body.maxVelocity.set(200);

    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    // weapon.trackSprite(sprite, 0, 0, true);
    // weapon2.trackSprite(sprite, 0, 0, true);

    // cursors = this.input.keyboard.createCursorKeys();

    // fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    // fireButton2 = this.input.keyboard.addKey(Phaser.KeyCode.F);
    // boost = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT);

    //
	//cursor follow arrow
	//
    // game.physics.startSystem(Phaser.Physics.ARCADE);

    // game.stage.backgroundColor = '#0072bc';

    // sprite = game.add.sprite(400, 300, 'arrow');
    // sprite.anchor.setTo(0.5, 0.5);
    // shield.anchor.setTo(0.45, 0.5);

    //  Enable Arcade Physics for the sprite
    // game.physics.enable(sprite, Phaser.Physics.ARCADE);
    // game.physics.enable(shield, Phaser.Physics.ARCADE);

    //  Tell it we don't want physics to manage the rotation
    // sprite.body.allowRotation = false;

    //camera follows players / center

    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
    
    // game.physics.p2.enable(sprite);
    // cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(sprite);

}

function update() {
    //handles the shield disappearing when boost or shooting is initiated
    // if (fireButton.isDown || boost.isDown)
    // {
    //     shield.visible = false;
    // }
    // else
    // {
    //     shield.visible = true;
    // }
    // //the firing methods
    // if (fireButton.isDown)
    // {
    //     weapon.fire();
    // }
    // else if (fireButton2.isDown)
    // {
    //     //this tells weapon2 to shoot at a specific Sprite, in this case, the flag
    //     weapon2.fireAtSprite(flag);
    // }
    // //the boost adjustments
    // if (boost.isDown)
    // {
    //     sprite.body.maxVelocity.set(600);
    //     sprite.body.drag.set(0);
    //     shield.body.maxVelocity.set(600);
    //     shield.body.drag.set(0);
    // }
    // else
    // {
    //     sprite.body.maxVelocity.set(200);
    //     sprite.body.drag.set(70);
    //     shield.body.maxVelocity.set(200);
    //     shield.body.drag.set(70);
    // }
    // if (cursors.up.isDown)
    // {
    //     game.physics.arcade.accelerationFromRotation(sprite.rotation, 300, sprite.body.acceleration);
    //     game.physics.arcade.accelerationFromRotation(shield.rotation, 300, shield.body.acceleration);
    // }
    // else
    // {
    //     sprite.body.acceleration.set(0);
    //     shield.body.acceleration.set(0);
    // }
    // if (cursors.left.isDown)
    // {
    //     sprite.body.angularVelocity = -300;
    //     shield.body.angularVelocity = -300;
    // }
    // else if (cursors.right.isDown)
    // {
    //     sprite.body.angularVelocity = 300;
    //     shield.body.angularVelocity = 300;
    // }
    // else
    // {
    //     sprite.body.angularVelocity = 0;
    //     shield.body.angularVelocity = 0;
    // }
    

    // game.world.wrap(sprite, 16);

    // sprite.rotation = game.physics.arcade.moveToPointer(sprite, 60, game.input.activePointer, 500);
    // shield.rotation = game.physics.arcade.moveToPointer(shield, 60, game.input.activePointer, 500);

}

function render() {

}