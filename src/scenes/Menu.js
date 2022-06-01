class Menu extends Phaser.Scene {

    constructor() {
        super("menuScene");
    }

    create() {
        
        // define keys
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // bg images
        this.add.image(0,0,"bg").setOrigin(0);
        this.backDoors = this.add.tileSprite(0,0, game.config.width, game.config.height, "backDoors").setOrigin(0);
        this.frontDoors = this.add.tileSprite(0,0, game.config.width, game.config.height, "frontDoors").setOrigin(0);
        this.lethe = this.add.image(0,30,"title-lethe").setOrigin(0);
        this.title = this.add.image(game.config.width/2, tileSize*4.5,"title").setOrigin(0.5);
        
        // bg tweening
        this.tweens.add({
            targets: this.lethe,
            y: 10,
            repeat: -1,
            duration: 2000,
            yoyo: true
        })

        this.tweens.add({
            targets: this.backDoors,
            tilePositionY: 10,
            repeat: -1,
            duration: 3000,
            yoyo: true
        })

        this.tweens.add({
            targets: this.frontDoors,
            tilePositionY: 25,
            repeat: -1,
            duration: 3000,
            yoyo: true
        })

        this.tweens.add({
            targets: this.title,
            angle: {from: -1, to: 1},
            duration: 2000,
            repeat: -1,
            yoyo: true
        })

        // menu text config
        let menuConfig = {
            fontFamily: 'Nunito',
            fontSize: '45px',
            color: 'white',
            align: 'right'
        }

        // menu text
        menuConfig.fontSize = 32;
        let playButton = this.add.text(centerX, tileSize * 5.3, "Press (TAB) to play", menuConfig).setOrigin(0.5);
        let tutButton = this.add.text(centerX, tileSize * 6.3, "Press (SPACE) for tutorial", menuConfig).setOrigin(0.5);

        // flashing text events
        this.time.addEvent({
            delay: 750,
            callback: () => {playButton.alpha = 0; tutButton.alpha = 0},
            loop: true
        })
        this.time.addEvent({
            delay: 1500,
            callback: () => {playButton.alpha = 1; tutButton.alpha = 1},
            loop: true
        })
    }

    update() {
        
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.start('sceneA');
        }
        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start('tutorial');
        }
    }
}