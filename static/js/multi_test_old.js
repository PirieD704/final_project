
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: update, render:render });
var myId = 1;

var sprite, blueTeamList, redTeamList, blueBulletList, redBullletList, weapon, weapon2, cursors, fireButton, fireButton2, boost, land;
var redTotal, blueTotal = 0;


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

    playerList = {};
	land = game.add.tileSprite(0, 0, 1920, 1920, 'background');
    //only makes one player
    //we need to loop through who is present to make the mulitple players.
    this_player = new Player(game, 'blue', 0)
    playerList[myId] = this_player;
    weapon = this_player.laser;
    weapon2 = this_player.flare;
    // console.log(this_player.player_shield)

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
    cursors = game.input.keyboard.createCursorKeys();
    game.camera.follow(sprite);

}

function update() {

    this_player.input.up = cursors.up.isDown;
    this_player.input.left = cursors.left.isDown;
    this_player.input.right = cursors.right.isDown;


    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

    for (var i in playerList)
    {
        if (!playerList[i]) continue;
        for (var j in playerList)
        {
            if (playerList[j].alive)
            {
                playerList[j].update();
            }           
        }
    }

}

function render() {

}