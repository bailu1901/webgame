cc.game.onStart = function(){
    //cc.view.setDesignResolutionSize(g_Window.Width, g_Window.Height, cc.ResolutionPolicy.SHOW_ALL);

    cc.view.adjustViewPort(true);
    if (cc.sys.isMobile)
        cc.view.setDesignResolutionSize(g_Window.Width,g_Window.Height,cc.ResolutionPolicy.FIXED_WIDTH);
    else cc.view.setDesignResolutionSize(g_Window.Width,720,cc.ResolutionPolicy.SHOW_ALL);

	cc.view.resizeWithBrowserSize(true);
    //load resources
    cc.LoaderScene.preload(g_resources, function () {
        cc.director.runScene(new GameScene());
    }, this);
};
cc.game.run();