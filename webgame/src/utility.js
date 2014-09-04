var utility = {
	collide:function (a, b) 
    {
        return cc.rectIntersectsRect(a, b);
    }
};

	utility.mapPos2ScreenPos = function (x,y)
	{
		return cc.p((x+0.5)*g_TileSize.Width,(y+0.5)*g_TileSize.Height);
	};


