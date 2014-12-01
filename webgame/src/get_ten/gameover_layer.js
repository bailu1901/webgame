var GameOverLayer = cc.Layer.extend(
{
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        layer = cc.LayerColor.create(cc.color(0, 0, 0,128));
        this.addChild(layer);
        label = cc.LabelTTF.create();
        label.setFontSize(60);
        label.setString("Shiiiiit!");
        label.setColor(cc.color(255,0,0));
        label.setPosition(WinSize.width/2,WinSize.height/2);
        layer.addChild(label);
        var act = cc.sequence(cc.scaleTo(0.6,1.3),cc.scaleTo(0.6,1.0)).repeatForever();
        label.runAction(act)

        label1 = cc.LabelTTF.create();
        label1.setFontSize(30);
        label1.setString("Your Score is:"+g_GameLogic.score);
        label1.setColor(cc.color(0,255,0));
        label1.setPosition(WinSize.width/2,WinSize.height/2-100);
        layer.addChild(label1);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);

        return true;
    },

    onTouchBegan:function (touch, event) {
        var target = event.getCurrentTarget();

        return true;
    },

    onTouchMoved:function (touch, event) {
        
    },

    onTouchEnded:function (touch, event) {
        var target = event.getCurrentTarget();
        target.getParent().doStartGame();
        target.removeFromParent();
    }

});
