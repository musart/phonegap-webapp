/*
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
*/