class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    // load images/tile sprites
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfield', './assets/starfield.png');
    this.load.image('particle', './assets/particle.png');

    // load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', {
      frameWidth: 64,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 9
    });
    // load audio
    this.load.audio('sfx-select', './assets/sfx-select.wav');
    this.load.audio('sfx-explosion', './assets/sfx-explosion.wav');
    this.load.audio('sfx-shot', './assets/sfx-shot.wav');
    this.load.audio('musicbackground', './assets/musicbackground.wav');
  }

  create() {
    // Initialize global high score if it doesn't exist
    if (typeof game.highScore === 'undefined') {
      game.highScore = 0; // Set initial high score to 0
    }

    // Animation configuration
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 9,
        first: 0
      }),
      frameRate: 30
    });

    this.cameras.main.setBackgroundColor('#503771');

    let menuConfig = {
      fontFamily: 'Optima',
      fontSize: '23px',
      backgroundColor: '#a389dc',
      color: '#ffffff',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5
      },
      fixedWidth: 0
    };

    // Display menu text
    this.add.text(
      game.config.width / 2,
      game.config.height / 3 - borderUISize - borderPadding,
      'Welcome to the Best Game Ever',
      menuConfig
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      game.config.height / 3,
      'Use your mouse to control the rocket and click to shoot!',
      menuConfig
    ).setOrigin(0.5);

    menuConfig.backgroundColor = '#a389dc';
    menuConfig.color = '#ffffff';
    this.add.text(
      game.config.width / 2,
      game.config.height / 1.5 + borderUISize + borderPadding,
      'Made by Jennie Le',
      menuConfig
    ).setOrigin(0.5);

    // Display high score
    menuConfig.backgroundColor = '#503771';
    menuConfig.color = '#FFF';
    this.add.text(
      game.config.width / 2,
      game.config.height - borderUISize - borderPadding,
      `High Score: ${game.highScore}`,
      menuConfig
    ).setOrigin(0.5);

    // Define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // Easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000
      };
      this.sound.play('sfx-select');
      this.scene.start('playScene');
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // Hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000
      };
      this.sound.play('sfx-select');
      this.scene.start('playScene');
    }
  }
}
