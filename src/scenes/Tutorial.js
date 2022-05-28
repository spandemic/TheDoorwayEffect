class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorial');
    }

    create() {
        // images
        this.add.image(0,0,"scene-bg").setOrigin(0);
        this.player = new Player(this, game.config.width - tileSize*2, tileSize*1.5, "lethe", "front_1");
        this.add.image(game.config.width - tileSize*2, tileSize*3.5, "list");
        this.add.image(game.config.width - tileSize*2, tileSize*5.2, "cube");

        // key inputs
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        // text
        let textSpace = 52;
        let textConfig = {
            fontFamily: 'Nanum Pen Script',
            fontSize: '70px',
            color: '#cc725a',
            align: "left"
        }

        this.add.text(centerX, tileSize*2 - textSpace, "TUTORIAL", textConfig).setOrigin(0.5);
        textConfig.fontSize = "45px";
        this.add.text(centerX, tileSize*2, "WASD to move", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*2, "Check the list for what you need!", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*4, "Explore the house & collect what you need", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*6, "Exit the main hallway when you are finished", textConfig).setOrigin(0.5);
        this.add.text(centerX + tileSize * 5, tileSize*2 + (textSpace*8), "[TAB] to continue", textConfig).setOrigin(0.5);
    }

    update() {
        this.player.update();
        this.player.setVelocity(0);
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.start('sceneA');
        }
    }
}