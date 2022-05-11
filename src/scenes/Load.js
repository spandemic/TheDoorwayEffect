class Load extends Phaser.Scene {

    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.path = './assets/';

        this.load.image('cube', 'standardCube.png');
        this.load.image('betaRoom', 'betaRoom.png');
    }

    create() {
        this.scene.start("menuScene");
    }
}