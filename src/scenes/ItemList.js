class ItemList extends Phaser.Scene {
    constructor() {
        super('ItemList');
    }

    create() {
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);

        let textSpace = 36;
        let listConfig = {
            fontFamily: 'Nunito',
            fontSize: '45px',
            color: 'white',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        for (let i = 0; i < neededItems.length; i++) {
            this.add.text(centerX, tileSize + (textSpace * i), neededItems[i], listConfig).setOrigin(0.5);
        }
        this.add.text(centerX + tileSize * 5, centerY + tileSize * 3, "[TAB] to return", listConfig).setOrigin(0.5);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.switch('sceneA');
        }
    }
}