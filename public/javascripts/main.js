// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');


//Weird way to make objects in Javascript...
//This is a bird Object (even though it's called a function)
//That just keeps everything inside it
//Works nicely though, because now the main_state doesn't
//have to hold EVERYTHING like it was
//So we can create like a Player class or something
//And they can each implement their own update, which we
//just call in the actual update() function
function Bird(phaser) {
  this.phaser = phaser;
}

Bird.prototype.initialize = function () {
  this.bird = this.phaser.game.add.sprite(100, 245, 'bird');
  //make bird fall
  this.bird.body.gravity.y = 1000;  
  // Call the 'jump' function when the spacekey is hit
  var space_key = this.phaser.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  space_key.onDown.add(this.jump, this);   
}

Bird.prototype.jump = function () {
  this.bird.body.velocity.y = -350;
}

Bird.prototype.update = function (pipes) {
  // If the bird is out of the world (too high or too low), 
  // call the 'restart_game' function
  if (this.bird.inWorld == false)
    main_state.restart_game();

  //bird collides with pipe, reset the game
  this.phaser.game.physics.overlap(this.bird, pipes, main_state.restart_game, null, this.phaser);
}

function PipeManager(phaser) {
  this.phaser = phaser;
}

PipeManager.prototype.initialize = function () {
  this.score = 0;
  // Create a group of pipes
  this.pipes = game.add.group();  
  this.pipes.createMultiple(20, 'pipe');
  this.timer = this.phaser.game.time.events.loop(1500, this.add_row_of_pipes, this);
}

PipeManager.prototype.add_one_pipe = function(x, y) {  
  // Get the first dead pipe of our group
  var pipe = this.pipes.getFirstDead();

  // Set the new position of the pipe
  pipe.reset(x, y);

  // Add velocity to the pipe to make it move left
  pipe.body.velocity.x = -200; 

  // Kill the pipe when it's no longer visible 
  pipe.outOfBoundsKill = true;
}

PipeManager.prototype.add_row_of_pipes = function() {  
  var hole = Math.floor(Math.random()*5)+1;

  for (var i = 0; i < 8; i++)
      if (i != hole && i != hole +1) 
          this.add_one_pipe(400, i*60+10);   
  //add 1 to score when row of pipes are created
  this.score += 1;  
}

PipeManager.prototype.update = function () {}

PipeManager.prototype.restart = function () {
  this.phaser.game.time.events.remove(this.timer);
}

// Creates a new 'main' state that wil contain the game
var main_state = {

    preload: function() { 
		// Function called first to load all the assets
    
      // Change the background color of the game
      this.game.stage.backgroundColor = '#71c5cf';

      // Load the bird sprite
      this.game.load.image('bird', 'assets/bird.png'); 

      // Load the pipe
      this.game.load.image('pipe', 'assets/pipe.png');  

    },

    create: function() { 
    	// Fuction called after 'preload' to setup the game    

      this.bird = new Bird(this);
      this.bird.initialize();

      this.pipeManager = new PipeManager(this);
      this.pipeManager.initialize();

      //add a score to top left
      this.score = this.pipeManager.score;
      var style = { font: "30px Arial", fill: "#ffffff" };  
      this.label_score = this.game.add.text(20, 20, "0", style);
      this.label_score.content = this.score;
    },
    
    update: function() {
		// Function called 60 times per second
      this.bird.update(this.pipeManager.pipes);
      this.score = this.pipeManager.score;
      this.label_score.content = this.score;
    },

    // Restart the game
    restart_game: function() {  
      //reset pipes
      this.pipeManager.restart();
      // Start the 'main' state, which restarts the game
      this.game.state.start('main');
    },

};

// Add and start the 'main' state to start the game
game.state.add('main', main_state);  
game.state.start('main'); 