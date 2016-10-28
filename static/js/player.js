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
    var blue_position = [[10, 10]]

    // cursors = game.input.keyboard.createCursorKeys();
    this.cursor = {
        left:false,
        right:false,
        up:false,
        down:false,
        fire:false,
        boost: false
    }

    this.input = {
        left:false,
        right:false,
        up:false,
        down:false,
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
        console.log("Drawing a blue guy")
    }else{
        this.player = game.add.sprite(red_position[position][0], red_position[position][1], 'red_player');
    }
    this.player_id = game_id;
    this.unique_id = id;
    // this.team = team.team
    // this.player_shield = game.add.sprite(blue_position[position][0], blue_position[position][0], 'shield');
    

    game.physics.p2.enable(this.player);
    

    // game.physics.p2.enable(this.player_shield);
    // this.player.body.drag.set(70);
    // this.player.body.maxVelocity.set(200);
    // this.player_shield.body.drag.set(70);
    // this.player_shield.body.maxVelocity.set(200);
    this.player.anchor.set(0.5, 0.5);
    // this.player_shield.anchor.set(0.45, 0.5);
    this.player.scale.setTo(0.35, 0.35);
    // this.cursor = game.input.keyboard.createCursorKeys();
 
};
Player.prototype.update = function(who) {
    //it's me
    if(who == 'me'){
        // this.game.physics.arcade.moveToXY(this, this.x, this.y)
        for (var i in this.input) this.cursor[i] = this.input[i];
            this.player.body.setZeroVelocity();
            if (this.cursor.up)
            {
                this.player.body.moveUp(300)
            }
            else if (this.cursor.down)
            {
                this.player.body.moveDown(300);
            }

            if (this.cursor.left)
            {
                this.player.body.moveLeft(300);
            }
            else if (this.cursor.right)
            {
                this.player.body.moveRight(300);
            }
        }else{
            // its NOT me
            // this.player.body.setZeroVelocity();
            // console.log(this.player.body);
            if(this.x !== undefined){
                this.player.body.reset(this.x, this.y)
            }
            // this.game.physics.arcade.moveToXY(this.player, this.x, this.y)
        }
    // console.log(this)
    // this.game.physics.arcade.moveToXY(this.player, this.x, this.y)
    // console.log("huh")
    // this.game.physics.arcade.moveToXY(
    //                 this.player, //sprite reference 
    //                 this.player.body.x + 150, // target x position
    //                 Phaser.Math.snapTo(this.player.body.y, 70), 100 
    //             );                
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