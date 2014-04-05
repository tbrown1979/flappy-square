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