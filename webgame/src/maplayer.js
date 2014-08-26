var MapLayer = cc.Layer.extend(
{
    layer:null,
    maps:[],
    offset:0,

    ctor:function ()
    {

        this._super();

        this.layer = cc.Layer.create()
        this.addChild(this.layer);

        this.generateMap();

        return true;
    },

    update:function(dt)
    {
        this.offset-=1;
        this.moveMap();
        this.generateMap();
        this.recycleMap();
    },
    
    moveMap:function()
    {
        for(var i=0; i<this.maps.length; i++)
        {
            var map=this.maps[i];
            if(0==i)
            {
                var y =this.offset*map.getTileSize().height;
                map.setPosition(cc.p(0,y));
            }
            else
            {
                var preMap=this.maps[i-1];
                var y = preMap.getPosition().y+preMap.getMapSize().height*preMap.getTileSize().height;
                map.setPosition(cc.p(0,y));
            }
            
        }
    },

    generateMap:function()
    {
        var size = cc.director.getWinSize();

        do
        {
            var top = 0;
            if(this.maps.length>0)
            {
                var map = this.maps[this.maps.length-1];
                top = map.getPosition().y+map.getMapSize().height*map.getTileSize().height;
            }

            if (top<size.height)
            {
                var map = cc.TMXTiledMap.create("res/1.tmx");
                map.setPosition( cc.p(0,top) );
                this.maps.push(map);
                this.layer.addChild(map);
            }
            else
            {
                break;
            }
        }
        while(true);
    },

    recycleMap:function()
    {
        //var size = cc.director.getWinSize();
        var map = this.maps[0];
        var top = map.getPosition().y+map.getMapSize().height*map.getTileSize().height;
        if( top<=0 )
        {
            for(var i=1; i<this.maps.length; i++)
            {
                this.maps[i-1]=this.maps[i];
            }
            this.maps.length-=1;
            this.layer.removeChild(map);
            this.offset = 0;
        }
    }

});

