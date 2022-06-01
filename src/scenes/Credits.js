class Credits extends Phaser.Scene {
    constructor() {
        super("credits")
    }

    create() {
        this.add.image(0,0,"scene-bg").setOrigin(0);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);

        let textSpace = 52;
        let textConfig = {
            fontFamily: 'Nanum Pen Script',
            fontSize: 70,
            color: '#cc725a',
            align: "left"
        }

        this.add.text(centerX, tileSize*2 - textSpace, "CREDITS", textConfig).setOrigin(0.5);

        textConfig.fontSize = 45;

        this.add.text(centerX, tileSize*2, "Ashley Lu: Art & Programming", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*2, "Andy Eng: Programming", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*4, "Erick Tung: Programming", textConfig).setOrigin(0.5);
        this.add.text(centerX, tileSize*2 + textSpace*6, "Siwen Tao: Sound", textConfig).setOrigin(0.5);
        this.add.text(centerX + tileSize * 6, tileSize*2 + (textSpace*8), "[W]", textConfig).setOrigin(0.5);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyW)) {
           
            this.scene.start("menuScene");
          
        }
    }
}