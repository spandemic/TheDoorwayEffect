class Items extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, status, itemNum) {
        super(scene, x, y, 'cube').setOrigin(0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setDepth(9);
        
        
        this.itemNum = itemNum;
        if (status === 'real') {
            this.setTint(0x00FF00);
        } else {
            this.setTint(0xFF0000);
        }
    }

    update () {
        
    }
}