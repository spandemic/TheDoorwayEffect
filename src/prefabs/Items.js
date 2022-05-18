class Items extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, itemNum) {
        super(scene, x, y).setOrigin(0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setTexture('cube');
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setDepth(9);
        this.setTint(0x00FF00);
        
        this.itemNum = itemNum;
    }

    update () {
        
    }
}