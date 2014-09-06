var WinSize = null;

var GameLayer = cc.Layer.extend(
{
    player:null,
    controllayer:null,
    map:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        WinSize = cc.director.getWinSize();

        this.player = new Player(res.CloseNormal_png);
        this.addChild(this.player, 0);

        this.map = new MapLayer();
        this.addChild(this.map,-1);

        this.controllayer = new ControlLayer();
        this.controllayer.gamelayer = this;
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
                /*
                var pos = utility.mapPos2ScreenPos(Math.floor(g_Tile.Column/2), Math.floor(10/2));
                this.player.attr(
                {                
                   x: pos.x,
                   y: pos.y
                });
                */

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
        this.map.update(dt);

        var maps = this.map.maps;
        for (var i = 0; i < maps.length; i++) 
        {
            var map = maps[i];
            var TileNumX = map.getMapSize().width;
            var TileNumY = map.getMapSize().height;
            var TileSizeW = map.getTileSize().width;
            var TileSizeH = map.getTileSize().height;
         
            var group = map.getObjectGroup("Object Layer 1");
            var array = group.getObjects();
            var dict;
            for (var i = 0, len = array.length; i < len; i++) 
            {
                dict = array[i];
            }

            var layers = map.allLayers();
            for (var l=0; l<layers.length; l++)
            {
                var layer = layers[l];
                
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

                        var rc1 = cc.rect(x,y,TileSizeW,TileSizeH);
                        var rc2 = this.player.collideRect();
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
        if(dir == Dir.Right)
        {
            this.player.x += 50;
        }
        else if(dir == Dir.Left)
        {
            this.player.x -= 50;
        }
        else if(dir == Dir.Up)
        {
            this.player.y += 50;
        }
        else if(dir == Dir.Down)
        {
            this.player.y -= 50;
        }
    },

    startGame:function()
    {
        //var group = map.getObjectGroup("Object Group 1");
        //var array = group.getObjects();
        //var dict;
        
        this.player.attr(
        {                
           x: 300,
           y: 200
        });
        this.schedule(this.update, 1 / 60);
        this.map.reset();
        this.map.generateMap();
    }

});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

