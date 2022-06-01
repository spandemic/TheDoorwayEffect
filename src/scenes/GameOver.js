class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    create() {
        this.add.image(0,0, "scene-bg").setOrigin(0);
        this.cameras.main.fadeIn(300);
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        let rankConfig = {
            fontFamily: 'Nanum Pen Script',
            fontSize: '70px',
            color: '#cc725a',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
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

        rank += timeScore;
        
        if (rank > 13) {
            rank = 13;
        }
        this.add.text(centerX, tileSize*2 - 52, "GRADE RECEIVED", rankConfig).setOrigin(0.5);
        rankConfig.fontSize = "150px";
        this.add.text(centerX, centerY, rankList[rank], rankConfig).setOrigin(0.5);
        rankConfig.fontSize = "45px";
        this.add.text(centerX + tileSize * 5, tileSize*2 + (52*8), "[TAB] to menu", rankConfig).setOrigin(0.5);
    }
    

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.start('menuScene');
        }
    }
}