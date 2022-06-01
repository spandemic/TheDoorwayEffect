class Play extends Phaser.Scene {
    // playScene
    constructor() {
        super("sceneA");
        Phaser.Scene.call(this, 'sceneA');
    }

    create() {
        // game end condition - will this fix glitched movement after restarting?
        gameOver = false;
        inDialogue = true;

        // text config
        this.dialogueConfig = {
            fontFamily: 'Nunito',
            fontSize: '25px',
            color: '#cc725a',
            align: 'center',
            wordWrap: { width: 600}
            
        }

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

        // collisions
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

        // the actual visual items, every single item in the game
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
        this.playerInventory = [];      // collected itemNum goes here
        this.playerState = null;
        inDialogue = true;

        // dialogue
        // https://github.com/nathanaltice/Dialogging code reference
        this.dialogueConvo = 0; // each array element in dialogue
        this.dialogueLine = 0; // each object element in dialogueConvo
        this.dialogueTyping = false; // active typing of dialogue

        this.textbox = this.add.sprite(this.hallwaySpawn.x, this.hallwaySpawn.y + tileSize*3, "textbox").setOrigin(0.5).setDepth(5);
        this.dialogue = this.cache.json.get("dialogue");
        this.dialogueText = this.add.text( this.hallwaySpawn.x, this.hallwaySpawn.y + tileSize*3, "", this.dialogueConfig).setOrigin(0.5).setDepth(6);
        this.dialogueConfig.fontSize = "20px";
        this.dialogueConfig.color = "#fcc17b";
        this.nextText = this.add.text(this.hallwaySpawn.x+tileSize*4.4, this.hallwaySpawn.y+tileSize*4, "(TAB) to continue", this.dialogueConfig).setDepth(6).setOrigin(1);
        this.spaceText = this.add.text(0, 0, "(SPACE) to return", this.dialogueConfig).setDepth(6).setOrigin(1);
        this.nextText.visible = false;
        this.spaceText.visible = false;
        this.typeText(0);

        // misc variables
        this.itemNum = 0;
        this.realItemNum = []; // list of the itemNum of all real items
        this.lastRoom; // declared variable to store the last room the player was in

        // camera and world methods
        // this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.player.setCollideWorldBounds(true);
        this.cameras.main.startFollow(this.player, true);
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
        this.exitPhysics = this.physics.add.collider(this.player, spawnExitLayer, () => {this.gameEnd();}, null, this);
        this.listPhysics = this.physics.add.collider(this.player, itemListLayer, this.openList, null, this);
        this.physics.add.collider(this.player, tileset[64]);

        // pause screen screen
        let scene = this.scene;
        let player = this.player;
        keyTAB.on('down', function(event) {
            if (!gameOver && !inDialogue) {
                scene.pause();
                player.walkSound.stop();
                scene.launch('sceneB');
            }
        })

    }

    update() {
        if (!gameOver) {
            this.player.update();
        }
        else {
            this.gameEnd();
        }
        // changing tab function when in dialogue
        if (Phaser.Input.Keyboard.JustDown(keyTAB) && !this.dialogueTyping && inDialogue && !gameOver) {
            this.typeText(this.dialogueConvo);
        }
    }


    fadeTransition() {
        // camera fade transition
        this.input.enabled = false;
        this.cameras.main.fadeOut(300);
        if (!gameOver) {
            this.cameras.main.once("camerafadeoutcomplete", () => {
                this.time.delayedCall(400, () => {
                    this.cameras.main.fadeIn(300);
                    this.input.enabled = true;
                })
            })
        }   
    }

    // need a way to find out how to stop the player from moving during a transition

    sendFromSpawn() {
        // disables constant colision updates from Phaser
        this.sendPhysics.active = false;

        // selects a random location to send the player
        let randomSpawn = this.spawnList[Math.floor(Math.random() * this.spawnList.length)];
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

            // color selector
            let keys = Object.keys(this.allItemList);
            let randomKey = keys[Math.floor(Math.random() * keys.length)];
            let randomColor = this.allItemList[randomKey][Math.floor(Math.random() * this.allItemList[randomKey].length)];

            // selects a random spawn and a random item to spawn in
            let randomItemSpawn = this.itemLocations[Math.floor(Math.random() * (this.itemLocations.length))];

            // generates the item, status = real
            let realItem = new Items(this, randomItemSpawn.x, randomItemSpawn.y, randomKey, randomColor, this.itemNum).setDepth(3);

            this.allItems.add(realItem); // add to physics collider

            this.realItemNum.push(realItem.itemNum); // adds itemNum of a real item to the list
            neededItems.push(realItem.name); // adds the item's name to the list the player can see

            this.allItemList[randomKey].splice(this.allItemList[randomKey].indexOf(randomColor), 1);
            this.itemLocations.splice(this.itemLocations.indexOf(randomItemSpawn), 1);
        }
    }

    generateFakeItems() {
        // generates fake items for all spawns that do not have a real item
        for (let i = 0; i < this.itemLocations.length; i++) {
            this.itemNum += 1; // ID of item generated

            // selects a random color and texture for the fake items
            let keys = Object.keys(this.allItemList);
            let randomKey = keys[Math.floor(Math.random() * keys.length)];
            let randomColor = this.allItemList[randomKey][Math.floor(Math.random() * this.allItemList[randomKey].length)];

            let fakeItem = new Items(this, this.itemLocations[i].x, this.itemLocations[i].y, randomKey, randomColor, this.itemNum).setDepth(3);

            this.allItems.add(fakeItem); // adds to physics collider

            this.allItemList[randomKey].splice(this.allItemList[randomKey].indexOf(randomColor), 1);
        }

    }

    gameEnd() {
    
        gameOver = true;
        this.player.setState(0);
        this.player.body.immovable = true;
        this.exitPhysics.active = false;
        this.player.walkSound.mute = true;
        this.spaceText.x = this.player.x-tileSize*1.8;
        this.spaceText.y = this.player.y+tileSize*4;
        if (!inDialogue) {
            this.typeText(1, this.player.x, this.player.y+tileSize*3);
            
        }
        
        if (this.player.anims.currentAnim.key != "R_idle") {
            this.player.anims.play("R_idle");
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
                itemsGot = 0; // how many items the player got
                totalItemsGot = this.playerInventory.length;
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

                this.fadeTransition();
                this.time.delayedCall(400, () => {
                    this.scene.stop();
                    this.scene.start("GameOver");
                })
            }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            gameOver = false;
            inDialogue = false;
            this.player.setVelocityX(-400);
            this.textbox.visible = false;
            this.dialogueText.visible = false;
            this.nextText.visible = false;
            this.spaceText.visible = false;
            this.player.body.immovable = true;
            this.exitPhysics.active = true;
            this.player.walkSound.mute = false;
            this.dialogueLine = 0;
            
        }
    }

    typeText(convo, textX=this.hallwaySpawn.x, textY=this.hallwaySpawn.y + tileSize*3) { // https://github.com/nathanaltice/Dialogging code reference
        // set position of assets and turn them visible. also activate dialogue state
        inDialogue = true;
        this.textbox.x = textX;
        this.textbox.y = textY;
        this.dialogueText.x = textX;
        this.dialogueText.y = textY;
        this.nextText.x = textX + tileSize*4.4;
        this.nextText.y = textY + tileSize;
        this.dialogueTyping = true;
        this.dialogueText.text = "";
        this.textbox.visible = true;
        this.dialogueText.visible = true;
        

        
        if (this.dialogueTyping) {
            // if there are no more lines to read in the convo, make everything invisible and disable inDialogue
            if (this.dialogue[convo].length == this.dialogueLine) {
                this.dialogueLine = 0;
                this.textbox.visible = false;
                this.dialogueText.visible = false;
                this.nextText.visible = false;
                inDialogue = false;
                this.currentChar = 0;
        
            // if the dialogue is "items", display needed item list
            } else if (this.dialogue[convo][this.dialogueLine]["dialogue"] == "items") {
                this.dialogueLines = "";
                for (let i = 0; i < neededItems.length; i++) {
                    if (i < neededItems.length-1) {
                        this.dialogueLines += neededItems[i]+", ";
                    } else if (i == neededItems.length-1) {
                        this.dialogueLines += "and "+neededItems[i]+".";
                    }
                }
                this.nextText.visible = false;

                this.typingAnimation();
                
            } else { // otherwise, update dialogue normally
                this.dialogueLines = this.dialogue[convo][this.dialogueLine]["dialogue"];
                this.nextText.visible = false;

                this.typingAnimation();
            }
        }
    }

    typingAnimation() {
        // the actual typing animation
        this.currentChar = 0;
        this.textTimer = this.time.addEvent({
            delay: 30,
            repeat: this.dialogueLines.length - 1,
            callback: () => {
                this.dialogueText.text += this.dialogueLines[this.currentChar];
                this.currentChar += 1;
                // when everything is done typing, show input prompts
                if (this.textTimer.getRepeatCount() == 0 && inDialogue) {
                    this.time.delayedCall(300, () => {
                        this.nextText.visible = true;
                        if (gameOver) {
                            this.spaceText.visible = true;
                        }
                    });
                    
                    this.dialogueTyping = false;
                    this.textTimer.destroy();
                    this.dialogueLine += 1;
                }
            },
            callbackScope: this
        });
    }
}