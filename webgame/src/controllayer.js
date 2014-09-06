var ControlLayer = cc.Layer.extend(
{
    gamelayer:null,
    dir:Dir.None,

    ctor:function (gamelayer) {
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

        this.gamelayer = gamelayer;

        this.label = cc.LabelTTF.create();
        this.label.x = 200;
        this.label.y = 300;
        this.addChild(this.label);

        return true;
    },

    onTouchBegan:function (touch, event) 
    {
        var target = event.getCurrentTarget();

        var p = touch.getLocation();
        var size = cc.director.getWinSize();
        if(p.x<size.width/2)
        {
            target.gamelayer.onControl(Dir.Left);
        }
        else if(p.x>size.width/2)
        {
            target.gamelayer.onControl(Dir.Right);
        }

        return true;
    },

    onTouchMoved:function (touch, event) 
    {
        /*
        var target = event.getCurrentTarget();
        
        if(!target.process)
        {
            return;
        }
        target.process = false;

        var dir = Dir.None;
        var delta = touch.getDelta();
        cc.log(delta);
        if(0==delta.y)
        {
            if(delta.x>0)
            {
                dir = Dir.Right;
            }
            else if(delta.x<0)
            {
                dir = Dir.Left;
            }
        }
        else
        {
            var angle = cc.pToAngle(delta);
            cc.log(angle);
            var Pi = 3.14159;
            if(angle<0)
            {
                angle+=2*Pi;
            }

            if(angle>0 && angle<=Pi/4)
            {
                dir = Dir.Right;
            }
            else if(angle>Pi/4 && angle<=3*Pi/4)
            {
                dir = Dir.Up;
            }
            else if(angle>3*Pi/4 && angle<=5*Pi/4)
            {
                dir = Dir.Left;
            }
            else if(angle>5*Pi/4 && angle<=7*Pi/4)
            {
                dir = Dir.Down;
            }
            else if(angle>7*Pi/4 && angle<=2*Pi)
            {
                dir = Dir.Right;
            }
        }
        target.label.setString("x:"+delta.x+"   y:"+delta.y);
        
        target.gamelayer.onControl(dir);
        */
    },

    onTouchEnded:function (touch, event) 
    {
        var target = event.getCurrentTarget();
        target.gamelayer.onControl(Dir.None);
    }
});
