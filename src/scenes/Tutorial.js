class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorial');
    }

    create() {
        // images
        this.add.image(0,0,"scene-bg").setOrigin(0);
        this.add.image(game.config.width, 0, "scene-bg").setOrigin(0);
        this.player = new Player(this, game.config.width - tileSize*2, tileSize*1.5, "lethe", "front_1");
        this.add.image(game.config.width - tileSize*2, tileSize*3.5, "list");
        this.add.image(game.config.width - tileSize, tileSize*5.2, "Tape").setScale(1.5).setTint(0x00FF00);

        this.page = 0;
        // key inputs
        keyTAB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // text
        let textSpace = 52;
        let textConfig = {
            fontFamily: 'Nanum Pen Script',
            fontSize: 70,
            color: '#cc725a',
            align: "left"
        }

        this.add.text(centerX, tileSize*2 - textSpace, "TUTORIAL", textConfig).setOrigin(0.5);                  // page 1
        this.add.text(game.config.width * 1.5, tileSize*2 - textSpace, "SCORE", textConfig).setOrigin(0.5);     // page 2

        textConfig.fontSize = 45;

        this.add.text(centerX, tileSize*2, "(WASD) to move, (TAB) to pause", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*2, "Check the list for what you need!", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*4, "Explore the house & collect what you need", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*6, "Exit the main hallway when you are finished", textConfig).setOrigin(0.5);
        this.add.text(centerX + tileSize * 5, tileSize*2 + (textSpace*8), "(TAB) to continue", textConfig).setOrigin(0.5);
        this.add.text(centerX - tileSize * 3, tileSize*2 + (textSpace*8), "(ENTER) to mute music", textConfig).setOrigin(0.5);

        this.add.text(game.config.width * 1.5, tileSize*2, "Collecting the correct items increases your grade.", textConfig).setOrigin(0.5);
        this.add.text(game.config.width * 1.5, tileSize*2 + textSpace*2, "Collecting excessive items decreases your grade.", textConfig).setOrigin(0.5);
        this.add.text(game.config.width * 1.5, tileSize*2 + textSpace*4, "Grade improves the quicker you leave the house,", textConfig).setOrigin(0.5);
        this.add.text(game.config.width * 1.5, tileSize*2 + textSpace*5, "so don't spend too long searching for one item!", textConfig).setOrigin(0.5);
        this.add.text(game.config.width * 1.5 + tileSize * 5, tileSize*2 + (textSpace*8), "(SPACE) to play", textConfig).setOrigin(0.5);

        textConfig.fontSize = 110;
        this.add.text(game.config.width * 1.5 - tileSize * 4, tileSize*2 + (textSpace*7), "A+", textConfig).setOrigin(0.5).setRotation(-Math.PI / 12);
    }

    update() {
        this.player.update();
        this.player.setVelocity(0);
        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
           
            this.cameras.main.centerOn(game.config.width * 1.5, centerY);
          
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
           
            this.scene.start("sceneA");
          
        }

    }
}