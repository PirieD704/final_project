function create() {

	game.add.tileSprite(0, 0, 1920, 1920, 'background');
    game.world.setBounds(0, 0, 1920, 1920);
    
    //  Create our Timer
    timer = game.time.create();

    //  Set a TimerEvent to occur after 2 seconds
    timerEvent = timer.add(Phaser.Timer.SECOND * 5, endTimer, this);

    //  It won't start automatically, allowing you to hook it to button events and the like.
    timer.start();
}    

function render() {
    // game.debug.text('Time until event: ' + timer.duration.toFixed(0), 32, 32);
    if (timer.running) {
        // game.debug.text(this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 2, 14, "#ff0");
        game.debug.text('Countdown Clock: ' + timer.duration.toFixed(0), 32, 32);
        game.debug.text('Enemies: ' + enemiesAlive + ' / ' + enemiesTotal, 32, 32);
    }
    else {
        game.debug.text("Done!", 32, 32);
    }
}

function endTimer() {
    // Stop the timer when the delayed event triggers
    console.log('stop');
    timer.stop();
}

function formatTime(s) {
    // Convert seconds (s) to a nicely formatted and padded time string
    var minutes = "0" + Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);   
}
