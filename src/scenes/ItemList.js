class ItemList extends Phaser.Scene {

    constructor() {
        super("ItemList");
        this.maxColumn =5;
        this.maxRole =3;
        this.rows =1;
        this.uiScale =1.5;
        this.space =5;
        this.margin =6;
        this._tilesize =32;
        this.slots =[];


    }
    init(data){
        //let {playScene}=data;
        //this.playScene=playScene;
        //this.inventory =playScene.player.inventory;

    }
    get tilesize(){
        return this._tileSize *this.uiScale;
    }
    refresh(){
        for (let index =0; index <this.maxColumn*this.rows;index++){
            let x =this.margin+this._tilesize*2+(index*(this._tilesize+ this.space*5));
            let y =this.margin+this._tilesize;
            let slots =this.add.sprite(x,y,"Inventorybox");
            slots.setScale(this.uiScale);
        }
    }
    create(){
        keyTAB= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.refresh();

    }
    update() {

        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.sleep();
            this.scene.wake('playScene')
          
        }
    }
        
       






}

