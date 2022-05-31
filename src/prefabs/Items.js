class Items extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, status, texture, itemNum) {
        super(scene, x, y, texture).setOrigin(0.5); // replace 'cube' with texture

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setDepth(9);
        this.itemNum = itemNum;     // the item's ID

        let colorList = [
            "Red",
            "Green",
            "Blue",
            "Orange",
            "Purple",
            "Pink",
            "Yellow"
        ];

        if (status === 'real') {
            let randomColor = colorList[Math.floor(Math.random() * colorList.length)];
            this.name = randomColor + " " + texture;
            this.color = randomColor;
            if (randomColor === "Red"){
                this.setTint(0xFF0000);
            }
            if (randomColor === "Green"){
                this.setTint(0x00FF00);
            }
            if (randomColor === "Blue"){
                this.setTint(0x0000FF);
            }
            if (randomColor === "Orange"){
                this.setTint(0xfc5e03);
            }
            if (randomColor === "Purple"){
                this.setTint(0xad03fc);
            }
            if (randomColor === "Pink"){
                this.setTint(0xfc03c6);
            }
            if (randomColor === "Yellow"){
                this.setTint(0xfcfc03);
            }
        } else {
            this.setTint(0x000000);
        }
        
        
        
        
        
        
        
    }

    update () {
        
    }
}