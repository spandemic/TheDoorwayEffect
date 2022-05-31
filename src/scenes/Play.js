class Play extends Phaser.Scene {
    // playScene
    constructor() {
        super("sceneA");
        Phaser.Scene.call(this, 'sceneA');
    }

    create() {
        // game end condition - will this fix glitched movement after restarting?
        // this.gameOver = false;

        // player interaction keys
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // sound
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
        const bottomDecorLayer = map.createLayer("collisions/decor/bottom", tileset, 0, 0);
        const topDecorLayer = map.createLayer("collisions/decor/top", tileset, 0, 0);
        const itemListLayer = map.createLayer("collisions/decor/itemList", tileset, 0, 0);
        const wallFrameLayer = map.createLayer("collisions/wallFrames", tileset, 0, 0).setDepth(3);
        const abovePlayerLayer = map.createLayer("collisions/decor/abovePlayer", tileset, 0, 0).setDepth(5);

        wallFrameLayer.setCollisionByProperty({ collides: true });
        wallLayer.setCollisionByProperty({ collides: true });
        bottomDecorLayer.setCollisionByProperty({ collides: true});
        topDecorLayer.setCollisionByProperty({ collides: true});
        spawnDoorLayer.setCollisionByProperty({ type: "spawn" });
        returnDoorLayer.setCollisionByProperty({ type: "exit" });
        spawnExitLayer.setCollisionByProperty({ type: "spawn" });
        itemListLayer.setCollisionByProperty({ collides: true });
        

        // locations where the player will spawn when entering the respective room
        this.returnHallwaySpawn = map.findObject("spawnpoints", obj => obj.name === "Return hallway spawn");
        this.hallwaySpawn = map.findObject("spawnpoints", obj => obj.name === "Hallway spawn");
        let livingSpawn = map.findObject("spawnpoints", obj => obj.name === "Living room spawn");
        let bathroomSpawn = map.findObject("spawnpoints", obj => obj.name === "Bathroom spawn");
        let kitchenSpawn = map.findObject("spawnpoints", obj => obj.name === "Kitchen spawn");
        let masterSpawn = map.findObject("spawnpoints", obj => obj.name === "master spawn");
        let bedroomSpawn = map.findObject("spawnpoints", obj => obj.name === "bedroom spawn");
        this.spawnList = [
            livingSpawn,
            bathroomSpawn,
            kitchenSpawn,
            masterSpawn,
            bedroomSpawn
        ];
        this.spawnListTracker = [];
        neededItems = [];

        // the actual visual items
        this.itemList = [
            'Binder',
            'Notebook',
            'Globe',
            'Shoes',
            'PrintingPaper',
            'Flashcards',
            'Laptop',
            'Waterbottle',
            'Pencil',
            'Tape'
        ];

        this.allItemList = {
            Binder: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            Notebook: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            Globe: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            Shoes: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            PrintingPaper: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            Flashcards: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            Laptop: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            Waterbottle: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            Pencil: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"],
            Tape: ["Red", "Green", "Blue", "Orange", "Yellow", "Pink", "Purple"]
        };

        this.fakeItemList = [
            'Binder',
            'Notebook',
            'Globe',
            'Shoes',
            'PrintingPaper',
            'Flashcards',
            'Laptop',
            'Waterbottle',
            'Pencil',
            'Tape'
        ];

        // item spawn locations
        let itemKitchen1 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 1");
        let itemKitchen2 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 2");
        let itemKitchen3 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 3");
        let itemKitchen4 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 4");
        let itemKitchen5 = map.findObject("item spawnpoints", obj => obj.name === "kitchen item 5");
        let itemBathroom1 = map.findObject("item spawnpoints", obj => obj.name === "bathroom item 1");
        let itemBathroom2 = map.findObject("item spawnpoints", obj => obj.name === "bathroom item 2");
        let itemBathroom3 = map.findObject("item spawnpoints", obj => obj.name === "bathroom item 3");
        let itemLiving1 = map.findObject("item spawnpoints", obj => obj.name === "living item 1");
        let itemLiving2 = map.findObject("item spawnpoints", obj => obj.name === "living item 2");
        let itemLiving3 = map.findObject("item spawnpoints", obj => obj.name === "living item 3");
        let itemLiving4 = map.findObject("item spawnpoints", obj => obj.name === "living item 4");
        let itemLiving5 = map.findObject("item spawnpoints", obj => obj.name === "living item 5");
        let itemMaster1 = map.findObject("item spawnpoints", obj => obj.name === "master item 1");
        let itemMaster2 = map.findObject("item spawnpoints", obj => obj.name === "master item 2");
        let itemMaster3 = map.findObject("item spawnpoints", obj => obj.name === "master item 3");
        let itemMaster4 = map.findObject("item spawnpoints", obj => obj.name === "master item 4");
        let itemMaster5 = map.findObject("item spawnpoints", obj => obj.name === "master item 5");
        let itemBedroom1 = map.findObject("item spawnpoints", obj => obj.name === "bedroom item 1");
        let itemBedroom2 = map.findObject("item spawnpoints", obj => obj.name === "bedroom item 2");
        let itemBedroom3 = map.findObject("item spawnpoints", obj => obj.name === "bedroom item 3");
        let itemBedroom4 = map.findObject("item spawnpoints", obj => obj.name === "bedroom item 4");
        let itemBedroom5 = map.findObject("item spawnpoints", obj => obj.name === "bedroom item 5");

        // list of item spawn locations to iterate through
        this.itemLocations = [
            itemKitchen1,
            itemKitchen2,
            itemKitchen3,
            itemKitchen4,
            itemKitchen5,
            itemBathroom1,
            itemBathroom2,
            itemBathroom3,
            itemLiving1,
            itemLiving2,
            itemLiving3,
            itemLiving4,
            itemLiving5,
            itemMaster1,
            itemMaster2,
            itemMaster3,
            itemMaster4,
            itemMaster5,
            itemBedroom1,
            itemBedroom2,
            itemBedroom3,
            itemBedroom4,
            itemBedroom5
        ];

        // player declaration variables
        this.player = new Player(this, this.hallwaySpawn.x, this.hallwaySpawn.y, "lethe", "front_1");
        this.player.setDepth(4);
        // this.player.setTint(0xF73D6E);
        this.playerInventory = [];      // collected itemNum goes here
        this.playerState = null;


        // misc variables
        this.itemNum = 0;
        this.realItemNum = []; // list of the itemNum of all real items
        this.lastRoom; // declared variable to store the last room the player was in

        // camera and world methods
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05, 64, 64);
        this.cameras.main.setLerp(1, 1);

        // collision logic for collecting items
        this.allItems = this.add.group({ runChildUpdate: true }); // this.allItems stores the individually created Phaser.Physics.Sprites
        this.hitItemLogic = this.physics.add.overlap(
            this.player,
            this.allItems,
            (obj1, obj2) => {
                obj2.destroy();
                this.playerInventory.push(obj2.itemNum);
            }, // destroys the collected item and adds its itemNum to the playerInventory
            null,
            this
        );

        // event that generates all the real items
        this.time.addEvent({
            delay: 100,
            callback: this.generateRealItems,
            callbackScope: this,
            loop: false
        });
        // event that generates all the fake items
        this.time.addEvent({
            delay: 500,
            callback: this.generateFakeItems,
            callbackScope: this,
            loop: false
        });

        // collision logic for all layers with collide tiles
        this.physics.add.collider(this.player, wallFrameLayer);
        this.physics.add.collider(this.player, wallLayer);
        this.physics.add.collider(this.player, bottomDecorLayer);
        this.physics.add.collider(this.player, topDecorLayer);
        this.sendPhysics = this.physics.add.collider(this.player, spawnDoorLayer, this.sendFromSpawn, null, this);
        this.returnPhysics = this.physics.add.collider(this.player, returnDoorLayer, this.returnToSpawn, null, this);
        this.exitPhysics = this.physics.add.collider(this.player, spawnExitLayer, this.gameEnd, null, this);
        this.listPhysics = this.physics.add.collider(this.player, itemListLayer, this.openList, null, this);
        this.physics.add.collider(this.player, tileset[64]);

        // bugged inventory screen
        let test = this.scene;
        let lol = this.player;
        keyTAB.on('down', function(event) {
            test.pause();
            lol.walkSound.stop();
            test.launch('sceneB');
        })

    }

    update() {
        // if (!this.gameOver) {
        //     this.player.update();
        // }
        // if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
        //     this.scene.pause();
        //     this.player.walkSound.mute = true;
        //     this.scene.launch('sceneB');
        // }
        this.player.update();
    }


    fadeTransition() {
        // camera fade transition
        this.input.enabled = false;
        this.cameras.main.fadeOut(300);
        this.cameras.main.once("camerafadeoutcomplete", () => {
            this.time.delayedCall(400, () => {
                this.cameras.main.fadeIn(300);
                this.input.enabled = true;
            })
        })
    }

    // need a way to find out how to stop the player from moving during a transition

    sendFromSpawn() {
        // disables constant colision updates from Phaser
        this.sendPhysics.active = false;

        // selects a random location to send the player
        let randomSpawn = this.spawnList[Math.floor(Math.random() * this.spawnList.length)];
        console.log(this.spawnList);
        console.log(this.spawnListTracker);
        this.fadeTransition();

        // makes sure the player cannot enter the same room twice in a row
        if (this.spawnList.length != 0) {
            this.time.delayedCall(400, () => {
            this.player.setX(randomSpawn.x);
            this.player.setY(randomSpawn.y);
            this.spawnList.splice(this.spawnList.indexOf(randomSpawn), 1); 
            this.spawnListTracker.push(randomSpawn);
            });
        } else {
            for (let i = 0; i < this.spawnListTracker.length; i++) {
                this.spawnList.push(this.spawnListTracker[i]);
            }
            this.spawnListTracker = [];
            this.sendFromSpawn();
        }

        this.time.delayedCall(
            1000,
            () => {this.sendPhysics.active = true}
        );
        
    }

    returnToSpawn() {
        this.returnPhysics.active = false;
        // returns player to hallway
        this.fadeTransition();
        this.time.delayedCall(400, () => {
            this.player.setX(this.returnHallwaySpawn.x);
            this.player.setY(this.returnHallwaySpawn.y);
        });

        this.time.delayedCall(
            1000,
            () => {this.returnPhysics.active = true}
        );
    }

    openList() {
        this.listPhysics.active = false;
        // list of needed items at start of game
        this.scene.pause();
        this.player.walkSound.stop();
        this.scene.launch('ItemList');
        this.time.delayedCall(
            500,
            () => {this.listPhysics.active = true;}
        );
    }

    generateRealItems() {
        // generates 7 needed items that the player will collect
        for (let i = 0; i < 7; i++) {
            this.itemNum += 1; // itemNum is the ID of the items generated

            // randomly selects a item and spawn location
            let randomItemSpawn = this.itemLocations[Math.floor(Math.random() * (this.itemLocations.length))];
            let randomItem = this.itemList[Math.floor(Math.random() * this.itemList.length)];

            // generates the item, status = real
            let realItem = new Items(this, randomItemSpawn.x, randomItemSpawn.y, 'real', randomItem, this.itemNum).setDepth(10);

            this.allItems.add(realItem); // add to physics collider

            this.realItemNum.push(realItem.itemNum); // adds itemNum of a real item to the list
            neededItems.push(realItem.name); // adds the item's name to the list the player can see

            this.itemList.splice(this.itemList.indexOf(randomItem), 1); // removes both the item and the spawn location from their respective lists
            this.itemLocations.splice(this.itemLocations.indexOf(randomItemSpawn), 1);
        }
    }

    generateFakeItems() {
        // generates fake items for all spawns that do not have a real item
        for (let i = 0; i < this.itemLocations.length; i++) {
            this.itemNum += 1; // ID of item generated

            // selects and generates a random item
            let randomFakeItem = this.fakeItemList[Math.floor(Math.random() * this.fakeItemList.length)];
            let fakeItem = new Items(this, this.itemLocations[i].x, this.itemLocations[i].y, 'fake', randomFakeItem, this.itemNum).setDepth(10);

            this.allItems.add(fakeItem); // adds to physics collider

            this.itemList.splice(this.itemList.indexOf(randomFakeItem), 1); // removes the item from spawn pool
        }

    }

    gameEnd() {
        //this.gameOver = true;
        itemsGot = 0; // how many items the player got
        totalItemsGot = this.playerInventory.length;
        this.exitPhysics.active = false;
        this.player.walkSound.mute = true;

        // checks through player inventory
        for (let i = 0; i < totalItemsGot; i++) {
            // checks through the real item list
            for (let k = 0; k < this.realItemNum.length; k++) {
                // compares the itemNum of the two arrays
                if (this.realItemNum[k] == this.playerInventory[i]) {
                    itemsGot += 1; // for each item the player picked up that was in the real item list, they get a point
                }
            }
        }
        this.player.setState(0);
        //this.player.destroy();
        this.scene.switch("GameOver");
        this.time.delayedCall(500, () => {this.exitPhysics.active = true; this.player.walkSound.mute = false;});
    }
}