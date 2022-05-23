class Items extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, status, texture, itemNum) {
        super(scene, x, y, 'cube').setOrigin(0.5); // replace 'cube' with texture

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setDepth(9);
        
        
        this.itemNum = itemNum;
        if (status === 'real') {
            if (texture === 'Binder'){
                this.setTint(0x0000FF);
            }
            if (texture === 'Notebook'){
                this.setTint(0x908234);
            }
            if (texture === 'Globe'){
                this.setTint(0x435434);
            }
            if (texture === 'Shoes'){
                this.setTint(0x7cb3a1);
            }
            if (texture === 'Printing Paper'){
                this.setTint(0x98df11);
            }
            if (texture === 'Flashcards'){
                this.setTint(0x480497);
            }
            if (texture === 'Laptop'){
                this.setTint(0x4ac797);
            }
        } else {
            this.setTint(0xFF0000);
        }
        
        
        
        
        
        
        
    }

    update () {
        
    }
}