let gameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: "doorwayEffect",
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
       
    },
    scene: [ Load , Menu , Play ]
}

let game = new Phaser.Game(gameConfig);

// global variables
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let screenWidth = game.config.width;
let screenHeight = game.config.height;
let borderSize = game.config.width / 8;     // 128px for 1024

// keys for player
let keyW, keyA, keyS, keyD, keyENTER, keySPACE;
