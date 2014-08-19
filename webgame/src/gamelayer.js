var GameLayer = cc.Layer.extend(
{
    snake:null,
    sprite:[],
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
                //cc.log(p);
                temp.attr(
                {                
                   x: p.x,
                   y: p.y
                });

                this.addChild(temp, 0);
                this.sprite[i][j] = temp;
               
                
            }                                   
        }
       
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
        this.sprite[5][6].visible = true;
        this.sprite[5][6].x += 1;

        this.test();
    },

    onTouchMoved:function (touch, event) 
    {
        //var target = event.getCurrentTarget();

        //cc.assert(target._state == PADDLE_STATE_GRABBED, "Paddle - Unexpected state!");

        //var touchPoint = touch.getLocation();
        //touchPoint = cc.director.convertToGL( touchPoint );
        
        //var delta = Math.abs(event.getDeltaX())>Math.abs(event.getDeltaY()) ? event.getDeltaX() : event.getDeltaY()
        
        cc.log(this.snake);
        //this.snake.x = 100;//this.snake.x+10;
        //this.sprite[5][5].x = this.sprite[i][j].x+20;
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

