class Play extends Phaser.Scene {
playScene
    constructor() {
        super("playScene");
    }

    create() {
        // player interaction keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyTAB= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // set world bounds for camera and physics
        this.cameras.main.setBounds(0, 0, screenWidth * 3, screenHeight * 3);
        // this.cameras.main.centerOn(0, 0);
        // this.cameras.main.setSize(screenWidth, screenHeight);
        this.physics.world.setBounds(0, 0, screenWidth * 3, screenHeight * 3);

        // column 1
        this.add.image(0, 0, 'room1').setOrigin(0);
        this.add.image(0, screenHeight, 'room4').setOrigin(0);
        this.add.image(0, screenHeight * 2, 'room7').setOrigin(0);
        // column 2
        this.add.image(screenWidth, 0, 'room2').setOrigin(0);
        this.add.image(screenWidth, screenHeight, 'room5').setOrigin(0);
        this.add.image(screenWidth, screenHeight * 2, 'room8').setOrigin(0);
        // column 3
        this.add.image(screenWidth * 2, 0, 'room3').setOrigin(0);
        this.add.image(screenWidth * 2, screenHeight, 'room6').setOrigin(0);
        this.add.image(screenWidth * 2, screenHeight * 2, 'room9').setOrigin(0);

        this.player = this.physics.add.sprite(centerX, centerY, 'cube');
        this.player.setOrigin(0.5);
        this.player.setDepth(20);
        this.player.setTint(0xF73D6E);

        this.player.setCollideWorldBounds(true);
        // this.cameras.main.startFollow(this.player, true, 1, 1, screenWidth, screenHeight);
    }

    update() {
        // console.log(this.player.x, this.player.y);
        // console.log(this.cameras.main.x, this.cameras.main.y);
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
        if(Phaser.Input.Keyboard.JustDown(keyTAB)){
            this.scene.sleep();
            this.scene.launch('ItemList')
            
        }

        // camera panning logic
        // col 1
        if (this.player.x <= screenWidth) {
            // row 1 (room1)
            if (this.player.y <= screenHeight) {
                this.cameras.main.centerOn(screenWidth / 2, screenHeight / 2);
            }
            // row 2 (room4)
            if (this.player.y > screenHeight && this.player.y <= screenHeight * 2) {
                this.cameras.main.centerOn(screenWidth / 2, screenHeight * 6 / 4);
            }
            // row 3 (room7)
            if (this.player.y > screenHeight * 2 && this.player.y <= screenHeight * 3){
                this.cameras.main.centerOn(screenWidth / 2, screenHeight * 15 / 6);
            }
        }
        // col 2
        if (this.player.x > screenWidth && this.player.x <= screenWidth * 2) {
            // row 1 (room2)
            if (this.player.y <= screenHeight) {
                this.cameras.main.centerOn(screenWidth * 6 / 4, screenHeight / 2);
            }
            // row 2 (room5)
            if (this.player.y > screenHeight && this.player.y <= screenHeight * 2) {
                this.cameras.main.centerOn(screenWidth * 6 / 4, screenHeight * 6 / 4);
            }
            // row 3 (room8)
            if (this.player.y > screenHeight * 2 && this.player.y <= screenHeight * 3){
                this.cameras.main.centerOn(screenWidth * 6 / 4, screenHeight * 15 / 6);
            }
        }
        // col 3
        if (this.player.x > screenWidth * 2 && this.player.x <= screenWidth * 3) {
            // row 1 (room3)
            if (this.player.y <= screenHeight) {
                this.cameras.main.centerOn(screenWidth * 15 / 6, screenHeight / 2);
            }
            // row 2 (room6)
            if (this.player.y > screenHeight && this.player.y <= screenHeight * 2) {
                this.cameras.main.centerOn(screenWidth * 15 / 6, screenHeight * 6 / 4);
            }
            // row 3 (room9)
            if (this.player.y > screenHeight * 2 && this.player.y <= screenHeight * 3){
                this.cameras.main.centerOn(screenWidth * 15 / 6, screenHeight * 15 / 6);
            }
        }
        
    }
}