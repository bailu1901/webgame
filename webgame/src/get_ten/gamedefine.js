var g_Window =
{
    Width : 480,
    Height : 750
};

var Dir = 
{
    None : -1,
    Up : 0,
    Right : 1,
    Down : 2,
    Left : 3,

    Total : 4
};

var NUMBER_COLUMN = 5;
var NUMBER_ROW = 5;

var TILE_WIDTH = 70;//g_Window.Width/5;
var TILE_HEIGHT =TILE_WIDTH ;

var ColArray = new Array();
ColArray[-1] = cc.color(0, 0, 0,255);
ColArray[1] = cc.color(255, 0, 0,255);
ColArray[2] = cc.color(255, 255, 0,255);
ColArray[3] = cc.color(255, 255, 255,255);
ColArray[4] = cc.color(255, 0, 255,255);
ColArray[5] = cc.color(0, 128, 0,255);
ColArray[6] = cc.color(0, 255, 0,255);
ColArray[7] = cc.color(0, 0, 255,255);
ColArray[8] = cc.color(255, 0, 0,255);
ColArray[9] = cc.color(0, 255, 255,255);
ColArray[10] = cc.color(255, 0, 255,255);