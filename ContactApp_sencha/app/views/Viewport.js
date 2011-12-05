console.log("views/Viewport.js is loaded");
contactApp.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        //put instances of cards into contactApp.views namespace
        console.log("contactApp.views.Viewport initComponent START");
        console.log(contactApp.mainLaunch);
        Ext.apply(contactApp.views, {
            contactList: new contactApp.views.ContactList(),
            contactDetail: new contactApp.views.ContactDetail()
        });
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                contactApp.views.contactList,
                contactApp.views.contactDetail
            ]
        });
        contactApp.views.Viewport.superclass.initComponent.apply(this, arguments);
        console.log("contactApp.views.Viewport initComponent END");
    }
});