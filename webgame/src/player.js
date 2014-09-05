var Player = cc.Sprite.extend(
{
    velocity:cc.p(0,1),

    ctor:function (res) {

        this._super(res);

        return true;
    },

    update:function(dt)
    {
        var pt = cc.p(this.velocity.x*dt,this.velocity.y*dt);
        this.setPosition(this.getPosition()+pt);
    },

    collideRect:function()
    {
        var w = this.width, h = this.height;
        return cc.rect(this.x - w / 2, this.y - h / 2, w, h / 2);
    },

    onControl:function (dir)
    {
        /*
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
        */
    },



});


