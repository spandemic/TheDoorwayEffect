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
        let {playScene}=data;
        //this.playScene=playScene;
        //this.inventory =playScene.player.inventory;

    }
    get tilesize(){
        return this._tileSize *this.uiScale;
    }
    refresh(){
        for (let index =0; index <this.maxColumn*this.rows;index++){
            let x =this.game.config.width/4+((index%this.maxColumn)*(this.tilesize+this.space));
            let y =this.game.config.heigh/4+Math.floor(index/this.maxColumn)*(this.tilesize+this.space);
            let slots =this.add.sprite(0,0,"Inventorybox");
            slots.setScale(this.uiScale);
           

        }
    }
    create(){
        keyTAB= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB);
        this.refresh();

      

    }
    update(){

        if (Phaser.Input.Keyboard.JustDown(keyTAB)) {
            this.scene.stop();
            this.scene.wake('playScene')
          
        }
    }
        
       






}

