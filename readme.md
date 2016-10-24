# Space Balls - A game to end all games. A game... for the ages.
---

##Live Demo
---
[Space Balls](tbd)

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

The game is built on the MEAN stack (MongoDB, Angular, Express and NodeJS) with the Phaser.io game engine driving the HTML5 canvas and Sockets.io making multiplayer possible.

##What We Used
---
  * HTML5
  * CSS3
  * JavaScript
  * AngularJS
  * Nodejs
  * Express
  * Sockets.io
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
TBD

##Code Examples
---
TBD