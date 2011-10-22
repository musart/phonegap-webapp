contactApp.views.ContactsList = Ext.extend(Ext.Panel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Contacts'
    }],
    layout: 'fit',
    items: [{
        xtype: 'list',
        store: contactApp.stores.contacts,
        itemTpl: '{givenName} {familyName}',
        onItemDisclosure: function (record) {
            //Ext.dispatch({
            //    controller: contactApp.controllers.contacts,
            //    action: 'show',
            //    id: record.getId()
            //});
        }
    }],
    initComponent: function() {
        contactApp.stores.contacts.load();
        contactApp.views.ContactsList.superclass.initComponent.apply(this, arguments);
    }
});