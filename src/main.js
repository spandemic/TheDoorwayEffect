let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0xfcc17b,
    width: 1024,
    height: 576,
    parent: "phaser-game",
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
       
    },
    scene: [ Load , Menu , Play , Inventory ]
}

let game = new Phaser.Game(gameConfig);

// global screen position variables
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let screenWidth = game.config.width;
let screenHeight = game.config.height;
let borderSize = game.config.width / 8;     // 128px for 1024
let tileSize = 64;

// keys for player
let keyW, keyA, keyS, keyD, keyENTER, keySPACE, keyTAB;
