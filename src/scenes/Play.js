class Play extends Phaser.Scene {
// playScene
    constructor() {
        super("sceneA");
        Phaser.Scene.call(this, 'sceneA');
    }

    create() {
        // player interaction keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyTAB= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

        const floorLayer = map.createLayer("floor/floor", tileset, 0, 0);
        const rugLayer = map.createLayer("floor/rug", tileset, 0, 0);
        const spawnDoorLayer = map.createLayer("floor/spawn doorways", tileset, 0, 0);
        const spawnExitLayer = map.createLayer("floor/spawn exit", tileset, 0, 0);
        const returnDoorLayer = map.createLayer("floor/return doorways", tileset, 0, 0);
        const wallLayer = map.createLayer("collisions/walls", tileset, 0, 0);
        const bottomDecorLayer = map.createLayer("collisions/decor/bottom", tileset, 0,0);
        const topDecorLayer = map.createLayer("collisions/decor/top", tileset, 0, 0);
        const wallFrameLayer = map.createLayer("collisions/wallFrames", tileset, 0, 0).setDepth(4);

        wallFrameLayer.setCollisionByProperty({ collides: true });
        spawnDoorLayer.setCollisionByProperty({ type: "spawn" });
        returnDoorLayer.setCollisionByProperty({ type: "exit" });
        spawnExitLayer.setCollisionByProperty({ type: "spawn" });

        // set world bounds for camera and physics
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
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

        this.itemList = [
            'Binder',
            'Notebook',
            'Globe',
            'Shoes',
            'Printing Paper',
            'Flashcards'
        ]

        let itemKitchen1 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 1");
        let itemKitchen2 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 2");
        let itemKitchen3 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 3");
        let itemKitchen4 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 4");
        let itemKitchen5 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 5");
        this.itemKitchenLocations = [
            itemKitchen1,
            itemKitchen2,
            itemKitchen3,
            itemKitchen4,
            itemKitchen5
        ];

        this.neededItemNames = [];
        this.allItemNames = [];

        this.player = this.physics.add.sprite(this.hallwaySpawn.x, this.hallwaySpawn.y, 'cube');
        this.player.setOrigin(0.5);
        this.player.setDepth(20);
        this.player.setTint(0xF73D6E);
        this.playerInventory = [];

        this.isWalking = false;
        this.itemNum = 0;
        this.itemNumList = [];
        this.realItemNum = [];

        this.allItems = this.add.group({ runChildUpdate: true });
        this.hitItemLogic = this.physics.add.overlap(
            this.player,
            this.allItems,
            (obj1, obj2) => {obj2.destroy(); this.playerInventory.push(obj2.itemNum); console.log(obj2.itemNum)},
            null,
            this
        );

        this.neededItemGroup = this.add.group({ runChildUpdate: true });

        this.time.addEvent({
            delay: 100,
            callback: this.generateRealItems,
            callbackScope: this,
            loop: false       
        });

        this.time.addEvent({
            delay: 500,
            callback: this.generateFakeItems,
            callbackScope: this,
            loop: false       
        });

        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 64, 64);

        this.physics.add.collider(this.player, wallFrameLayer);
        this.physics.add.collider(this.player, spawnDoorLayer, this.sendFromSpawn, null, this);
        this.physics.add.collider(this.player, returnDoorLayer, this.returnToSpawn, null, this);
        this.physics.add.collider(this.player, spawnExitLayer, this.gameEnd, null, this);
     
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
 
        
        this.player.setX(this.kitchenSpawn.x);
        this.player.setY(this.kitchenSpawn.y);
        
       
        // this.player.setX(this.bathroomSpawn.x);
        // this.player.setY(this.bathroomSpawn.y);

        /*
        this.player.setX(this.livingSpawn.x);
        this.player.setY(this.livingSpawn.y);
        */
    }

    returnToSpawn() {
        this.player.setX(this.hallwaySpawn.x);
        this.player.setY(this.hallwaySpawn.y);
    }

    generateRealItems() {
        this.itemNum += 1;
        let randomKitchenSpawn = this.itemKitchenLocations[Math.floor(Math.random() * (this.itemKitchenLocations.length))];
        let randomKitchenItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];
        let kitchenItem = new Items(this, randomKitchenSpawn.x, randomKitchenSpawn.y, 'real', randomKitchenItem, this.itemNum);

        this.allItems.add(kitchenItem);

        this.itemNumList.push(kitchenItem.itemNum);
        this.realItemNum.push(kitchenItem.itemNum);
        this.neededItemNames.push(randomKitchenItem);
        console.log(randomKitchenItem);

        this.itemList.splice(this.itemList.indexOf(randomKitchenItem), 1);

        this.realKitchenItem = randomKitchenSpawn;
    }

    generateFakeItems() {
        for (let i = 0; i < this.itemKitchenLocations.length; i++) {
            if (this.itemKitchenLocations[i] !== this.realKitchenItem) {
                this.itemNum += 1;
                let randomFakeKitchenItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];
                let fakeKitchenItem = new Items(this, this.itemKitchenLocations[i].x, this.itemKitchenLocations[i].y, 'fake', randomFakeKitchenItem, this.itemNum);
                console.log(randomFakeKitchenItem);

                this.allItems.add(fakeKitchenItem);
                this.itemNumList.push(fakeKitchenItem.itemNum);
                this.itemList.splice(this.itemList.indexOf(randomFakeKitchenItem), 1);
            }
        }
    }

    gameEnd() {
        let itemsGot = 0;
        for (let i = 0; i < this.playerInventory.length; i++) {
            for (let k = 0; k < this.realItemNum.length; k++) {
                if (this.realItemNum[k] == this.playerInventory[i]) {
                    itemsGot += 1;
                }
            }   
        }
        if (itemsGot > 0) {
            console.log('winner');
        } else {
            console.log('loser');
        }
    }   
}