
// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this); // add to existing scene
        this.points = pointValue; // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed

        this.direction = Math.random() < 0.5 ? -1 : 1; // just randomize the direction, either left or right

        this.scaleX = this.direction === 1 ? -1 : 1;
    }

    update() {
        // move spaceship left and right
        this.x += this.moveSpeed * this.direction;

        if (this.x < -this.width) this.x = game.config.width;
        if (this.x > game.config.width) this.x = -this.width;
    }


    reset() {
        this.x = this.direction === -1 ? game.config.width : -this.width;
        this.direction = Math.random() < 0.5 ? -1 : 1;
        this.scaleX = this.direction === 1 ? -1 : 1; // this is the flipped to the right direction
    }
}
