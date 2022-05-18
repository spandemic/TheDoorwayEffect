class Play extends Phaser.Scene {
playScene
    constructor() {
        super("sceneA");
        Phaser.Scene.call(this, 'sceneA');
    }

    create() {
        // tilemap
        const map = this.add.tilemap("map", 64, 64, 30, 20);
        const tileset = map.addTilesetImage("doorway_effect_64_tileset", "64_tiles");
        
        // trying to figure out how to load in the tiles for the entrances/exits (doorways)
        // maybe just put the doorways on a tile layer instead of object layer in tiled
        let doorways = map.createFromObjects("doorways", {
            name: "doorway"
        });

        const floorLayer = map.createLayer("floor/floor", tileset, 0, 0);
        const rugLayer = map.createLayer("floor/rug", tileset, 0, 0,);
        const wallLayer = map.createLayer("collisions/walls", tileset, 0, 0);
        const wallFrameLayer = map.createLayer("collisions/wallFrames", tileset, 0, 0);
        const topDecorLayer = map.createLayer("collisions/decor/top", tileset, 0, 0);
        const bottomDecorLayer = map.createLayer("collisions/decor/bottom", tileset, 0,0);

        // player interaction keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyTAB= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        
        this.isWalking = false;
        this.itemNum = 0;

        // set world bounds for camera and physics
        // tileSize is set in main.js
        this.cameras.main.setBounds(4*tileSize, 11*tileSize, map.widthInPixels, map.heightInPixels);
        // this.cameras.main.centerOn(0, 0);
        // this.cameras.main.setSize(screenWidth, screenHeight);
        this.physics.world.setBounds(0, 0, screenWidth * 3, screenHeight * 3);

        /*
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
        */

        this.player = this.physics.add.sprite(7*tileSize, 16*tileSize, 'cube');
        this.player.setOrigin(0.5);
        this.player.setDepth(20);
        this.player.setTint(0xF73D6E);

        this.itemGroup = this.add.group({ runChildUpdate: true });
        this.hitItemLogic = this.physics.add.overlap(
            this.player,
            this.itemGroup,
            this.collectItem,
            null,
            this
        );

        this.time.addEvent({
            delay: 100,
            callback: this.createItem,
            callbackScope: this,
            loop: true        
        });

        this.player.setCollideWorldBounds(true);
        // this.cameras.main.startFollow(this.player, true, 1, 1, screenWidth, screenHeight);

        this.walkSound = this.sound.add('walk', {
            mute: false,
            volume: 0.4,
            rate: 1.5,
            loop: true
        });

        this.openDoorSound = this.sound.add('openDoor', {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: false
        });

        this.pickUpItemSound = this.sound.add('pickItem', {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: false
        });

        this.pickUpItemSound = this.sound.add('dropItem', {
            mute: false,
            volume: 0.5,
            rate: 1,
            loop: false
        });
     

        this.input.once(Phaser.Input.Events.POINTER_DOWN, function () {

            this.scene.switch('sceneB');

        }, this);

        this.events.on(Phaser.Scenes.Events.WAKE, function() {
            this.wake(this.input, this.scene);
        }, this);
    

    }

    update() {

        //console.log(this.player.velocityX);

        // movement keys
        this.player.setVelocity(0);
        this.player.setState(0);        // 0 for still, 1 for moving
        if (keyA.isDown) {
            this.player.setVelocityX(-400);
            this.player.setState(1);
        }
        if (keyD.isDown) {
            this.player.setVelocityX(400);
            this.player.setState(1);
        }
        if (keyW.isDown) {
            this.player.setVelocityY(-400);
            this.player.setState(1);
        }
        if (keyS.isDown) {
            this.player.setVelocityY(400);
            this.player.setState(1);
        }

        // walking sound
        if (this.player.state === 1 && this.isWalking === false){
            this.walkSound.play();
            this.isWalking = true;
        }
        if (this.player.state === 0) {
            this.walkSound.stop();
            this.isWalking = false;
        }
        

        if(Phaser.Input.Keyboard.JustDown(keyTAB)){
            this.scene.switch('sceneB');
            
        }
        
        
        // camera panning logic
        /*
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
        */
        
    }
    wake(input, scene) {
        input.once(Phaser.Input.Events.POINTER_DOWN, function () {
            scene.switch('sceneB');

        }, this);
    }


}