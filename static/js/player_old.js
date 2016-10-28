Player = function (game, team, position, flag, game_id, id) {

    var red_position = []
    r_position1 = [200, 200]
    r_position2 = [200, 450]
    r_position3 = [200, 700]
    r_position3 = [200, 950]
    b_position1 = [1720, 200]
    b_position2 = [1720, 450]
    b_position3 = [1720, 700]
    b_position3 = [1720, 950]
    var blue_position = [b_position1, b_position2]

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
        this.player = game.add.sprite(blue_position[position][0], blue_position[position][1], 'blue_player');
    }else{
        this.player = game.add.sprite(red_position[position][0], red_position[position][0], 'red_player');
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
Player.prototype.update = function() {
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
    
    game.world.wrap(this.player, 16);
 
};

// Player.prototype.fire = function(target) {
//         // if (!this.alive) return;
//         // if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
//         // {
//         //     this.nextFire = this.game.time.now + this.fireRate;
//         //     var bullet = this.bullets.getFirstDead();
//         //     bullet.reset(this.turret.x, this.turret.y);
 
//         //     bullet.rotation = this.game.physics.arcade.moveToObject(bullet, target, 500);
//         // }
// }
 
 
Player.prototype.kill = function() {
    // this.alive = false;
    // this.tank.kill();
    // this.turret.kill();
    // this.shadow.kill();
}

    