Player = function (index, game, player, ) {

    this.cursor = {
        left:false,
        right:false,
        up:false,
        fire:false
    }

    this.input = {
        left:false,
        right:false,
        up:false,
        fire:false
    }

    var x = 0;
    var y = 0;

    this.game = game;
    this.health = 30;
    this.player = player;
    this.player_shield = game.add.sprite(game.world.centerX, game.world.centerY, 'shield');
    //weapon one, particle
    this.weapon = game.add.group();
    this.weapon.enableBody = true;
    this.weapon.physicsBodyType = Phaser.Physics.ARCADE;
    this.weapon.createMultiple(80, 'particle', 0, false);
    this.weapon.setAll('anchor.x', 0.5);
    this.weapon.setAll('anchor.y', 0.5);
    this.weapon.setAll('outOfBoundsKill', true);
    this.weapon.setAll('checkWorldBounds', true);
    //weapon two, flare 
    this.weapon2 = game.add.group();
    this.weapon2.enableBody = true;
    this.weapon2.physicsBodyType = Phaser.Physics.ARCADE;
    this.weapon2.createMultiple(10, 'flare', 0, false);
    this.weapon2.setAll('anchor.x', 0.5);
    this.weapon2.setAll('anchor.y', 0.5);
    this.weapon2.setAll('outOfBoundsKill', true);
    this.weapon2.setAll('checkWorldBounds', true);  

    // this.currentSpeed = 0;
    // this.fireRate = 500;
    // this.nextFire = 0;
    // this.alive = true;

    // this.shadow = game.add.sprite(x, y, 'enemy', 'shadow');
    // this.tank = game.add.sprite(x, y, 'enemy', 'tank1');
    // this.turret = game.add.sprite(x, y, 'enemy', 'turret');

    // this.shadow.anchor.set(0.5);
    // this.tank.anchor.set(0.5);
    // this.turret.anchor.set(0.3, 0.5);

    // this.tank.id = index;
    // game.physics.enable(this.tank, Phaser.Physics.ARCADE);
    // this.tank.body.immovable = false;
    // this.tank.body.collideWorldBounds = true;
    // this.tank.body.bounce.setTo(0, 0);
 
    // this.tank.angle = 0;

    // game.physics.arcade.velocityFromRotation(this.tank.rotation, 0, this.tank.body.velocity);
 
};
Player.prototype.update = function() {
        
    for (var i in this.input) this.cursor[i] = this.input[i];    
    
    
    
    if (this.cursor.left)
    {
        this.tank.angle -= 1;
    }
    else if (this.cursor.right)
    {
        this.tank.angle += 1;
    }    
    if (this.cursor.up)
    {
        //  The speed we'll travel at
        this.currentSpeed = 300;
    }
    else
    {
        if (this.currentSpeed > 0)
        {
            this.currentSpeed -= 4;
        }
    }
    if (this.cursor.fire)
    {    
        this.fire({x:this.cursor.tx, y:this.cursor.ty});
    }
    
    
    
    if (this.currentSpeed > 0)
    {
        game.physics.arcade.velocityFromRotation(this.tank.rotation, this.currentSpeed, this.tank.body.velocity);
    }    
    else
    {
        game.physics.arcade.velocityFromRotation(this.tank.rotation, 0, this.tank.body.velocity);
    }    
    
    
    
    this.shadow.x = this.tank.x;
    this.shadow.y = this.tank.y;
    this.shadow.rotation = this.tank.rotation;
 
    this.turret.x = this.tank.x;
    this.turret.y = this.tank.y;
};

Player.prototype.fire = function(target) {
        if (!this.alive) return;
        if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
        {
            this.nextFire = this.game.time.now + this.fireRate;
            var bullet = this.bullets.getFirstDead();
            bullet.reset(this.turret.x, this.turret.y);
 
            bullet.rotation = this.game.physics.arcade.moveToObject(bullet, target, 500);
        }
}
 
 
Player.prototype.kill = function() {
    this.alive = false;
    this.tank.kill();
    this.turret.kill();
    this.shadow.kill();
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

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bunny', 'assets/sprites/bunny.png');

}

function create() {

    for (var i = 0.1; i < 2; i += 0.1)
    {
        new MonsterBunny(game, i);
    }

}

function update () {
    
    player.input.left = cursors.left.isDown;
    player.input.right = cursors.right.isDown;
    player.input.up = cursors.up.isDown;
    player.input.fire = game.input.activePointer.isDown;
    player.input.tx = game.input.x+ game.camera.x;
    player.input.ty = game.input.y+ game.camera.y;
    
    
    
    turret.rotation = game.physics.arcade.angleToPointer(turret);   
    land.tilePosition.x = -game.camera.x;
    land.tilePosition.y = -game.camera.y;

    for (var i in tanksList)
    {
        if (!tanksList[i]) continue;
        var curBullets = tanksList[i].bullets;
        var curTank = tanksList[i].tank;
        for (var j in tanksList)
        {
            if (!tanksList[j]) continue;
            if (j!=i) 
            {
            
                var targetTank = tanksList[j].tank;
                
                game.physics.arcade.overlap(curBullets, targetTank, bulletHitPlayer, null, this);
            
            }
            if (tanksList[j].alive)
            {
                tanksList[j].update();
            }           
        }
    }
}