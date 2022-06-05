class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        this.add.image(0,0, "scene-bg").setOrigin(0);
        let rankConfig = {
            fontFamily: 'Nunito',
            fontSize: 50,
            color: '#cc725a',
            align: 'center'
        }
        let textSpace = 52;

        // player
        this.player = new Player(this, -tileSize, centerY+tileSize*2, "lethe").setDepth(1);
        this.player.anims.play("R_walk");
        this.player.body.immovable = true;

        this.itemList = [];
        idList.sort();


        // tweening
        this.timeline = this.tweens.createTimeline();
        this.timeline.add({
            targets: this.player,
            x: game.config.width-tileSize*2,
            duration: 2500,
            onComplete: () => {
                // player idles, collected items are spawned
                this.player.anims.play("R_idle");
                rankConfig.fontSize = "35px";
                let startY = tileSize+(textSpace*2);
                let startX = centerX+tileSize*3;
                this.add.text(centerX+tileSize*3.5, tileSize+65, "Your Items", rankConfig).setOrigin(0.5)
                let i = 0;
                for (let key in idList) {
                    let id = key;
                    let color = idList[key][0]
                    let texture = idList[key][1]
                    // if items reach the end of the column, start a new column
                    if (startY+(textSpace*i) > startY+(textSpace*6)) {
                        i = 0;
                        startX += 60;
                    }
                    let item = new Items(this, startX, startY+(textSpace*i), texture, color, this.id).setOrigin(0.5);
                    this.tweens.add({
                        targets: item,
                        y: "+= 20",
                        yoyo: true,
                        repeat: -1
                    })
                    i += 1;
                }
                
            }
        });

        this.timeline.play();
        
        let spaceX = centerX - tileSize * 3.5;
        let spaceY = tileSize + (textSpace*2.2)
        for (let key in neededItems) {
            let neededID = key;
            let neededColor = neededItems[key][0];
            let neededTexture = neededItems[key][1];
            let neededItem = new Items(this, spaceX, spaceY, neededTexture, neededColor, neededID).setOrigin(0.5);
            spaceY += textSpace;

            this.tweens.add({
                targets: neededItem,
                y: "+= 20",
                yoyo: true,
                repeat: -1
            })
        }
        

        this.cameras.main.fadeIn(300);
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

        // possible ranks the player can achieve
        let rankList = [
            'S',
            'A+',
            'A',
            'A-',
            'B',
            'B',
            'B-',
            'C+',
            'C',
            'C-',
            'D+',
            'D',
            'D-',
            'F'
        ]

        let rank = 0;

        // rank calculation based on how many CORRECT items the player collected
        if (itemsGot === 0) {
            rank = 13;
        } else if (itemsGot === 1) {
            rank = 9;
        } else if (itemsGot === 2) {
            rank = 8;
        } else if (itemsGot === 3) {
            rank = 7;
        } else if (itemsGot === 4) {
            rank = 6;
        } else if (itemsGot === 5) {
            rank = 4;
        } else if (itemsGot === 6) {
            rank = 3;
        } else if (itemsGot === 7) {
            rank = 2;
        }

        // rank calculation based on how many TOTAL items the player collected
        if (totalItemsGot >= 20) {
            rank += 4;
        } else if (totalItemsGot >= 16) {
            rank += 3;
        } else if (totalItemsGot >= 14) {
            rank += 2;
        } else if (totalItemsGot >= 10) {
            rank += 1;
        } else if (totalItemsGot >= 8) {
            rank -= 1;
        } else {
            rank -= 2;
        }

        // rank calculation based on how LONG the player took
        rank += timeScore;
        
        // rank maxes out at F
        if (rank > 13) {
            rank = 13;
        }
        rankConfig.fontSize = "35px";
        this.add.text(centerX-tileSize*3.5, tileSize+65, "Needed Items", rankConfig).setOrigin(0.5)
        rankConfig.fontSize = "50px";
        this.add.text(centerX, tileSize*2 - textSpace, "GRADE RECEIVED", rankConfig).setOrigin(0.5);
        rankConfig.fontSize = "100px";
        this.add.text(centerX, centerY-textSpace, rankList[rank], rankConfig).setOrigin(0.5);
        rankConfig.fontSize = "35px";
        this.add.text(centerX + tileSize * 5, tileSize*2 + (textSpace*8), "(TAB) to menu", rankConfig).setOrigin(0.5);
    }
    

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.stop();
            bgm.stop();
            loopbgm.stop();
            this.scene.start('menuScene');
        }
    }
}