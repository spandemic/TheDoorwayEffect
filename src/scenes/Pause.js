class Pause extends Phaser.Scene {

    constructor() {
        super("sceneB");

    }

    create() {
        let textConfig = {
            fontFamily: 'Nanum Pen Script',
            fontSize: '70px',
            color: '#cc725a',
            align: "left"
        };

        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.text(centerX, centerY, "Press [TAB] to return to game", textConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + tileSize * 2, "Press [SPACE] to restart game", textConfig).setOrigin(0.5);

    }
   
    update() {

        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.stop();
            this.scene.resume("sceneA");
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('sceneA');
        }
    }








}