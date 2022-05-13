class Load extends Phaser.Scene {

    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.path = './assets/';

        this.load.image('cube', 'standardCube.png');
        this.load.image('room1', 'room1.png');
        this.load.image('room2', 'room2.png');
        this.load.image('room3', 'room3.png');
        this.load.image('room4', 'room4.png');
        this.load.image('room5', 'room5.png');
        this.load.image('room6', 'room6.png');
        this.load.image('room7', 'room7.png');
        this.load.image('room8', 'room8.png');
        this.load.image('room9', 'room9.png');
        this.load.image('Inventory', 'Inventory.png');
        this.load.image('Inventorybox', 'Inventorybox.png');
    }

    create() {
        this.scene.start("menuScene");
    }
}