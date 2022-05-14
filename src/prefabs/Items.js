class Items extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, itemNum) {
        super(scene, x, y, texture).setOrigin(0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setTexture(texture);
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setDepth(9);
        
        this.itemNum = itemNum;
    }

    update () {
        
    }
}