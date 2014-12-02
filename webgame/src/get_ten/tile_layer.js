var PIX_OFFSET_PUSHDOWN=10;

var Tile = cc.Node.extend({
    layer:null,
    label:null,
    bPushDown:false,

    ctor:function () {
        this._super();

        this.layer = cc.LayerColor.create(cc.color(0, 0, 0,255),TILE_WIDTH,TILE_HEIGHT);
        this.addChild(this.layer);
        var size = this.layer.getContentSize();
        this.setContentSize(size);

        this.label = cc.LabelTTF.create();
        this.label.setFontSize(45);
        this.label.setColor(cc.color(0,0,0));
        this.addChild(this.label);
        this.label.setPosition(size.width/2,size.height/2)

    },

    setNum:function(_n)
    {
        this.layer.setColor(ColArray[_n]);
        this.label.setString(_n);
    },

    rect: function () {
        var locPosition = this._position, locContentSize = this._contentSize, locAnchorPoint = this._anchorPoint;
        return cc.rect(locPosition.x - locContentSize.width * locAnchorPoint.x,
            locPosition.y - locContentSize.height * locAnchorPoint.y,
            locContentSize.width, locContentSize.height);
    },

    isPushDown:function()
    {
        return this.bPushDown;
    },

    pushDown:function()
    {
        if (!this.isPushDown()) {
            var pos = this.getPosition();
            this.setPosition(pos.x-PIX_OFFSET_PUSHDOWN,pos.y-PIX_OFFSET_PUSHDOWN);
            this.setLocalZOrder(-1);
            this.bPushDown = true;
        }
    },

    popUp:function()
    {
        if (this.isPushDown()) {
            var pos = this.getPosition();
            this.setPosition(pos.x+PIX_OFFSET_PUSHDOWN,pos.y+PIX_OFFSET_PUSHDOWN);
            this.setLocalZOrder(0);
            this.bPushDown = false;  
        };        
    },
});

var TileLayer = cc.Node.extend(
{
    itemArray:null,

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.itemArray = new Array();

        for (var i = 0; i <NUMBER_ROW*NUMBER_COLUMN; i++) {                    
                var tile = new Tile();
                
                var pos = idx2pos(i);
                tile.setPosition(TILE_WIDTH*pos.x,TILE_HEIGHT*pos.y);

                this.itemArray[i] = tile;
                this.addChild(tile);         
        }

        cc.eventManager.addListener({
                    event: cc.EventListener.TOUCH_ONE_BY_ONE,
                    swallowTouches: true,
                    onTouchBegan: this.onTouchBegan,
                    onTouchMoved: this.onTouchMoved,
                    onTouchEnded: this.onTouchEnded
                }, this);

        this.setContentSize(cc.size(NUMBER_ROW*TILE_WIDTH,NUMBER_COLUMN*TILE_HEIGHT));
        //this.schedule(this.update, 8);

        return true;
    },

    reset:function()
    {
        this.refrsh();
    },

    onTouchBegan:function (touch, event) {
        var target = event.getCurrentTarget();
        var touchLocation = touch.getLocation();
        var local = target.convertToNodeSpace(touchLocation);
        for (var i = 0; i <NUMBER_ROW*NUMBER_COLUMN; i++) { 
            var tile = target.itemArray[i];
            
            var r = tile.rect();

            if (cc.rectContainsPoint(r, local)) {
                var array = new Array();
                g_GameLogic.check(i,Dir.None,array);
                target.pushDown(array);
                return true;
            }
                        
        }
        return false;

    },

    onTouchMoved:function (touch, event) {
        var target = event.getCurrentTarget();
        var touchLocation = touch.getLocation();
        var local = target.convertToNodeSpace(touchLocation);
        for (var i = 0; i <NUMBER_ROW*NUMBER_COLUMN; i++) { 
            var tile = target.itemArray[i];

            var r = tile.rect();

            if (cc.rectContainsPoint(r, local)) {
                var array = new Array();
                g_GameLogic.check(i,Dir.None,array);
                target.pushDown(array);
                break;
            }                        
        }
    },

    onTouchEnded:function (touch, event) {
        var target = event.getCurrentTarget();
        var touchLocation = touch.getLocation();
        var local = target.convertToNodeSpace(touchLocation);

        target.popUpAll();

        for (var i = 0; i <NUMBER_ROW*NUMBER_COLUMN; i++) { 
            var tile = target.itemArray[i];
            var r = tile.rect();
            
            if (cc.rectContainsPoint(r, local)) {
                var array = g_GameLogic.dispose(i);
                if (array.length>1) {
                    target.doTileFadeOut(array);
                };
                break;
            }                        
        }
    },

    refrsh:function()
    {
        for (var i = 0; i <NUMBER_ROW*NUMBER_COLUMN; i++) {              
            var tile = this.itemArray[i];
            tile.setNum(g_GameLogic.data[i]);
            tile.popUp();
        }
    },

    pushDown:function(array)
    {
        this.popUpAll();
        for (var i = 0; i <array.length; i++) {              
            var tile = this.itemArray[array[i]];
            tile.pushDown();
        }
    },

    popUpAll:function()
    {
        for (var i = 0; i <NUMBER_ROW*NUMBER_COLUMN; i++) {              
            var tile = this.itemArray[i];
            tile.popUp();
        }
    },

    update:function(dt)
    {
        if (g_GameLogic.fallDownByStep()) {
            this.refrsh();
        }
        else {
            this.unschedule(this.update);
        }
        
    },

    doTileFadeOut:function(array)
    {
        var n1 = array[0];
        var act = cc.sequence(cc.delayTime(0.1),
            cc.callFunc(this.onTileFadeOutOver, this, n1));

        this.itemArray[n1].runAction(act);

        //this.updateGameUI();
        for (var i = 1; i < array.length; i++) {
            var tile = this.itemArray[array[i]];
            //tile.runAction(cc.sequence(cc.scaleTo(0.1,0.9),cc.hide(),cc.scaleTo(0.0,1),cc.show()));
        };
    },

    onTileFadeOutOver:function(nodeExecutingAction, value)
    {
        this.itemArray[value].setNum(g_GameLogic.data[value]);
        //g_GameLogic.falldown();
        this.schedule(this.update, 1/10);
        this.refrsh();
    }

});

