var GameLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();
        /*
        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
            }, this);
        closeItem.attr({
            x: size.width - 20,
            y: 20,
            anchorX: 0.5,
            anchorY: 0.5
        });

        var menu = cc.Menu.create(closeItem);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);

        /////////////////////////////
        // 3. add your codes below...
        // add a label shows "Hello World"
        // create and initialize a label
        var helloLabel = cc.LabelTTF.create("2BBBBBB", "Arial", 38);
        // position the label on the center of the screen
        helloLabel.x = size.width / 2;
        helloLabel.y = 0;
        // add the label as a child to this layer
        this.addChild(helloLabel, 5);

        // add "HelloWorld" splash screen"
        this.sprite = cc.Sprite.create(res.HelloWorld_png);
        this.sprite.attr({
            x: size.width / 2,
            y: size.height / 2,
            scale: 0.5,
            rotation: 180
        });
        this.addChild(this.sprite, 0);

        var rotateToA = cc.RotateTo.create(2, 0);
        var scaleToA = cc.ScaleTo.create(2, 1, 1);

        this.sprite.runAction(cc.Sequence.create(rotateToA, scaleToA));
        helloLabel.runAction(cc.Spawn.create(cc.MoveBy.create(2.5, cc.p(0, size.height - 40)),cc.TintTo.create(2.5,255,125,0)));
        */
        this.sprite = {};

        for(var i=0; i<g_Tile.Column; i++)
        {
            this.sprite[i] = {};
            for(var j=0; j<g_Tile.Row; j++)
            {
                var temp = cc.Sprite.create(res.CloseNormal_png);
                var p = utility.mapPos2ScreenPos(i,j);
                //cc.log(p);
                 temp.attr(
                 {                
                    x: p.x,
                    y: p.y
                 });

                this.addChild(temp, 0);
                this.sprite[i][j] = temp;
               
                
            }                                   
        }
        
        this.schedule(this.update, 1 / 6);

        return true;
    },

    update:function(dt)
    {
        for(var i=0; i<g_Tile.Column; i++)
        {
            for(var j=0; j<g_Tile.Row; j++)
            {
                if(Math.random(1,2)>0.5)
                {
                    this.sprite[i][j].visible = true;
                }
                else
                {
                    this.sprite[i][j].visible = false;
                }
            }            
        }
        
    }


});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

