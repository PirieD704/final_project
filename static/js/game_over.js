var Game_Over = {

    preload : function() {
        // // Load the needed image for this game screen.
        // game.load.image('gameover', './assets/images/gameover.png');
    },

    create : function() {

        // Create button to start game like in Menu.
        this.add.button(120, 0, 'flag', this.startGame, this);

        // Add text with information about the score from last game.
        game.add.text(235, 350, "Winning Team", { font: "bold 22px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(390, 348, winner, { font: "bold 28px sans-serif", fill: "#fff", align: "center" });
        game.add.text(235, 390, "To play again, click the unclaimed flag", { font: "bold 16px sans-serif", fill: "#46c0f9", align: "center"});

    },

    startGame: function () {

        // Change the state back to Game.
        socket.emit('player_ready', {
            id: myId
        })
        this.state.start('Wait');
        // this.state.start('Game');

    }

};