Game.prototype = {
	create: function(){
		var bulletsCollisionGroup = game.physics.p2.createCollisionGroup();
		var redTeamCollisionGroup = game.physics.p2.createCollisionGroup();
		var blueTeamCollisionGroup = game.physics.p2.createCollisionGroup();
		var wallCollisionGroup = game.physics.p2.createCollisionGroup();

		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.P2JS;
		this.bullets.createMultiple(200, 'bullet', 0, false);
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 0.5);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);
		this.bullets.forEach(function(bullet){
			bullet.body.setCollisionGroup(bulletsCollisionGroup);
			bullet.body.collides(playerOneCollisionGroup);
		});

		player.body.setCollisionGroup(playerOneCollisionGroup);
		player.body.collides(bulletsCollisionGroup, this.hit, this);
	},

	hit: function(player, bullet){
		bullet.parent.sprite.kill();
	}
}