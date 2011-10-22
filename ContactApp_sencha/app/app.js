Ext.regApplication({
    name: 'contactApp',
    launch: function() {
        this.launched = true;
        this.mainLaunch();
    },
    mainLaunch: function() {
        if (!device || !this.launched) {return;}
        console.log('mainLaunch start');
        this.views.viewport = new this.views.Viewport();
        console.log('mainLaunch end');
    }
});