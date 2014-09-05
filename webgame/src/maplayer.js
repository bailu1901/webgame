var MapLayer = cc.Layer.extend(
{
    layer:null,
    maps:[],
    velocity:cc.p(-150,0),

    ctor:function ()
    {
        this._super();

        this.layer = cc.Layer.create()
        this.addChild(this.layer);

        return true;
    },

    update:function(dt)
    {
        for(var i=0; i<this.maps.length; i++)
        {
            var map=this.maps[i];
            map.x+=this.velocity.x*dt;
            map.y+=this.velocity.y*dt;
        }
        this.recycleMap();
        this.generateMap();  
    },

    generateMap:function()
    {
        var size = cc.director.getWinSize();

        var top = 0, right = 0;
        for(var i=0; i<this.maps.length; i++)
        {
            var map = this.maps[i];
            var y = map.getPosition().y+map.getMapSize().height*map.getTileSize().height;
            if(y>top)
            {
                top = y;
            }

            var x = map.getPosition().x+map.getMapSize().width*map.getTileSize().width;
            if(x>right)
            {
                right = x;
            }
        }

        if(top<=size.height)
        {
            var map = cc.TMXTiledMap.create("res/1.tmx");
            map.setPosition( cc.p(0,top) );
            this.maps.push(map);
            this.layer.addChild(map);
        }

        if(right<=size.width)
        {
            var map = cc.TMXTiledMap.create("res/1.tmx");
            map.setPosition( cc.p(right,0) );
            this.maps.push(map);
            this.layer.addChild(map);
        }

        /*
       
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
        */
    },

    recycleMap:function()
    {
        //var size = cc.director.getWinSize();
        for(var i=0; i<this.maps.length; i++)
        {
            var map = this.maps[i];
            var top = map.getPosition().y+map.getMapSize().height*map.getTileSize().height;
            if(top>=0)
            {
                continue;
            }

            var right = map.getPosition().x+map.getMapSize().width*map.getTileSize().width;
            if(right>=0)
            {
                continue;
            }

            this.layer.removeChild(map);
            this.maps.splice(i,1);
            i--;        
        }      
    },

    reset:function()
    {
        this.layer.removeAllChildren();
        this.maps.length=0;
    }
});

