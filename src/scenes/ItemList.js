class ItemList extends Phaser.Scene {
    constructor() {
        super('ItemList');
    }

    create() {
        this.add.image(0,0,"scene-bg").setOrigin(0);
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

        let textSpace = 52;
        let listConfig = {
            fontFamily: 'Nanum Pen Script',
            fontSize: '45px',
            color: '#cc725a',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        for (let i = 0; i < neededItems.length; i++) {
            this.add.text(centerX, tileSize*2 + (textSpace * i), neededItems[i], listConfig).setOrigin(0.5);
        }
        this.add.text(centerX + tileSize * 5, tileSize*2 + (textSpace*8), "[TAB] to return", listConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.stop();
            this.scene.resume("sceneA");
        }
    }
}