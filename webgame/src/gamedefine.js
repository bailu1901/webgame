var g_Window =
{
    Width : 320,
    Height : 480
};

var g_Tile =
{
    Row : 10,
    Column : 10
};
g_Tile.Total = g_Tile.Row*g_Tile.Column;

var g_TileSize =
{
    Width : g_Window.Width/g_Tile.Column,
    Height : g_Window.Height/g_Tile.Row
};

