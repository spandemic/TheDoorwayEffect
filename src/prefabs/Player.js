class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame).setOrigin(0.5); 

        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.moveSpeed = 5;
        this.walkSound = scene.sound.add("walk", {loop: true, rate: 1.5});
        this.direction = "front"

        // player hitbox
        this.body.offset.y = 64;
        this.body.offset.x = 32;
        this.body.height = 32;
        this.body.width = 32;

        // player animations
        this.anims.create({
            key: "front_idle",
            frames: this.anims.generateFrameNames("lethe", {
                prefix: "front_", start: 1, end: 2
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "front_walk",
            frames: this.anims.generateFrameNames("lethe", {
                prefix: "front_", start: 3, end: 4
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "back_idle",
            frames: this.anims.generateFrameNames("lethe", {
                prefix: "back_", start: 1, end: 2
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "back_walk",
            frames: this.anims.generateFrameNames("lethe", {
                prefix: "back_", start: 3, end: 4
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "L_idle",
            frames: this.anims.generateFrameNames("lethe", {
                prefix: "left_", start: 1, end: 2
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "L_walk",
            frames: this.anims.generateFrameNames("lethe", {
                prefix: "left_", start: 3, end: 2
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "R_idle",
            frames: this.anims.generateFrameNames("lethe", {
                prefix: "right_", start: 1, end: 2
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: "R_walk",
            frames: this.anims.generateFrameNames("lethe", {
                prefix: "right_", start: 3, end: 2
            }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.play("front_idle");
    }

    update () {
        // movement keys
        this.setVelocity(0);
        this.setState(0);        // 0 for still, 1 for moving

        if (keyA.isDown) {
            this.direction = "L";
            this.walk()
        }
        if (keyD.isDown) {
            this.direction = "R";
            this.walk();
        }
        if (keyW.isDown) {
            this.direction = "back";
            this.walk()
        }
        if (keyS.isDown) {
            this.direction = "front";
            this.walk()
        }

        // idle animation
        if (this.state === 0 && this.anims.currentAnim.key != this.direction+"_idle") {
            this.anims.play(this.direction+"_idle")
        }
        
        // walking sound
        if (this.state === 1 && this.isWalking === false){
            this.walkSound.play();
            this.isWalking = true;
        }
        if (this.state === 0) {
            this.walkSound.stop();
            this.isWalking = false;
        } 
        
    }

    walk() {
        this.setState(1);
        // stops restarting animation
        // if (this.state === 1) {
        //     this.input.enabled = false;
        // } else {
        //     this.input.enabled = true;
        // }
        if (this.state === 1 && this.anims.currentAnim.key != this.direction+"_walk") {
            this.anims.play(this.direction+"_walk");
        }
        if (this.direction == "L") {
            this.setVelocityX(-400);
        }
        if (this.direction == "R") {
            this.setVelocityX(400);
        }
        if (this.direction == "front") {
            this.setVelocityY(400);
        }
        if (this.direction == "back") {
            this.setVelocityY(-400);
        }
        

    }
}