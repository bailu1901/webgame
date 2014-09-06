var maxVelocity = 200;
var decrease = 10;

var Player = cc.Sprite.extend(
{
    acceleration:cc.p(0,0),
    velocity:cc.p(0,0),
    collideRect:cc.rect(0,0,0,0),

    ctor:function (res) {

        this._super(res);
        this.reset();

        return true;
    },

    update:function(dt)
    {


        this.velocity.x+=this.acceleration.x*dt;
        this.velocity.x = Math.min(this.velocity.x,maxVelocity);
        this.velocity.x = Math.max(this.velocity.x,-maxVelocity);
        //this.velocity.y+=this.acceleration.y*dt;

        this.x+=this.velocity.x*dt;
        this.y+=this.velocity.y*dt;

        this.acceleration.x = 0;

        if(this.velocity.x>0)
        {
            this.velocity.x-=decrease;
            if(this.velocity.x<0)
            {
                this.velocity.x = 0;
            }
        }
        else if(this.velocity.x<0)
        {
            this.velocity.x+=decrease;
            if(this.velocity.x>0)
            {
                this.velocity.x = 0;
            }
        }

        var w = this.width, h = this.height;
        this.collideRect = cc.rect(this.x - w / 2, this.y - h / 2, w, h / 2); 
    },

    getCollideRect:function()
    {
        return this.collideRect;
    },

    setAcceleration:function (acc)
    {     
        this.acceleration = acc;
    },

    reset:function()
    {
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        this.velocity.x = 0;
        this.velocity.y = 0;
    }


});


