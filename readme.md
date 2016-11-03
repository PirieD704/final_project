# Space Balls - A game to end all games. A game... for the ages.
---

##Live Demo
---
[Space Balls](http://paigeniedringhaus.com/spaceBalls/)

##Link to Video of Gameplay
---
<a href="https://www.youtube.com/watch?v=_gJCeyrkUkM" target="_blank"><img src="http://img.youtube.com/vi/_gJCeyrkUkM/0.jpg" width="240" height="180" border="10" /></a>

##Contents
--- 
  * What It Is
  * What We Used
  * Challenges and Solutions
  * MVP
  * Our Stretch Goals
  * Authors
  * Screenshots
  * Github Link
  * Code Examples

##What It Is
---
This is a final project, capture the flag-style game we made as a group utilizing our full-stack web development skills in an agile fashion in two weeks' time.

We built a multiplayer game where players try to find the 'flag' moving around the game board, change it to their color and defend it from players on the opposing team for a set amount of time to win the round and earn bragging rights.

The game is built on the MEAN stack (MongoDB, Angular, Express and Node.js) with the Phaser game engine driving the HTML5 canvas and Socket.io making multiplayer gaming possible.

##What We Used
---
  * HTML5
  * CSS3
  * JavaScript
  * AngularJS
  * Nodejs
  * Express
  * MongoDB
  * Mongoose
  * Socket.io
  * Phaser (HTML5 game framework)
  * bcrypt (password hashing module)

##Challenges and Solutions
---
As we discussed the possibilities for this game, we got more and more excited, but getting to our finished product was not without its fair share of bumps along the way. Here's a few challenges our group encountered and how we overcame them. 

  * Challenge #1: Getting Nodejs running   

  A wise person once said 'the hardest part is getting started', and they were right. Between completing our last MEAN stack project and starting this one, we dove into Python, Flask and MySQL. So picking Nodejs back up after weeks of other languages proved a bit tricky - we were all a bit rusty. As we chose our tech stack, we began installing node modules and setting up our package.json file. What we didn't realize until we started trying to run Nodejs was that in order for it to run in the terminal, the node_modules folder needs to be on the same file level as the package.json file for the dependencies included to install and run. Once we pinpointed this problem it was a simple matter of rearranging the file structure and we were back on track.

  * Challenge #2: Choosing a game engine framework 

  There a number of excellent HTML5 game engine options to choose from, so deciding on Phaser involved some thorough research. Among our considerations, we looked at Unity, P2, building the whole game natively, ImpactJS or Phaser. The learning curve was quite steep for some of the options: specifically Unity and ImpactJS, P2 did some but not all of the things we were hoping to incorporate into our game, and once we checked out Phaser - and the myriad of excellent documentation and live examples of its code available on its website, we were hooked. It has turned out to be a great thing too - doing a lot of the heavy lifting we would have previously had to do ourselves.

  * Challenge #3: Getting a flare to fire in the direction of the moving flag

  As we were developing the game, we made the board much larger than the actual game window. So at many times the 'flag' wasn't visible on a player's screen, and we wanted players to be able to find the direction of the flag, and decided to use a flare that would point in the direction of the flag once a player fired it off. We tried a number of Phaser methods that came with the framework like `fireFrom` and `trackSprite` but nothing worked quite as we needed. Luckily, buried deep in the docs was a handy little method called `fireAtSprite` which did exactly what we needed. Each time a player fired a flare, no matter where on the board the flag was, the flare traveled in the right direction. Success!

  * Challenge #4: Socket.io and getting it to play nice with Phaser

  We thought it would be a pretty simple task to translate our working one player game into a multiplayer game. This was not the case. At all. From reading Phaser's documentation, we realized it's optimized for single player games. It wasn't built with multiplayer games in mind. At all. Despite this fact, we pushed forward and forced Phaser to support multiple players. Our largest challenge in this was getting two players on the screen at the same time so each could see the other's movements. For a while, one player could only see the other if their browser window was not being focused on. To fix this, we had to open up the player object, find the correct inner values (x coordinate, y coordinate and the individual player id) associated with the local object and transmit only that data back to the server. In this way, we avoided the issue of a stack overflow and were able to update all other players on the game board with the local player's necessary information so they could see the player moving and playing.

  * Challenge #5: Getting Socket.io to work with AngularJS

  This is an addition to the last challenge of getting Socket.io to work with Phaser, of getting Socket.io to work with AngularJS. At certain points in the game, mainly right after a user logged on to the game's URL and then again before users were dropped in to game play, we needed Angular's front end display to be able to communicate with Socket.io and the users connected via Socket. In order to get Socket and Angular talking, we made socket into a factory that could be injected into the Angular controller application, giving Angular access to Socket.io and allowing us to show the data we needed to on the front end to all players.

  * Challenge #6: Figuring out which physics engine to use with our game

  Phaser is wonderful in that it has multiple physics engines you can choose from: arcade physics, ninja physics and P2 physics. Phaser is also annoying in that it has multiple physics engines to choose from, and not all engines support all the physics methods that other engines do. Originally, we started our game running on the Phaser Arcade Physics engine, but halfway through we realized in order to have some game options we wanted like collision detection, object overlaps, the ability to move in any direction on the board, etc. So we switched to P2 physics and then had to rewrite or redesign some of our previous functions to accomodate the changes. Luckily, we were able to still accomplish what we needed to happen in the game play with the P2 physics engine in the time that we had.

##MVP (Minimum Viable Product)
---  
The MVP for this project was pretty ambitious, but with the assistance of the Phaser framework, it seemed very doable within our time frame.

Our first MVP iteration included:
  * A background for our game board
  * A multiplayer game (1 v 1, 2 v 2, 3 v 3, etc.)
  * The ability for players to shoot lasers and shield themselves from attacks
  * A randomly moving flag to capture and defend
  * A timer to determine which team wins
  * A HUD (heads up display) during game play to show opposing team views, scores, timer countdown, etc.
  * A database on the backend to capture and remember player names, high scores, etc.
  * An about page to show new users how to play

##Our Stretch Goals
---
Here's what our second level IVP (Intermediate Viable Product) featured:
  * A speed boost option for players
  * A powered up shooting option
  * The ability to choose different difficulty levels of game play
  * Different options to win a game round (like make 30 kills in a match before time runs out OR capture the flag the longest, etc.)

##Authors
---
  * [Paige Niedringhaus](https://github.com/paigen11/)
  * [David Pirie](https://github.com/PirieD704)
  * [JT Townsend](https://github.com/jttwnsnd)

##Github Link
---
[Github](https://github.com/PirieD704/final_project)

##Screenshots
---
Register screen users see first 
![alt text](https://github.com/PirieD704/final_project/blob/master/screenshots/register-screen.png 'register-screen.png')

Lobby screen for users waiting to enter the game
![alt text](https://github.com/PirieD704/final_project/blob/master/screenshots/lobby.png 'lobby.png')

Blue player on canvas
![alt text](https://github.com/PirieD704/final_project/blob/master/screenshots/blue-player-alone.png 'blue-player-alone.png')

Blue player with flag it changed to blue
![alt text](https://github.com/PirieD704/final_project/blob/master/screenshots/blue-player.png 'blue-player.png')

Red player with flag it changed to red
![alt text](https://github.com/PirieD704/final_project/blob/master/screenshots/red-player-plus-ball.png 'red-player-plus-ball.png')

Waiting screen if there are no other players ready to play
![alt text](https://github.com/PirieD704/final_project/blob/master/screenshots/waiting-screen.png 'waiting-screen.png')

Wining screen when the timer runs out
![alt text](https://github.com/PirieD704/final_project/blob/master/screenshots/winning-screen.png 'winning-screen.png')

##Code Examples
---
This is the player constructor function we use for creating each new player on the canvas game board. It determines which color to make the player based on their team assignment (which happens when they enter the lobby), and sets up all the other things player objects can do like boosting their speed, sending out a flare to locate the flag, etc.

```javascript
Player = function (game, team, position, flag, game_id, id) {
    this.alive = true;
    this.game = game;
    if(team === 'Blue'){
        this.player = game.add.sprite(blue_position[position][0], blue_position[position][1], 'blue_player', 'blue_team');
        this.team_flag = 'blue_flag';
    }else{
        this.player = game.add.sprite(red_position[position][0], red_position[position][1], 'red_player', 'red_team');
        this.team_flag = 'red_flag';
    }
    this.player_id = game_id;
    this.unique_id = id;
    this.flare = game.add.weapon(10, 'flare');
    this.flare.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    this.flare.bulletLifespan = 1000;
    this.flare.bulletSpeed = 300;
    this.flare.fireRate = 300;
    this.flare.trackSprite(this.player, 0, 0, true);
    this.boost = 0;
    this.boostTurn = 0;

    this.player.scale.setTo(0.35, 0.35);

    this.player.anchor.set(0.5, 0.5);

    game.physics.p2.enable(this.player);

};
```
This is where we put the Socket.io factory inside the Angular controller so Angular has access to it. Below are a couple of functions initializing the sockets as soon as a player arrives at the home page, and then updating a playerList array once they signed in and entered the lobby before the game starts.

```javascript
gameApp.controller('mainController', function($scope, $http, $cookies, $route, $location, $rootScope, $timeout, socket){
  var num_ready = 0;
  var apiPath = 'http://localhost:3000';

  socket.on('player_init', function(socket_id){
    console.log("Welcome, fool", socket_id);
    myId = socket_id;
  });

  function updateLobbyCount(){
    for(var i = 0; i < playerList.length; i++){
      if(playerList[i].socketID == myId){
        var lobbyPlayer = playerList[i];
      }
    }
    socket.emit('enter_lobby', {
      id: myId,
      player: lobbyPlayer
    });
    console.log('someone is entering the lobby');
  }
```

Socket.io JavaScript that actually starts the game when all the players in the lobby have clicked the 'Game Launch' button. This initializes the game, sets up the randomly moving flag and creates all the players on the board when it's loaded. 

```javascript
socket.on('init_game', function(data){
    console.log(data.num_ready, users.length);
    if(data.num_ready == users.length){
      console.log("users are ready");
      io.sockets.emit('game_launch', users);
        console.log('game launching');
      flag_x = Math.floor(Math.random() * 1900 + 10);
      flag_y = Math.floor(Math.random() * 1900 + 10);
      io.sockets.emit('flag_coord', {
        flag_x:flag_x,
        flag_y:flag_y
      });
    }else{
      io.sockets.emit('player_ready', data.num_ready);
        console.log('no launch yet'); 
    }
  })
  ```