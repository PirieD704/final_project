
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas', { preload: preload, create: create, update: updateAll, render:render });

var sprite, flag, weapon, weapon2, playerList, blueTeam, redTeam, flagGroup, player, cursors, fireButton, fireButton2, boost, land;
var redTotal, blueTotal = 0;

function preload() {

	game.load.image('background', '/static/images/background.png');
	game.load.image('particle', '/static/images/green_particle.png');
    game.load.image('flare', '/static/images/flare.png');
    game.load.image('red_player', '/static/images/red_orb.png');
    game.load.image('blue_player', '/static/images/blue_orb.png');
    game.load.image('player', '/static/images/player_1.png');
    game.load.image('flag', '/static/images/unclaimed_flag.png');
    game.load.image('shield', '/static/images/shield_fp.png');

}

function create() {

    playersPresent = {};
    other_players = [];

	land = game.add.tileSprite(0, 0, 1920, 1920, 'background');

    game.physics.startSystem(Phaser.Physics.P2JS);

    flag = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'flag');this.game.time.events.loop(2000, function() {  this.game.add.tween(flag).to({x: this.game.world.randomX, y: this.game.world.randomY}, 3000, Phaser.Easing.Quadratic.InOut, true);}, this)
    flag.scale.setTo(0.35, 0.35);
    if (playerList.length != 0){
        for (i in playerList){
            playersPresent[i] = new Player(game, 'blue', 0, flag, i, playerList[i].socketID);
            myId = playerList[i].socketID;
            console.log(playerList[i].socketID)
        }
    }else{
        console.log('no players')
    }
    for (i in playersPresent){
        if (playersPresent[i].unique_id == myId){
            console.log('i ran');
            sprite = playersPresent[i].player;
            // shield = playersPresent[i].shield;
            player = playersPresent[i];
        }else{
            other_player = playersPresent[i]
            other_players.push(other_player);
        }
    }
    console.log(player)
    console.log(other_players)
    console.log(sprite)
    // weapon = player.laser;
    // weapon2 = player.flare;
    // console.log(this_player.player_shield)

    fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    fireButton2 = this.input.keyboard.addKey(Phaser.KeyCode.F);
    boost = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT);

    // sprite.anchor.set(0.5);
    // shield.anchor.set(0.5);

    // creat our team and flag groups
    // blueTeam = game.add.group();
    // blueTeam.enableBody = true;
    // blueTeam.physicsBodyType = Phaser.Physics.ARCADE;
    // redTeam = game.add.group();
    // redTeam.enableBody = true;
    // redTeam.physicsBodyType = Phaser.Physics.ARCADE;
    flagGroup = game.add.group();
    flagGroup.enableBody = true;
    flagGroup.physicsBodyType = Phaser.Physics.ARCADE;

    // add sprite to a team
    // blueTeam.add(sprite);

    // add flag to flag group
    flagGroup.add(flag);

    game.world.setBounds(0, 0, 1920, 1920);
    game.physics.startSystem(Phaser.Physics.P2JS);
    
    // game.physics.p2.enable(sprite);
    cursors = game.input.keyboard.createCursorKeys();

    // other_cursors = game.input.keyboard.createCursorKeys();

    //camera follows players / center
    game.camera.follow(sprite);

}

function updateLand() {

    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

}

function updateMe() {
    if(player.alive){
        player.input.up = cursors.up.isDown;
        player.input.down = cursors.down.isDown;
        player.input.left = cursors.left.isDown;
        player.input.right = cursors.right.isDown;
        // player.input.laser = fireButton.isDown;
        player.input.flare = fireButton2.isDown;
        player.input.boost = boost.isDown;
        player.update();
    }

}

//work in progress for tracking other people's movements.
function updateOthers() {
    for(i in other_players){
        if(other_players[i].other_player.alive){
            other_players[i].other_player
            other_player.input.left = cursors.left.isDown;
            other_player.input.right = cursors.right.isDown;
            other_player.input.laser = fireButton.isDown;
            other_player.input.flare = fireButton2.isDown;
            other_player.input.boost = boost.isDown;
            other_player.update();
        }
    }

}

// socket.on("pong", function(data){
//     for(i in playersPresent)
//         if(playersPresent[i].alive){
//             if(playersPresent[i].id == myId){
//                 playersPresent[i].player.position.x = data.playerX;
//                 playersPresent[i].player.position.y = data.playerY;
//                 playersPresent[i].player_shield.position.x = data.shieldX;
//                 playersPresent[i].player_shield.position.y = data.shieldY;              
//             }
//         }
// });

// our callback for when a collision is made
// function collisionHandler(){
//     console.log("collision!")
//     flag.loadTexture('blueFlag', 0)
// }

function ping(){
    console.log(player.player.position.x)
    socket.emit('ping', {
        id: myId,
        playerX: player.player.position.x,
        playerY: player.player.position.y,
        message: 'i moved'
    })
}
//put in controller
function updateAll(){
    updateLand();
    updateMe();
    ping();
}


function render() {

}