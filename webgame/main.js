cc.game.onStart = function(){
    cc.view.setDesignResolutionSize(g_Window.Width, g_Window.Height, cc.ResolutionPolicy.SHOW_ALL);
	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();