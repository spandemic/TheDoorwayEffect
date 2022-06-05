class Items extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, color, itemNum) {
        super(scene, x, y, texture).setOrigin(0.5);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setImmovable(true);
        this.body.setAllowGravity(false);

        this.setBodySize(120, 120);
        
        // reference variables
        this.itemNum = itemNum;     // the item's ID
        this.color = color;         // allows retrieval of color name
        this.texture = texture;

        // sets the colors of the items
        if (color === "Red"){
            this.setTint(0xff7c72);
        }
        if (color === "Green"){
            this.setTint(0x9fe26c);
        }
        if (color === "Blue"){
            this.setTint(0x80e1ff);
        }
        if (color === "Orange"){
            this.setTint(0xffa970);
        }
        if (color === "Purple"){
            this.setTint(0xe2a8ff);
        }
        if (color === "Pink"){
            this.setTint(0xfe8ec3);
        }
        if (color === "Yellow"){
            this.setTint(0xfef48e);
        }

        // some textures need special tweaking, do it here
        if (texture === "PrintingPaper"){
            this.name = color + " " + "Printing Paper";
            this.setScale(1.5);
        } else if (texture === "Waterbottle"){
            this.name = color + " " + "Water Bottle";
            this.setScale(1.5);
        } else {
            this.name = color + " " + texture;
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

    update() {
        
        
    }
}