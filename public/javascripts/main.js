// Initialize Phaser, and creates a 400x490px game
var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

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