class Difficulty extends Phaser.Scene {
    constructor() {
        super("diffScene");
    }
    create() {
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.add.image(0,0,"scene-bg").setOrigin(0);
        this.player = new Player(this, centerX, centerY, "lethe", "front_1").setOrigin(0.5);
        this.player.anims.play("front_idle");

        let textConfig = {
            fontFamily: 'Nanum Pen Script',
            fontSize: 60,
            color: '#cc725a',
            align: "left"
        }

        this.add.text(game.config.width / 3, centerY, "[A]", textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 3 * 2, centerY, "[D]", textConfig).setOrigin(0.5);

        textConfig.fontSize = 40;

        this.add.text(game.config.width / 3, centerY + 52, "EASY", textConfig).setOrigin(0.5);
        this.add.text(game.config.width / 3 * 2, centerY + 52, "HARD", textConfig).setOrigin(0.5);
        
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyA)) {
            difficulty = 0;
            this.scene.start("sceneA");
        }
        if (Phaser.Input.Keyboard.JustDown(keyD)) {
            difficulty = 1;
            this.scene.start("sceneA");
        }
    }
}