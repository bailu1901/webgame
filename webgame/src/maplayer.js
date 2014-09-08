var MapLayer = cc.Layer.extend(
{
    layer:null,
    maps:[],
    velocity:cc.p(0,-150),

    ctor:function ()
    {
        this._super();

        this.layer = cc.Layer.create()
        this.addChild(this.layer);

        return true;
    },

    update:function(dt)
    {
        /*
        for(var i=0; i<this.maps.length; i++)
        {
            var map=this.maps[i];
            map.x+=this.velocity.x*dt;
            map.y+=this.velocity.y*dt;
        }
        */
        this.x+=this.velocity.x*dt;
        this.y+=this.velocity.y*dt;
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
            
            var y = map.y+map.getMapSize().height*map.getTileSize().height;
            if(y>top)
            {
                top = y;
            }

            var x = map.x+map.getMapSize().width*map.getTileSize().width;
            if(x>right)
            {
                right = x;
            }
        }

        var positionInWorld = this.convertToWorldSpace();
        while(positionInWorld.y+top<size.height || positionInWorld.x+right<size.width)
        {
            var map = null;
            if(positionInWorld.y+top<size.height)
            {
                map = cc.TMXTiledMap.create("res/1.tmx");
                map.setPosition( cc.p(0,top) );

                top+=map.getMapSize().height*map.getTileSize().height;;

                var offset = map.getMapSize().width*map.getTileSize().width;
                if(right<offset)
                {
                    right = offset;
                }
            }
            else if (positionInWorld.x+right<size.width)
            {
                map = cc.TMXTiledMap.create("res/1.tmx");
                map.setPosition( cc.p(right,0) );

                right+=map.getMapSize().width*map.getTileSize().width;

                var offset = map.getMapSize().height*map.getTileSize().height;
                if(top<offset)
                {
                    top = offset;
                }
            };
                      
            this.maps.push(map);
            this.layer.addChild(map);

            
            
        }

    },

    recycleMap:function()
    {
        //var size = cc.director.getWinSize();
        for(var i=0; i<this.maps.length; i++)
        {
            var map = this.maps[i];
            var positionInWorld = map.convertToWorldSpace();
            var top = positionInWorld.y+map.getMapSize().height*map.getTileSize().height;
            var right = positionInWorld.x+map.getMapSize().width*map.getTileSize().width;
            if(top<0 || right<0)
            {
                this.layer.removeChild(map);
                this.maps.splice(i,1);
                i--;
            }                
        }      
    },

    reset:function()
    {
        this.x = 0;
        this.y = 0;
        this.layer.removeAllChildren();
        this.maps.length=0;
    }
});

