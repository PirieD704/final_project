var sprite, flag, playerList, flagGroup, player, cursors, fireButton, flareButton, boost, land, timer, timerEvent, winner;
var redTotal, blueTotal = 0;

var flag_x, flag_y = 800;

var x;

var Game = {
    preload: function() {

        console.log(game.stage);

        game.load.image('background', 'static/images/background.png');
        game.load.image('particle', 'static/images/green_particle.png');
        game.load.image('flare', 'static/images/flare.png');
        game.load.image('red_player', 'static/images/red_orb.png');
        game.load.image('blue_player', 'static/images/blue_orb.png');
        game.load.image('player', 'static/images/player_1.png');
        game.load.image('flag', 'static/images/flag_orb_unclaimed.png');
        game.load.image('red_flag', 'static/images/flag_orb_red.png');
        game.load.image('blue_flag', 'static/images/flag_orb_blue.png');
        game.load.image('shield', 'static/images/shield_fp.png');
        game.stage.disableVisibilityChange = false;
        x = game.stage.checkVisibility();
        console.log(x)
        game.stage.disableVisibilityChange = true;
    },

    create: function() {
        console.log("Creating...")
        playersPresent = {};
        other_players = [];

        land = game.add.tileSprite(0, 0, 2000, 2000, 'background');

        game.physics.startSystem(Phaser.Physics.P2JS);

        //  Create our Timer
        timer = game.time.create();

        //  Set a TimerEvent to occur after 2 seconds
        timerEvent = timer.add(Phaser.Timer.MINUTE * 1 + Phaser.Timer.SECOND * 30, this.endTimer, this);

        //  It won't start automatically, allowing you to hook it to button events and the like.
        timer.start();

        flag = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'flag');
        flag.scale.setTo(0.35, 0.35);
        this.game.time.events.loop(3100, function() {  
            this.game.add.tween(flag).to({
                x: flag_x, 
                y: flag_y}, 
                3000, 
                Phaser.Easing.Quadratic.InOut, 
                true);
        }, 
            this)
        console.log(playerList);
        for (i in playerList){
            playersPresent[i] = new Player(game, playerList[i].team, i, flag, i, playerList[i].socketID);
            playersPresent[i].visible = true;
            // myId = playerList[i].socketID;
            console.log("my ID: ",myId)
        }

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
        console.log(player.player.rotation)
        // console.log(other_players)
        // console.log(sprite)
        // console.log(playersPresent);
        // weapon = player.laser;
        // weapon2 = player.flare;
        // console.log(this_player.player_shield)

        fireButton = this.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        flareButton = this.input.keyboard.addKey(Phaser.KeyCode.F);
        boost = this.input.keyboard.addKey(Phaser.KeyCode.SHIFT);

        sprite.anchor.set(0.5, 0.5);
        // shield.anchor.set(0.5);
        flagGroup = game.add.group();
        flagGroup.enableBody = true;
        flagGroup.physicsBodyType = Phaser.Physics.ARCADE;

        // add flag to flag group
        flagGroup.add(flag);

        game.world.setBounds(0, 0, 2000, 2000);
        game.physics.startSystem(Phaser.Physics.P2JS);
        
        cursors = game.input.keyboard.createCursorKeys();

        // other_cursors = game.input.keyboard.createCursorKeys();

        //camera follows players / center
        game.camera.follow(sprite);

        console.log("Done Creating.")

    },
    update: function(){
        this.updateLand();
        this.updateMe();
        this.updateFlag();
        this.flagPossession();
        this.ping();
    },
    updateLand: function() {

        land.tilePosition.x = -game.camera.x;
        land.tilePosition.y = -game.camera.y;

    },
    updateMe: function() {
        if(player.alive){
            player.input.up = cursors.up.isDown;
            player.input.down = cursors.down.isDown;
            player.input.left = cursors.left.isDown;
            player.input.right = cursors.right.isDown;
            // player.input.laser = fireButton.isDown;
            player.input.flare = flareButton.isDown;
            player.input.blaster = fireButton.isDown;
            player.input.boost = boost.isDown;
            player.update('me');
            for(i in other_players){
                other_players[i].update('other');
            }
        }

    },
    checkOverlap: function(spriteA, spriteB) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();

        return Phaser.Rectangle.intersects(boundsA, boundsB);

    },
    flagPossession: function(){
        for(i in playersPresent){
            if(this.checkOverlap(playersPresent[i].player, flag)){
                flag.loadTexture(playersPresent[i].team_flag);
                socket.emit('flag_changed', {
                    flag_color: playersPresent[i].team_flag
                })
            }
        }
    },
    updateFlag: function(){
      if((flag.x == flag_x) && (flag.y == flag_y)){
        socket.emit('get_coord', {
            flag_x: flag_x,
            flag_y: flag_x
        })
        console.log('new coords for flag')
      }  
    },
    ping: function(){
        // console.log("This is the player.object: " + player.player);
        socket.emit('ping', {
            id: myId,
            playerX: player.player.position.x,
            playerY: player.player.position.y,
            playerRotation: player.player.rotation
        })
        // console.log(player.player.rotation);
    },
    render: function() {
        if (timer.running) {
            game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 2, 14, "#ff0");
        }
        else {
            if(flag.key == 'red_flag'){
                winner = 'Red Team!';
                game.state.start('Game_Over');
            }else if(flag.key == 'blue_flag'){
                winner = 'Blue Team!';
                game.state.start('Game_Over');
            }else{
                winner = 'No One!';
                game.state.start('Game_Over');
            }
        }
    },
    endTimer: function() {
        // Stop the timer when the delayed event triggers
        console.log('stop');
        timer.stop();
    },
    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    }
}