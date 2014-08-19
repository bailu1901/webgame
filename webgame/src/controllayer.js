var ControlLayer = cc.Layer.extend(
{
    process:true,
    gamelayer:[],

    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan:function (touch, event) 
    {
        return true;
    },

    onTouchMoved:function (touch, event) 
    {
        var target = event.getCurrentTarget();

        if(!target.process)
        {
            return;
        }
        target.process = false;

        var dir = Dir.None;
        var deltaX = touch.getDelta().x;
        var deltaY = touch.getDelta().y;
        if( Math.abs(deltaX)>Math.abs(deltaY) )
        {
            if(deltaX>0)
            {
                dir = Dir.Right;
            }
            else if(deltaX<0)
            {
                dir = Dir.Left;
            }
        }
        else
        {
            if(deltaY>0)
            {
                dir = Dir.Up;
            }
            else if(deltaY<0)
            {
                dir = Dir.Down;
            }
        }
      
        target.gamelayer.onControl(dir);
    },

    onTouchEnded:function (touch, event) 
    {
        var target = event.getCurrentTarget();
        target.process = true;
    },
});
