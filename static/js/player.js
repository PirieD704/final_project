// var red_team = {
//     sprite: game.load.image('player', '/static/images/player_1.png'),
//     particle: game.load.image('particle', '/static/images/green_particle.png'),
//     team: 'blue'
// }

// var blue_team = {
//     sprite: game.load.image('player', '/static/images/player_1.png'),
//     particle: game.load.image('particle', '/static/images/green_particle.png'),
//     team: 'red'
// }

Player = function (game, team, position, flag, game_id, id) {

    var red_position = [[960, 960]]
    var blue_position = [[900, 900]]

    // cursors = game.input.keyboard.createCursorKeys();
    this.cursor = {
        left:false,
        right:false,
        up:false,
        fire:false,
        boost: false
    }

    this.input = {
        left:false,
        right:false,
        up:false,
        fire:false,
        boost: false
    }

    this.alive = true;

    // var x = 0;
    // var y = 0;

    this.game = game;
    // this.health = 30;
    if(team === 'blue'){
        this.player = game.add.sprite(blue_position[position][0], blue_position[position][0], 'blue_player');
    }else{
        this.player = game.add.sprite(red_position[position][0], red_position[position][1], 'red_player');
    }
    this.player_id = game_id;
    this.unique_id = id;
    // this.team = team.team
    this.player_shield = game.add.sprite(blue_position[position][0], blue_position[position][0], 'shield');
    game.physics.enable(this.player, Phaser.Physics.ARCADE);
    game.physics.enable(this.player_shield, Phaser.Physics.ARCADE);
    this.player.body.drag.set(70);
    this.player.body.maxVelocity.set(200);
    this.player_shield.body.drag.set(70);
    this.player_shield.body.maxVelocity.set(200);
    this.player.anchor.set(0.5, 0.5);
    this.player_shield.anchor.set(0.45, 0.5);
    this.player.scale.setTo(0.35, 0.35);
 
};
Player.prototype.update = function() {
    for (var i in this.input) this.cursor[i] = this.input[i];

    if (this.cursor.up)
    {
        game.physics.arcade.accelerationFromRotation(this.player.rotation, 300, this.player.body.acceleration);
        game.physics.arcade.accelerationFromRotation(this.player_shield.rotation, 300, this.player_shield.body.acceleration);
    }
    else
    {
        this.player.body.acceleration.set(0);
        this.player_shield.body.acceleration.set(0);
    }
    if (this.cursor.left)
    {
        this.player.body.angularVelocity = -300;
        this.player_shield.body.angularVelocity = -300;
    }
    else if (this.cursor.right)
    {
        this.player.body.angularVelocity = 300;
        this.player_shield.body.angularVelocity = 300;
    }
    else
    {
        this.player.body.angularVelocity = 0;
        this.player_shield.body.angularVelocity = 0;
    }

    // if (this.cursors.up.isDown)
    // {
    //     game.physics.arcade.accelerationFromRotation(this.player.rotation, 300, sprite.body.acceleration);
    //     game.physics.arcade.accelerationFromRotation(this.shield.rotation, 300, shield.body.acceleration);
    // }
    // else
    // {
    //     this.player.body.acceleration.set(0);
    //     this.shield.body.acceleration.set(0);
    // }
    // if (this.cursors.left.isDown)
    // {
    //     this.player.body.angularVelocity = -300;
    //     this.shield.body.angularVelocity = -300;
    // }
    // else if (this.cursors.right.isDown)
    // {
    //     this.player.body.angularVelocity = 300;
    //     this.shield.body.angularVelocity = 300;
    // }
    // else
    // {
    //     this.player.body.angularVelocity = 0;
    //     this.shield.body.angularVelocity = 0;
    // }

    // this.player.rotation = game.physics.arcade.moveToPointer(this.player, 60, game.input.activePointer, 500);
    // this.shield.rotation = game.physics.arcade.moveToPointer(this.shield, 60, game.input.activePointer, 500);
        
    // for (var i in this.input) this.cursor[i] = this.input[i];    
    
    
    
    // if (this.cursor.left)
    // {
    //     this.tank.angle -= 1;
    // }
    // else if (this.cursor.right)
    // {
    //     this.tank.angle += 1;
    // }    
    // if (this.cursor.up)
    // {
    //     //  The speed we'll travel at
    //     this.currentSpeed = 300;
    // }
    // else
    // {
    //     if (this.currentSpeed > 0)
    //     {
    //         this.currentSpeed -= 4;
    //     }
    // }
    // if (this.cursor.fire)
    // {    
    //     this.fire({x:this.cursor.tx, y:this.cursor.ty});
    // }
    
    
    
    // if (this.currentSpeed > 0)
    // {
    //     game.physics.arcade.velocityFromRotation(this.tank.rotation, this.currentSpeed, this.tank.body.velocity);
    // }    
    // else
    // {
    //     game.physics.arcade.velocityFromRotation(this.tank.rotation, 0, this.tank.body.velocity);
    // }    
    this.player.rotation = game.physics.arcade.moveToPointer(this.player, 60, game.input.activePointer, 500);
    this.player_shield.rotation = game.physics.arcade.moveToPointer(this.player_shield, 60, game.input.activePointer, 500);
    
    game.world.wrap(this.player, 16);
 
};

Player.prototype.fire = function(target) {
        // if (!this.alive) return;
        // if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        // {
        //     this.nextFire = this.game.time.now + this.fireRate;
        //     var bullet = this.bullets.getFirstDead();
        //     bullet.reset(this.turret.x, this.turret.y);
 
        //     bullet.rotation = this.game.physics.arcade.moveToObject(bullet, target, 500);
        // }
}
 
 
Player.prototype.kill = function() {
    // this.alive = false;
    // this.tank.kill();
    // this.turret.kill();
    // this.shadow.kill();
}

    // //  We call the Phaser.Sprite passing in the game reference
    // //  We're giving it a random X/Y position here, just for the sake of this demo - you could also pass the x/y in the constructor
    // Phaser.Sprite.call(this, game, game.world.randomX, game.world.randomY, 'player');

    // this.anchor.setTo(0.5, 0.5);



    // var randomScale = 0.1 + Math.random();

    // this.scale.setTo(0.35, 0.35)

    // game.add.existing(this);

// };

// Player.prototype = Object.create(Phaser.Sprite.prototype);
// Player.prototype.constructor = Player;

// Player.prototype.update = function() {

//     //  Automatically called by World.update
//     this.angle += this.rotateSpeed;

// };

// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

// function preload() {

//     game.load.image('bunny', 'assets/sprites/bunny.png');

// }

// function create() {

//     for (var i = 0.1; i < 2; i += 0.1)
//     {
//         new MonsterBunny(game, i);
//     }

// }

// function update () {
    
//     player.input.left = cursors.left.isDown;
//     player.input.right = cursors.right.isDown;
//     player.input.up = cursors.up.isDown;
//     player.input.fire = game.input.activePointer.isDown;
//     player.input.tx = game.input.x+ game.camera.x;
//     player.input.ty = game.input.y+ game.camera.y;
    
    
    
//     turret.rotation = game.physics.arcade.angleToPointer(turret);   
//     land.tilePosition.x = -game.camera.x;
//     land.tilePosition.y = -game.camera.y;

//     for (var i in tanksList)
//     {
//         if (!tanksList[i]) continue;
//         var curBullets = tanksList[i].bullets;
//         var curTank = tanksList[i].tank;
//         for (var j in tanksList)
//         {
//             if (!tanksList[j]) continue;
//             if (j!=i) 
//             {
            
//                 var targetTank = tanksList[j].tank;
                
//                 game.physics.arcade.overlap(curBullets, targetTank, bulletHitPlayer, null, this);
            
//             }
//             if (tanksList[j].alive)
//             {
//                 tanksList[j].update();
//             }           
//         }
//     }
// }