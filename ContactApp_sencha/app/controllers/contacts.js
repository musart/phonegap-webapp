/*
console.log("controllers/contacts.js is loaded");
contactApp.controllers.contacts = new Ext.Controller({
	// ContactDetail.js의 back에 연결된다.
    index: function(options) {
    	console.log("controller::index() is called");
        contactApp.views.viewport.setActiveItem(
            contactApp.views.contactList, options.animation
        );
    },
    // ContactList.js의 각 아이템 연결된다.
    show: function(options) {
    console.log("controller::show() is called");
	    var id = parseInt(options.id),
	        contact = contactApp.stores.contacts.getById(id);
	    if (contact) {
	        contactApp.views.contactDetail.refreshContactData(contact);
	        contactApp.views.viewport.setActiveItem(
	            contactApp.views.contactDetail, options.animation
	        );
	    }
    }
});
*/