var MapLayer = cc.Layer.extend(
{
    maxmap:3,
    layer:null,
    currentmap:null,
    maps:[],
    offset:0,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var size = cc.director.getWinSize();

        this.layer = cc.Layer.create()
        this.addChild(this.layer);
/*
        currentmap = cc.TMXTiledMap.create("res/1.tmx");
        layer.addChild(map);

        length = currentmap.getMapSize();

        nextmap =  cc.TMXTiledMap.create("res/1.tmx");
        nextmap.setPosition(cc.p(0,length));
        layer.addChild(nextmap);

        for(int i=0; i<maxmap; i++)
        {
            maps[i] = null;
        }
*/
            var map = cc.TMXTiledMap.create("res/1.tmx");
            this.maps.push(map);

            this.layer.addChild(map);

        return true;
    },

    update:function(dt)
    {
        this.offset-=40;
        this.layer.setPosition(cc.p(0,this.offset));
        this.generateMap();
        this.recycleMap();
    },

    generateMap:function()
    {
    /*
        if(maps.length>=maxmap)
        {
            return;
        }

        var map = cc.TMXTiledMap.create("res/1.tmx");

        maps[maps.length]
        */
        var bNeed = false;

        var total = 0
        for(var i=0; i<this.maps.length; i++)
        {
            var map = this.maps[i];
            total+=map.getMapSize().height*map.getTileSize().height;
        }

        var size = cc.director.getWinSize();
        var len=0;
        if(this.maps.length>0)
        {
            len = total-(this.maps[0].getPosition().y-this.offset);
        }
        
        if(len<=size.height*3)
        {
            var map = cc.TMXTiledMap.create("res/1.tmx");
            var height = +map.getMapSize().height*map.getTileSize().height;
            map.setPosition( cc.p(0,this.maps[this.maps.length-1].getPosition().y+height) );
            this.maps.push(map);

            this.layer.addChild(map);
        }


    },

    recycleMap:function()
    {
        var size = cc.director.getWinSize();

        var map = this.maps[0];
        if( this.offset+map.getPosition().y+map.getMapSize().height*map.getTileSize().height <-size.height)
        {
            for(var i=1; i<this.maps.length; i++)
            {
                this.maps[i-1]=this.maps[i];
            }
            this.maps.length-=1;
            this.layer.removeChild(map);
        }
    }

});

