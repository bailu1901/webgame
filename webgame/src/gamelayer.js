var WinSize = null;

var GameLayer = cc.Layer.extend(
{
    player:null,
    controllayer:null,
    map:null,
    dir:Dir.None,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        WinSize = cc.director.getWinSize();

        this.player = new Player(res.CloseNormal_png);
        this.addChild(this.player, 0);

        this.map = new MapLayer();
        this.addChild(this.map,-1);

        this.controllayer = new ControlLayer(this);
        this.addChild(this.controllayer);

        this.setupUI();

        this.startGame();

        return true;
    },

    setupUI:function()
    {
        var size = cc.director.getWinSize();

        var closeItem = cc.MenuItemImage.create(
            res.CloseNormal_png,
            res.CloseSelected_png,
            function () {
                cc.log("Menu is clicked!");
                this.startGame();
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
    },

    update:function(dt)
    {
        if(this.dir == Dir.Right)
        {
            this.player.setAcceleration(cc.p(5000,0));
        }
        else if(this.dir == Dir.Left)
        {
            this.player.setAcceleration(cc.p(-5000,0));
        }
        else
        {
            this.player.setAcceleration(cc.p(0,0));
        }

        this.player.update(dt);

        this.map.update(dt);

        var maps = this.map.maps;
        for (var i = 0; i < maps.length; i++) 
        {
            var map = maps[i];
            var TileNumX = map.getMapSize().width;
            var TileNumY = map.getMapSize().height;
            var TileSizeW = map.getTileSize().width;
            var TileSizeH = map.getTileSize().height;
         /*
            var group = map.getObjectGroup("Object Layer 1");
            var array = group.getObjects();
            var dict;
            for (var d = 0, len = array.length; d < len; d++) 
            {
                dict = array[d];
            }
        
        */
            var layers = map.allLayers();

            for (var l=0; l<layers.length; l++)
            {
                var layer = layers[l];
                var tileSize = layer.getTileset()._tileSize;

                for (var j = 0; j < TileNumY; j++) 
                {
                    var y = map.y+j*TileSizeH;
                    if(y>WinSize.height)
                    {
                        break;
                    }

                    if(y+TileSizeH<0)
                    {
                        continue;
                    }

                    for (var k = 0; k < TileNumX; k++) 
                    {
                        var tileGID = layer.getTileGIDAt(cc.p(k, TileNumY-(j+1)));
                        if(0==tileGID)
                        {
                            continue;
                        }

                        var x = map.x+k*TileSizeW;

                        var rc1 = cc.rect(x,y,tileSize.width,tileSize.height);
                        var rc2 = this.player.getCollideRect();
                        if(utility.collide(rc1,rc2))
                        {
                            this.unschedule(this.update);
                            return;
                        }
                    }
                };
            };
        };

        
    },

    onControl:function (dir)
    {
        this.dir = dir;
    },

    startGame:function()
    {       
        this.player.reset(); 
        this.player.attr(
        {                
           x: 270,
           y: 50
        });
        
        this.map.reset();
        this.map.generateMap();

        this.schedule(this.update, 1 / 60);
    }

});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

