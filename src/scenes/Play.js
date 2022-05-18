class Play extends Phaser.Scene {
// playScene
    constructor() {
        super("sceneA");
        Phaser.Scene.call(this, 'sceneA');
    }

    create() {

        this.walkSound = this.sound.add('walk', {
            mute: true,
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

        // tilemap
        const map = this.add.tilemap("map", 64, 64, 30, 20);
        const tileset = map.addTilesetImage("doorway_effect_64_tileset", "64_tiles");

        const floorLayer = map.createLayer("floor/floor", tileset, 0, 0).setDepth(1);
        const rugLayer = map.createLayer("floor/rug", tileset, 0, 0).setDepth(2);
        const spawnDoorLayer = map.createLayer("floor/spawn doorways", tileset, 0, 0).setDepth(2);
        const returnDoorLayer = map.createLayer("floor/return doorways", tileset, 0, 0).setDepth(2);
        const wallLayer = map.createLayer("collisions/walls", tileset, 0, 0).setDepth(3);
        const wallFrameLayer = map.createLayer("collisions/wallFrames", tileset, 0, 0).setDepth(4);
        const topDecorLayer = map.createLayer("collisions/decor/top", tileset, 0, 0).setDepth(5);
        const bottomDecorLayer = map.createLayer("collisions/decor/bottom", tileset, 0,0).setDepth(6);

        // player interaction keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyTAB= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        wallFrameLayer.setCollisionByProperty({ collides: true });
        spawnDoorLayer.setCollisionByProperty({ type: "spawn" });
        returnDoorLayer.setCollisionByProperty({ type: "exit" });


        // set world bounds for camera and physics
        // tileSize is set in main.js
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.hallwaySpawn = map.findObject("spawnpoints", obj => obj.name === "Hallway spawn");
        this.livingSpawn = map.findObject("spawnpoints", obj => obj.name === "Living room spawn");
        this.bathroomSpawn = map.findObject("spawnpoints", obj => obj.name === "Bathroom spawn");
        this.kitchenSpawn = map.findObject("spawnpoints", obj => obj.name === "Kitchen spawn");

        this.spawnList = [
            this.hallwaySpawn,
            this.livingSpawn,
            this.bathroomSpawn,
            this.kitchenSpawn
        ];


        this.player = this.physics.add.sprite(this.hallwaySpawn.x, this.hallwaySpawn.y, 'cube');
        this.player.setOrigin(0.5);
        this.player.setDepth(20);
        this.player.setTint(0xF73D6E);

        this.isWalking = false;
        this.itemNum = 0;

        // this.itemGroup = this.add.group({ runChildUpdate: true });
        // this.hitItemLogic = this.physics.add.overlap(
        //     this.player,
        //     this.itemGroup,
        //     this.collectItem,
        //     null,
        //     this
        // );

        // this.time.addEvent({
        //     delay: 100,
        //     callback: this.createItem,
        //     callbackScope: this,
        //     loop: true        
        // });

        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 64, 64);

        this.physics.add.collider(this.player, wallFrameLayer);
        this.physics.add.collider(this.player, spawnDoorLayer, this.sendFromSpawn, null, this);
        this.physics.add.collider(this.player, returnDoorLayer, this.returnToSpawn, null, this);
        
     
        // bugged
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
    
        
    }


    wake(input, scene) {
        input.once(Phaser.Input.Events.POINTER_DOWN, function () {
            scene.switch('sceneB');

        }, this);
    }

    sendFromSpawn() {
        let randomSpawn = this.spawnList[Math.ceil(Math.random() * (this.spawnList.length - 1))];
 
        this.player.setX(randomSpawn.x);
        this.player.setY(randomSpawn.y);
    }

    returnToSpawn() {
        this.player.setX(this.hallwaySpawn.x);
        this.player.setY(this.hallwaySpawn.y);
    }

}