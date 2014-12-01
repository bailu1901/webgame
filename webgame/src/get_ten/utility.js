var Pos = cc.Class.extend(
{
    x:-1,
    y:-1,

    ctor:function()
    {

    }
});

idx2pos=function(n)
{
    var pos = new Pos();
    pos.x = n%NUMBER_COLUMN;
    pos.y = Math.floor(n/NUMBER_COLUMN);
    return pos;
};

pos2idx=function(x,y)
{
    return y*NUMBER_COLUMN+x;
};