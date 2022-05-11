let gameConfig = {
    type: Phaser.AUTO,
    width: 1024,
    height: 576,
    parent: "endless-runner",
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
       
    },
    scene: [ Load , Menu , Play ]
}

let game = new Phaser.Game(gameConfig);

let centerX = game.config.width / 2;
let centerY = game.config.heignt / 2;
let screenWidth = game.config.width;
let screenHeight = game.config.height;

let keyW, keyA, keyS, keyD, keyENTER, keySPACE;
