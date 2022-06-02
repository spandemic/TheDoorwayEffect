class Items extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, color, itemNum) {
        super(scene, x, y, texture).setOrigin(0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setImmovable(true);
        this.body.setAllowGravity(false);
        this.setDepth(9);

        this.setBodySize(120, 120);
        
        // reference variables
        this.itemNum = itemNum;     // the item's ID
        this.color = color;         // allows retrieval of color name
        this.name = color + " " + texture;      // sets the name of the item
        this.texture = texture;

        // sets the colors of the items
        if (color === "Red"){
            this.setTint(0xFF0000);
        }
        if (color === "Green"){
            this.setTint(0x00FF00);
        }
        if (color === "Blue"){
            this.setTint(0x0000FF);
        }
        if (color === "Orange"){
            this.setTint(0xfc5e03);
        }
        if (color === "Purple"){
            this.setTint(0xad03fc);
        }
        if (color === "Pink"){
            this.setTint(0xfc03c6);
        }
        if (color === "Yellow"){
            this.setTint(0xfcfc03);
        }

        // some textures need special tweaking, do it here
        if (texture === "PrintingPaper"){
            this.name = color + " " + "Printing Paper";
            this.setScale(1.5);
        }
        if (texture === "Waterbottle"){
            this.name = color + " " + "Water Bottle";
            this.setScale(1.5);
        }
        if (texture === "Binder"){
            this.setScale(1.5);
        }
        if (texture === "Notebook"){
            this.setScale(1.5);
        }
        if (texture === "Globe"){
            this.setScale(1.5);
        }
        if (texture === "Shoes"){
            this.setScale(1.5);
        }
        if (texture === "Flashcards"){
            this.setScale(1.5);
        }
        if (texture === "Laptop"){
            this.setScale(1.5);
        }
        if (texture === "Pencil"){
            this.setScale(1.5);
        }
        if (texture === "Tape"){
            this.setScale(1.5);
        }
    }
}