/*
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
*/
