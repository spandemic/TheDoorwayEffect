class Pause extends Phaser.Scene {

    constructor() {
        super("sceneB");

    }

    create() {
        let textSpace = 52;
        let textConfig = {
            fontFamily: 'Nanum Pen Script',
            fontSize: '60px',
            color: '#cc725a',
            align: "left"
        };

        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.add.image(centerX,centerY,"scene-bg").setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*2, "Press (TAB) to return to game", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*4, "Press (SPACE) to restart game", textConfig).setOrigin(0.5);

    }
   
    update() {

        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.stop();
            this.scene.resume("sceneA");
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('sceneA');
            bgm.stop();
            loopbgm.stop();
        }

        // player can mute music inside pause menu
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            if(bgm.mute == false) {
                bgm.mute = true;
                loopbgm.mute = true;
                playerMuted = true;
            } else {
                bgm.mute = false;
                loopbgm.mute = false;
                playerMuted = false;
            }
        }
    }








}