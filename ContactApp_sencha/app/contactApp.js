console.log("contactApp.js is loaded");
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

/***
 * controllers/contacts.js
 */
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

/**
 * models/Contact.js
 */
console.log("models/Contact.js is loaded");
Ext.data.ProxyMgr.registerType("contactstorage",
    Ext.extend(Ext.data.Proxy, {
        create: function(operation, callback, scope) {
        	console.log("model::create() is called");
        },
        read: function(operation, callback, scope) {
        	console.log("model::read() is called");
		    var thisProxy = this;
		    
		    //loop over deviceContacts and create Contact model instances
		    
		    //if(navigator.userAgent.toLowerCase().indexOf('chrome') != -1) {
		    if(!Ext.is.Phone) {
		            ///// temporary START
		            var contacts = [];
		            for (var i = 0; i < 2/*deviceContacts.length*/; i++) {
		                //var deviceContact = deviceContacts[ i ];
		                var contact = new thisProxy.model({
		                    id: 12,
		                    givenName: "Phone",
		                    familyName: "Gap",
		                    emails: {"type":"work", "value":"sales@nitobi.com"},
		                    phoneNumbers: [{"type":"work", "value":"1-866-632-2777"},
		                    			{"type":"fax", "value":"(604) 357-1678"}]
		                });
		                contacts.push(contact);
		            }
		            //return model instances in a result set
		            operation.resultSet = new Ext.data.ResultSet({
		                records: contacts,
		                total  : contacts.length,
		                loaded : true
		            });
		            //announce success
		            operation.setSuccessful();
		            operation.setCompleted();
		            //finish with callback
		            if (typeof callback == "function") {
		                callback.call(scope || thisProxy, operation);
		            }
		            ///// temporary END
		    } else {
		    
		    navigator.contacts.find(
		        ['id', 'name', 'emails', 'phoneNumbers'],
		        function(deviceContacts) {
		            //loop over deviceContacts and create Contact model instances
		            var contacts = [];
		            for (var i = 0; i < deviceContacts.length; i++) {
		                var deviceContact = deviceContacts[ i ];
		                var contact = new thisProxy.model({
		                    id: deviceContact.id,
		                    givenName: deviceContact.name.givenName,
		                    familyName: deviceContact.name.familyName,
		                    emails: deviceContact.emails,
		                    phoneNumbers: deviceContact.phoneNumbers
		                });
		                contact.deviceContact = deviceContact;
		                contacts.push(contact);
		            }
		            //return model instances in a result set
		            operation.resultSet = new Ext.data.ResultSet({
		                records: contacts,
		                total  : contacts.length,
		                loaded : true
		            });
		            //announce success
		            operation.setSuccessful();
		            operation.setCompleted();
		            //finish with callback
		            if (typeof callback == "function") {
		                callback.call(scope || thisProxy, operation);
		            }
		        },
		        function (e) { console.log('Error fetching contacts'); },
		        {multiple: true}
		    );
		    }
        },
        update: function(operation, callback, scope) {
        	console.log("model::update() is called");
        	/*
		    operation.setStarted();
		    //put model data back into deviceContact
		    var deviceContact = operation.records[0].deviceContact;
		    var contact = operation.records[0].data;
		    deviceContact.name.givenName = contact.givenName;
		    deviceContact.name.familyName = contact.familyName;
		    //save back via PhoneGap
		    var thisProxy = this;
		    deviceContact.save(function() {
		        //announce success
		        operation.setCompleted();
		        operation.setSuccessful();
		        //finish with callback
		        if (typeof callback == 'function') {
		            callback.call(scope || thisProxy, operation);
		        }
		    });
		    */
        },
        destroy: function(operation, callback, scope) {
        }
    })
);

contactApp.models.Contact = Ext.regModel("contactApp.models.Contact", {
    fields: [
        {name: "id", type: "int"},
        {name: "givenName", type: "string"},
        {name: "familyName", type: "string"},
        {name: "emails", type: "auto"},
        {name: "phoneNumbers", type: "auto"},
    ],
    proxy: {
        type: "contactstorage"
    }
});

contactApp.stores.contacts = new Ext.data.Store({
    model: "contactApp.models.Contact"
});

/**
 * views/ContactDetail.js
 */
console.log("views/ContactDetail.js is loaded");
contactApp.views.ContactDetail = Ext.extend(Ext.Panel, {
    dockedItems: [{
        xtype: 'toolbar',
        title: 'View contact',
        items: [
            {
                text: 'Back',
                ui: 'back',
                listeners: {
                    'tap': function () {
                        Ext.dispatch({
                        	// 컨트롤러의 index()함수에 연결된다.
                            controller: contactApp.controllers.contacts,
                            action: 'index',
                            animation: {type:'slide', direction:'right'}
                        });
                    }
                }
            },
            {xtype:'spacer'}
        ]
    }],
    //styleHtmlContent: true,
    scroll: 'vertical',
    /*
    items: [{
        xtype: 'list',
        // models을 지정한다.
        store: contactApp.stores.contacts,
        itemTpl: '{type} {value}',
    }],
    */
    /*
    items: [{
        xtype: 'list',
        // models을 지정한다.
        store: contactApp.stores._detailStore,
        itemTpl: '{type} {value}',
        onItemDisclosure: function (record) {
            Ext.dispatch({
            	// 컨트롤러의 show()함수에 연결된다.
         //       controller: contactApp.controllers.contacts,
         //       action: 'show',
         //       id: record.getId()
            });
        }
    }],
    */
    
    items: [
    	{tpl:[
            '<h4>Phone</h4>',
            '<tpl for="phoneNumbers">',
                '<div class="field"><span class="label">{type}: </span><a href="tel:{value}">{value}</a></div>',
            '</tpl>'
        ]},
        {tpl:[
            '<h4>Email</h4>',
            '<tpl for="emails">',
                '<div class="field"><span class="label">{type}: </span><a href="mailto:{value}">{value}</a></div>',
            '</tpl>'
        ]}
    ],
    
    refreshContactData: function(record) {
    	Ext.each(this.items.items, function(item) {
    		console.log("refreshContactData" + record.data);
            item.update(record.data);
        });
	    var toolbar = this.getDockedItems()[0];
	    
	    //contactApp.stores._detailStore = new Ext.data.Store({
	    //  model: 'detailContact',
	    //  data: record.get('phoneNumbers')
	    //});
	    toolbar.setTitle(record.get('givenName') + ' ' + record.get('familyName'));
	}
});

/**
 * views/ContactList.js
 */
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

/**
 * views/Viewport.js is
 */
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