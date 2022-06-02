let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0xfcc17b,
    width: 1024,
    height: 576,
    parent: "phaser-game",
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
       
    },
    scene: [ Load , Menu , Tutorial , Credits , Play , Pause , ItemList , GameOver]
}

let game = new Phaser.Game(gameConfig);
let inDialogue, gameOver;

// global screen position variables
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let screenWidth = game.config.width;
let screenHeight = game.config.height;
let borderSize = game.config.width / 8;     // 128px for 1024
let tileSize = 64;

// keys for player
let keyW, keyA, keyS, keyD, keyENTER, keySPACE, keyTAB;
let idList = [];
let neededItems = [];       // items player needs to pick up
let itemsGot = 0;
let totalItemsGot = 0;
let timeScore = 0;
let playerMuted = false;
let bgm;
let loopbgm;
