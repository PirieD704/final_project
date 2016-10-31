
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
    console.log("Creating...")
    playersPresent = {};
    other_players = [];

	land = game.add.tileSprite(0, 0, 1920, 1920, 'background');

    // game.physics.startSystem(Phaser.Physics.P2JS);
    for (i in playerList){
        console.log(playerList)
        playersPresent[i] = new Player(game, playerList[i].team, i, flag, i, playerList[i].socketID);
        myId = playerList[i].socketID;
        console.log(myId)
    }
    // sprite = new Player(game, playerList[i].team, i, flag, i, playerList[i].socketID);
    flag = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'flag');this.game.time.events.loop(2000, function() {  this.game.add.tween(flag).to({x: this.game.world.randomX, y: this.game.world.randomY}, 3000, Phaser.Easing.Quadratic.InOut, true);}, this)
    flag.scale.setTo(0.35, 0.35);
    // console.log(playerList);
    // if (playerList.length != 0){
    //     for (i in playerList){
    //         playersPresent[i] = new Player(game, playerList[i].team, i, flag, i, playerList[i].socketID);
    //         // myId = playerList[i].socketID;
    //         // console.log(myId)
    //     }
    //     // console.log(playersPresent);
    // }else{
    //     console.log('no players')
    // }

    for (i in playersPresent){
        console.log(playersPresent[i].unique_id, myId)
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
    // console.log(player)
    // console.log(other_players)
    // console.log(sprite)
    // console.log(playersPresent);
    // weapon = player.laser;
    // weapon2 = player.flare;
    // console.log(this_player.player_shield)

    // fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
    // fireButton2 = this.input.keyboard.addKey(Phaser.KeyCode.F);
    // boost = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT);

    // sprite.anchor.set(0.5);
    // shield.anchor.set(0.5);

    flagGroup = game.add.group();
    flagGroup.enableBody = true;

    // add flag to flag group
    flagGroup.add(flag);

    game.world.setBounds(0, 0, 1920, 1920);
    cursors = game.input.keyboard.createCursorKeys();



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
        player.update('me');
        for(i in other_players){
            other_players[i].update('other');
        }
    }

}

function ping(){
    // console.log(player.player.position.x)
    socket.emit('ping', {
        id: myId,
        playerX: player.player.x,
        playerY: player.player.y
    })
}
//put in controller
function updateAll(){
    updateLand();
    updateMe();
    // ping();
}


function render() {

}