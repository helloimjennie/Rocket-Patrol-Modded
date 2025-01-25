// Jennie Le
// Rocket Patrol
// Took me about 10 hours 
// Rocket Patrol Mods:
// Display the time remaining (in seconds) on the screen (3)
// Track a high score that persists across scenes and display it in the UI (1)
// Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
// Implement mouse control for player movement and left mouse click to fire (5)
// Randomize each spaceship's movement direction at the start of each play (1)
// Create a new title screen (e.g., new artwork, typography, layout) (3)

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

// reserve keyboard bindings
let keyFIRE, keyRESET, keyLEFT, keyRIGHT
