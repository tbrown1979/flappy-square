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
