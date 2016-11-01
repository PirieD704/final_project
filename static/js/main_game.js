var game; 

game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');

game.state.add('Game', Game);

game.state.start('Game');

game.state.add('Game_Over', Game_Over);
