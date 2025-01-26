class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }

  create() {
    // adding background music
    this.backgroundMusic = this.sound.add('musicbackground', {
      volume: 0.5, // adjusting the volume
      loop: true,  // this enables the looping
    });
    this.backgroundMusic.play(); // this plays the music

    // the speed increases after 30 secs
    this.time.delayedCall(30000, () => {
      this.ship01.moveSpeed += 2;
      this.ship02.moveSpeed += 2;
      this.ship03.moveSpeed += 2;
      this.ship04.moveSpeed += 2;
    });

    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

    this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);

    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

    this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

    // small spaceship added
    this.ship04 = new TinySpaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'tinyspaceship', 0, 100).setOrigin(0, 0)

    this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'spaceship', 0, 30).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'spaceship', 0, 20).setOrigin(0, 0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'spaceship', 0, 10).setOrigin(0, 0);

    keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    this.p1Score = 0;

    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100,
    };

    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

    this.remainingTime = 60;
    this.timerText = this.add.text(
      game.config.width - borderUISize - borderPadding - 100,
      borderUISize + borderPadding * 2,
      this.remainingTime,
      scoreConfig
    );

    this.gameOver = false;


    this.time.addEvent({
      delay: 1000,
      callback: () => {
        this.remainingTime--;
        this.timerText.setText(this.remainingTime);

        if (this.remainingTime <= 0) {
          this.timerText.text = 0;
          this.handleGameOver();
        }
      },
      loop: true,
    });
  }

  handleGameOver() {
    this.gameOver = true;


    this.backgroundMusic.stop();


    if (this.p1Score > game.highScore) {
      game.highScore = this.p1Score;
    }

    // displaying high score & game over screen
    this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', {
      fontFamily: 'Optima',
      fontSize: '28px',
      backgroundColor: '#a389dc',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      game.config.height / 2 + 64,
      `High Score: ${game.highScore}`,
      {
        fontFamily: 'Optima',
        fontSize: '24px',
        backgroundColor: '#a389dc',
        color: '#ffffff',
        align: 'center',
      }
    ).setOrigin(0.5);

    this.add.text(
      game.config.width / 2,
      game.config.height / 2 + 128,
      'Returning to Main Menu...',
      {
        fontFamily: 'Optima',
        fontSize: '24px',
        backgroundColor: '#a389dc',
        color: '#ffffff',
        align: 'center',
      }
    ).setOrigin(0.5);

    this.time.delayedCall(3000, () => {
      this.scene.start("menuScene");
    });
  }

  update() {
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
      this.backgroundMusic.stop(); // stop the music
      this.scene.restart();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.backgroundMusic.stop();
      this.scene.start("menuScene");
    }
    this.starfield.tilePositionX -= 4;

    if (!this.gameOver) {
      this.p1Rocket.update();
      this.ship01.update();
      this.ship02.update();
      this.ship03.update();
      this.ship04.update()
    }

    if (this.checkCollision(this.p1Rocket, this.ship04)) {
      this.p1Rocket.reset()
      this.shipExplode(this.ship04)
    }
    if (this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
    }
  }

  checkCollision(rocket, ship) {
    if (
      rocket.x < ship.x + ship.width &&
      rocket.x + rocket.width > ship.x &&
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship.y
    ) {
      return true;
    } else {
      return false;
    }
  }

  shipExplode(ship) {
    ship.alpha = 0;

    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');
    boom.on('animationcomplete', () => {
      ship.reset();
      ship.alpha = 1;
      boom.destroy();
    });

    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;
    this.sound.play('sfx-explosion');
  }
}






