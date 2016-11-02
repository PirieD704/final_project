
Player = function (game, team, position, flag, game_id, id) {
    var r_position1 = [200, 200],
    r_position2 = [200, 450],
    r_position3 = [200, 700],
    r_position4 = [200, 950],
    b_position1 = [1720, 200],
    b_position2 = [1720, 450],
    b_position3 = [1720, 700],
    b_position4 = [1720, 950];
    var red_position = [r_position1, r_position2, r_position3]
    var blue_position = [b_position1, b_position2, b_position3]

    this.cursor = {
        left:false,
        right:false,
        up:false,
        down:false,
        flare:false,
        blaster:false,
        boost: false
    }

    this.input = {
        left:false,
        right:false,
        up:false,
        down:false,
        flare:false,
        blaster:false,
        boost: false
    }

    this.alive = true;
    this.game = game;
    if(team === 'Blue'){
        this.player = game.add.sprite(blue_position[position][0], blue_position[position][1], 'blue_player', 'blue_team');
        this.team_flag = 'blue_flag';
        console.log("Drawing a blue guy")
    }else{
        this.player = game.add.sprite(red_position[position][0], red_position[position][1], 'red_player', 'red_team');
        this.team_flag = 'red_flag';
    }
    this.player.scale.setTo(0.35, 0.35);

    this.player.anchor.set(0.5, 0.5);

    game.physics.p2.enable(this.player);
    this.player_id = game_id;
    this.unique_id = id;
    this.lifespan = 5;
    this.maxHealth = 5;
    this.health = 5;
    this.flare = game.add.weapon(10, 'flare');
    this.flare.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.flare.bulletLifespan = 1000;
    this.flare.bulletSpeed = 300;
    this.flare.fireRate = 300;
    this.flare.trackSprite(this.player, 0, 0, true);
    //This will be the main weapon
    this.blaster = game.add.weapon(30, 'particle');
    this.blaster.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    this.blaster.bulletSpeed = 900;
    this.blaster.fireRate = 80;
    this.blaster.trackSprite(this.player, 0, 0);
    // this.blaster.fireAngle = (this.player.rotation * (180/Math.PI));
    console.log(this.player);
    this.boost = 0;
    this.boostTurn = 0;



};
Player.prototype.update = function(who) {
    //it's me
    if(who == 'me'){
        for (var i in this.input) this.cursor[i] = this.input[i];
            // this.player.body.setZeroVelocity();
            this.player.body.velocity.x = 0;
            this.player.body.velocity.y = 0;
            this.player.body.angularVelocity = 0;
            if (this.cursor.boost){
                this.boost = 300;
                this.boostTurn = 70;
            }else{
                this.boost = 0;
                this.boostTurn = 0;

            }
            if(this.cursor.flare){
                this.flare.fireAtSprite(flag);
            }
            if(this.cursor.blaster){
                this.blaster.fireAngle = this.player.angle - 90;
                this.blaster.fire();
            }

            if (this.cursor.left)
            {
                // allows the player to turn left.  This is reset by reseting angularVelocity up above
                this.player.body.rotateLeft(80 + this.boostTurn);
            }
            else if (this.cursor.right)
            {
                // allows the player to turn right.  This is reset by reseting angularVelocity up above
                this.player.body.rotateRight(80 + this.boostTurn);
            }

            if (this.cursor.up)
            {
                this.player.body.moveForward(300 + this.boost);
            }
            else if (this.cursor.down)
            {
                this.player.body.moveBackward(300 + this.boost);
            }


        }else{
            // its NOT me

            if(this.player.position.x !== undefined){

                this.player.body.reset(this.player.position.x, this.player.position.y, 100);
                this.player.body.rotation = this.player.rotation;
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