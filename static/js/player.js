
Player = function (game, team, position, flag, game_id, id) {
    var r_position1 = [200, 200],
    r_position2 = [200, 450],
    r_position3 = [200, 700],
    r_position3 = [200, 950],
    b_position1 = [1720, 200],
    b_position2 = [1720, 450],
    b_position3 = [1720, 700],
    b_position3 = [1720, 950];
    var red_position = [r_position1, r_position2, r_position3]
    var blue_position = [b_position1, b_position2, b_position3]

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
    this.game = game;
    if(team === 'Blue'){
        this.player = game.add.sprite(blue_position[position][0], blue_position[position][1], 'blue_player', 'blue_team');
        console.log("Drawing a blue guy")
    }else{
        this.player = game.add.sprite(red_position[position][0], red_position[position][1], 'red_player', 'red_team');
    }
    this.player_id = game_id;
    this.unique_id = id;
    this.boost = 0;

    game.physics.p2.enable(this.player);

    this.player.anchor.set(0.5, 0.5);

    this.player.scale.setTo(0.35, 0.35);

 
};
Player.prototype.update = function(who) {
    //it's me
    if(who == 'me'){
        for (var i in this.input) this.cursor[i] = this.input[i];
            this.player.body.setZeroVelocity();
            if (this.cursor.boost){
                this.boost = 300;
            }else{
                this.boost = 0;
            }

            if (this.cursor.up)
            {
                this.player.body.moveUp(300 + this.boost)
            }
            else if (this.cursor.down)
            {
                this.player.body.moveDown(300 + this.boost);
            }

            if (this.cursor.left)
            {
                this.player.body.moveLeft(300 + this.boost);
            }
            else if (this.cursor.right)
            {
                this.player.body.moveRight(300 + this.boost);
            }
        }else{
            // its NOT me

            if(this.player.position.x !== undefined){

                this.player.body.reset(this.player.position.x, this.player.position.y, 100);

            }
        }            
    game.world.wrap(this.player, 16);
 
};

// Player.prototype.fire = function(target) {
//         if (!this.alive) return;
//         if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
//         {
//             this.nextFire = this.game.time.now + this.fireRate;
//             var bullet = this.bullets.getFirstDead();
//             bullet.reset(this.turret.x, this.turret.y);
 
//             bullet.rotation = this.game.physics.arcade.moveToObject(bullet, target, 500);
//         }
// }
 
 
// Player.prototype.kill = function() {
//     this.alive = false;
//     this.tank.kill();
//     this.turret.kill();
//     this.shadow.kill();
// }