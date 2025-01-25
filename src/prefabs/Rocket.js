class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        
        scene.add.existing(this); 
        this.isFiring = false; 
        this.moveSpeed = 2; 
        this.sfxShot = scene.sound.add('sfx-shot');

        // Enable mouse input for movement and firing
        scene.input.on('pointermove', this.handleMouseMove, this); // Mouse movement
        scene.input.on('pointerdown', this.handleMouseFire, this); // Mouse firing
    }

    update() {
        // Keyboard movement if not firing
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= borderUISize + this.width) {
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width) {
                this.x += this.moveSpeed;
            }
        }

        // Keyboard firing
        if (Phaser.Input.Keyboard.JustDown(keyFIRE) && !this.isFiring) {
            this.isFiring = true;
            this.sfxShot.play();
        }

        // Move rocket upwards if fired
        if (this.isFiring && this.y >= borderUISize + 3 * borderPadding) {
            this.y -= this.moveSpeed;
        }

        // Reset rocket on miss
        if (this.y <= borderUISize + 3 * borderPadding) {
            this.reset();
        }
    }

    // Handle mouse movement
    handleMouseMove(pointer) {
        if (!this.isFiring) {
            // Update rocket's horizontal position based on mouse pointer
            this.x = Phaser.Math.Clamp(
                pointer.worldX, 
                borderUISize + this.width, 
                game.config.width - borderUISize - this.width
            );
        }
    }

    // Handle mouse firing
    handleMouseFire(pointer) {
        if (!this.isFiring) {
            this.isFiring = true;
            this.sfxShot.play();
        }
    }

    reset() {
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
}
