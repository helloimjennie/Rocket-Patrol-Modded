class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }

  preload() {
    
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfield', './assets/starfield.png');
    this.load.image('tinyspaceship', './assets/tinyspaceship.png')

    this.load.spritesheet('explosion', './assets/explosion.png', {
      frameWidth: 64,
      frameHeight: 32,
      startFrame: 0,
      endFrame: 9
    });
    
    this.load.audio('sfx-select', './assets/sfx-select.wav');
    this.load.audio('sfx-explosion', './assets/sfx-explosion.wav');
    this.load.audio('sfx-shot', './assets/sfx-shot.wav');
    this.load.audio('musicbackground', './assets/musicbackground.wav');
  }

  create() {
    
    if (typeof game.highScore === 'undefined') {
      game.highScore = 0; 
    }

    
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

    
    menuConfig.backgroundColor = '#503771';
    menuConfig.color = '#FFF';
    this.add.text(
      game.config.width / 2,
      game.config.height - borderUISize - borderPadding,
      `High Score: ${game.highScore}`,
      menuConfig
    ).setOrigin(0.5);

    
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
     
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000
      };
      this.sound.play('sfx-select');
      this.scene.start('playScene');
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
     
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000
      };
      this.sound.play('sfx-select');
      this.scene.start('playScene');
    }
  }
}
