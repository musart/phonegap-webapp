contactApp.views.Viewport = Ext.extend(Ext.Panel, {
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',
    initComponent: function() {
        //put instances of cards into contactApp.views namespace
        console.log("contactApp.views.Viewport initComponent START");
        console.log(contactApp.mainLaunch);
        Ext.apply(contactApp.views, {
            contactsList: new contactApp.views.ContactsList(),
            //contactDetail: new contactApp.views.ContactDetail(),
            //contactForm: new contactApp.views.ContactForm()
        });
        //put instances of cards into viewport
        Ext.apply(this, {
            items: [
                contactApp.views.contactsList,
                //contactApp.views.contactDetail,
                //contactApp.views.contactForm,
            ]
        });
        contactApp.views.Viewport.superclass.initComponent.apply(this, arguments);
        console.log("contactApp.views.Viewport initComponent END");
    }
});