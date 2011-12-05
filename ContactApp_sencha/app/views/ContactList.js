/*
console.log("views/ContactList.js is loaded");
contactApp.views.ContactList = Ext.extend(Ext.Panel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Contacts'
    }],
    layout: 'fit',
    items: [{
        xtype: 'list',
        // models을 지정한다.
        store: contactApp.stores.contacts,
        itemTpl: '{givenName} {familyName}',
        onItemDisclosure: function (record) {
            Ext.dispatch({
            	// 컨트롤러의 show()함수에 연결된다.
                controller: contactApp.controllers.contacts,
                action: 'show',
                id: record.getId()
            });
        }
    }],
    initComponent: function() {
    	console.log("view::ContactList() is called START");
        contactApp.stores.contacts.load();
        contactApp.views.ContactList.superclass.initComponent.apply(this, arguments);
        console.log("view::ContactList() is called END");
    }
});
*/