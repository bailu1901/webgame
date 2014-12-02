var GameLayer = cc.Layer.extend(
{
    tileboard:null,
    label:null,
    gameover:false,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var VisbleSize = cc.director.getVisibleSize();

        this.tileboard = new TileLayer();
        this.tileboard.setPosition((VisbleSize.width-this.tileboard.getContentSize().width)/2,
        (VisbleSize.height-this.tileboard.getContentSize().height)/2);
        this.addChild(this.tileboard)

        this.setupUI();       
  
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
        var size = cc.director.getVisibleSize();

        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                //this.doStartGame();
                this.doGameOver();
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
        this.label.setColor(cc.color(0,0,0))
        this.label.setFontSize(40);
        this.label.setPosition(size.width/2,size.height-this.label.getFontSize());
        this.label.setString("Score:"+g_GameLogic.score);
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

