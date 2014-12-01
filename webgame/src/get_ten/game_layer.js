var WinSize = null;

var GameLayer = cc.Layer.extend(
{
    tileboard:null,
    label:null,
    gameover:false,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        WinSize = cc.director.getWinSize();

        this.setupUI();       

        this.tileboard = new TileLayer();
        this.tileboard.setPosition(0,100);
        this.addChild(this.tileboard)
        
        this.doStartGame();

        this.schedule(this.update, 1);

        return true;
    },

    updateGameUI:function()
    {

        for (var i = 0; i <NUMBER_ROW*NUMBER_COLUMN; i++) {  
                
            var tile = this.itemArray[i];
            tile.setTag(i);
            tile.setNum(g_GameLogic.data[i]);                
        }

        this.label.setString("Score:"+g_GameLogic.score);
    },

    setupUI:function()
    {
        var size = cc.director.getWinSize();

        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                this.doStartGame();
                //this.doGameOver();
            }, this);

        closeItem.attr({
            x: size.width - 40,
            y: size.height-40,
            anchorX: 0.5,
            anchorY: 0.5,
            scale:2
        });

        var menu = cc.Menu.create(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu);

        this.label = cc.LabelTTF.create();
        this.label.setFontSize(40);
        this.label.setPosition(size.width/2,size.height-60);
        this.addChild(this.label);
    },

    update:function(dt)
    {
        if (false==this.gameover) {
            if( g_GameLogic.checkover() ){
                this.doGameOver();
            }
        };
    },

    doStartGame:function()
    {       
        g_GameLogic.reset(); 
        this.tileboard.reset();
        this.gameover = false;
    },

    doGameOver:function()
    {
        this.gameover = true;
        layer = new GameOverLayer();
        this.addChild(layer);
    },

});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

