var GameLayer = cc.Layer.extend(
{
    snake:null,
    sprite:[],
    controllayer:null,

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

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        var size = cc.director.getWinSize();

        this.snake = cc.Sprite.create(res.CloseNormal_png);
        var pos = utility.mapPos2ScreenPos(Math.floor(g_Tile.Column/2), Math.floor(10/2));
        this.snake.attr(
        {                
           x: pos.x,
           y: pos.y
        });
        this.addChild(this.snake, 0);


        this.sprite = [];

        for(var i=0; i<g_Tile.Column; i++)
        {
            this.sprite[i] = {};
            for(var j=0; j<g_Tile.Row; j++)
            {
                var temp = cc.Sprite.create(res.CloseNormal_png);
                var p = utility.mapPos2ScreenPos(i,j);
                temp.attr(
                {                
                   x: p.x,
                   y: p.y
                });

                this.addChild(temp, 0);
                this.sprite[i][j] = temp;
               
                
            }                                   
        }
       
        this.controllayer = new ControlLayer();
        this.controllayer.gamelayer = this;
        this.addChild(this.controllayer);

        this.schedule(this.update, 1 / 6);

        return true;
    },

    update:function(dt)
    {
        for(var i=0; i<g_Tile.Column; i++)
        {
            for(var j=0; j<g_Tile.Row; j++)
            {
                if(Math.random(1,2)>0.5)
                {
                    this.sprite[i][j].visible = false;
                }
                else
                {
                    this.sprite[i][j].visible = false;
                }
            }            
        }
    },

    onControl:function (dir)
    {
        if(dir == Dir.Right)
        {
            this.snake.x += 50;
        }
        else if(dir == Dir.Left)
        {
            this.snake.x -= 50;
        }
        else if(dir == Dir.Up)
        {
            this.snake.y += 50;
        }
        else if(dir == Dir.Down)
        {
            this.snake.y -= 50;
        }
    },

    onTouchMoved:function (touch, event) 
    {
        var target = event.getCurrentTarget();

        //cc.assert(target._state == PADDLE_STATE_GRABBED, "Paddle - Unexpected state!");

        //var touchPoint = touch.getLocation();
        //touchPoint = cc.director.convertToGL( touchPoint );
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
        
        

    },

    onTouchBegan:function (touch, event) 
    {
        cc.log(this.snake);
        return true;
    },

     onTouchEnded:function (touch, event) 
     {

    },

    test:function()
    {
        cc.log(this);
    }

});

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        this.addChild(layer);
    }
});

