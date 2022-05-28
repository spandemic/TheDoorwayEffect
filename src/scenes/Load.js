class Load extends Phaser.Scene {

    constructor() {
        super("loadScene");
    }

    preload(){
        this.load.path = './assets/';

        this.load.image('cube', 'standardCube.png');
        this.load.image('Inventory', 'Inventory.png');
        this.load.image('Inventorybox', 'Inventorybox.png');
        this.load.image("bg", "title-bg.jpg");
        this.load.image("backDoors", "title-backDoors.png");
        this.load.image("frontDoors", "title-frontDoors.png");
        this.load.image("title-lethe", "title-lethe.png");
        this.load.image("title", "title.png");
        this.load.image("scene-bg", "scene-bg.png");
        this.load.image("list", "list.png");

        this.load.audio('dropItem', 'dropitem.wav');
        this.load.audio('openDoor', 'opendoor.wav');
        this.load.audio('pickItem', 'pickitem.wav');
        this.load.audio('walk', 'walking.wav');

        this.load.tilemapTiledJSON("map", "tilemap_64px.json");
        this.load.image("64_tiles", "tileset-64.png");

        this.load.atlas("lethe", "atlas/lethe-atlas.png", "atlas/lethe-atlas.json")
    }

    create() {
        this.scene.start("menuScene");
    }
}