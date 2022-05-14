class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }

    create() {
        
        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // menu text config
        let menuConfig = {
            fontFamily: 'Ruluko',
            fontSize: '50px',
            color: 'white',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        // menu text
        this.add.text(centerX, centerY, "The Doorway Effect", menuConfig).setOrigin(0.5);
        menuConfig.fontSize = 32;
        let playButton = this.add.text(centerX, screenHeight - borderSize, "Press (SPACE) to play", menuConfig).setOrigin(0.5);

        // flashing text events
        this.time.addEvent({
            delay: 750,
            callback: () => {playButton.alpha = 0;},
            loop: true
        })
        this.time.addEvent({
            delay: 1500,
            callback: () => {playButton.alpha = 1;},
            loop: true
        })
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("sceneA");
        }
    }
}