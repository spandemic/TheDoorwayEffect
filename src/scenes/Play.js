class Play extends Phaser.Scene {

    constructor() {
        super("playScene");
    }

    create() {
        // player interaction keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // set world bounds for camera and physics
        this.cameras.main.setBounds(0, 0, screenWidth * 3, screenHeight * 3);
        this.physics.world.setBounds(0, 0, screenWidth * 3, screenHeight * 3);

        this.add.image(0, 0, 'betaRoom').setOrigin(0);
        this.add.image(0, screenHeight, 'betaRoom').setOrigin(0);
        this.add.image(0, screenHeight * 2, 'betaRoom').setOrigin(0);
        this.add.image(screenWidth, 0, 'betaRoom').setOrigin(0);
        this.add.image(screenWidth, screenHeight, 'betaRoom').setOrigin(0);
        this.add.image(screenWidth, screenHeight * 2, 'betaRoom').setOrigin(0);
        this.add.image(screenWidth * 2, 0, 'betaRoom').setOrigin(0);
        this.add.image(screenWidth * 2, screenHeight, 'betaRoom').setOrigin(0);
        this.add.image(screenWidth * 2, screenHeight * 2, 'betaRoom').setOrigin(0);

        this.player = this.physics.add.sprite(centerX, centerY, 'cube');
        this.player.setOrigin(0.5);
        this.player.setDepth(20);
        this.player.setTint(0xF73D6E);

        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update() {
        this.player.setVelocity(0);

        if (keyA.isDown) {
            this.player.setVelocityX(-500);
        }
        if (keyD.isDown) {
            this.player.setVelocityX(500);
        }
        if (keyW.isDown) {
            this.player.setVelocityY(-500);
        }
        if (keyS.isDown) {
            this.player.setVelocityY(500);
        }
    }
}