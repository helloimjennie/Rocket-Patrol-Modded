// Jennie Le
// Rocket Patrol
// Took me about 10 hours 
// Rocket Patrol Mods:
// Display the time remaining (in seconds) on the screen (3)
// Track a high score that persists across scenes and display it in the UI (1)
// Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)
// Implement mouse control for player movement and left mouse click to fire (5)

let config = {
    type: Phaser.AUTO,
    width: 630,
    height: 500,
    scene: [ Menu, Play ]
  }
  
let game = new Phaser.Game(config);


let borderUISize = game.config.height / 17
let borderPadding = borderUISize / 3


let keyFIRE, keyRESET, keyLEFT, keyRIGHT